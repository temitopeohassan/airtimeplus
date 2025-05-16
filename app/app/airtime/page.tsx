'use client';

import React, { useState, useEffect } from "react";
import { useAccount, useWalletClient, usePublicClient, useConnect } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { injected } from 'wagmi/connectors';
import { API_BASE_URL } from '../config';

// Types
type AirtimeService = {
  network_operator: string;
  operator_id: string;
  amount: number;
  currency: string;
  usdc_value: number;
};

type Country = {
  name: string;
  services: {
    airtime: AirtimeService[];
  };
};

// USDC Token Contract ABI
const USDC_TOKEN_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "recipient", type: "address" }, { name: "amount", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  }
] as const;

const CONTRACT_ADDRESS = "0xaF108Dd1aC530F1c4BdED13f43E336A9cec92B44" as `0x${string}`;

export default function AirtimePage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<AirtimeService | null>(null);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState("");

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { connect } = useConnect();

  // Auto connect wallet on component mount
  useEffect(() => {
    const autoConnect = async () => {
      try {
        if (!isConnected) {
          console.log("Attempting to auto-connect wallet...");
          await connect({ connector: injected() });
        }
      } catch (error) {
        console.error("Auto-connect failed:", error);
      }
    };
    autoConnect();
  }, [isConnected, connect]);

  // Fetch Countries and their services
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/services-data`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data && data.countries && Array.isArray(data.countries)) {
          setCountries(data.countries);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setErrorMessage("Failed to load countries. Please try again later.");
        setShowErrorModal(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmitForm = () => {
    if (!selectedCountry) return alert("Please select a country.");
    if (!selectedOperator) return alert("Please select an operator.");
    if (!selectedAmount) return alert("Please select an amount.");
    if (!recipientPhone) return alert("Please enter recipient phone number.");
    if (!/^\d{11}$/.test(recipientPhone)) return alert("Please enter a valid 11-digit phone number.");
    
    setShowConfirmModal(true);
  };

  // Check the user's USDC balance
  const checkUsdcBalance = async () => {
    if (!address || !publicClient) {
      throw new Error("Wallet not connected");
    }
    
    try {
      const chainId = await publicClient.getChainId();
      const usdcAddress = chainId === 1 ? 
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" : // Mainnet
        "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Base
      
      const balance = await publicClient.readContract({
        address: usdcAddress as `0x${string}`,
        abi: USDC_TOKEN_ABI,
        functionName: "balanceOf",
        args: [address]
      });
      
      return balance;
    } catch (error) {
      console.error("Error checking USDC balance:", error);
      throw new Error("Failed to check USDC balance. Please ensure you're connected to the correct network.");
    }
  };

  // Directly transfer USDC to the contract address
  const transferUsdcDirectly = async (amount: bigint) => {
    if (!walletClient || !address || !publicClient) throw new Error("Wallet not connected");
    
    setTransactionStatus("Transferring USDC...");
    
    try {
      const chainId = await publicClient.getChainId();
      const usdcAddress = chainId === 1 ? 
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" : // Mainnet
        "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Base

      // Check allowance first
      const allowance = await publicClient.readContract({
        address: usdcAddress as `0x${string}`,
        abi: USDC_TOKEN_ABI,
        functionName: "allowance",
        args: [address, CONTRACT_ADDRESS]
      });

      // If allowance is insufficient, approve first
      if (allowance < amount) {
        setTransactionStatus("Approving USDC spend...");
        const { request: approveRequest } = await publicClient.simulateContract({
          address: usdcAddress as `0x${string}`,
          abi: USDC_TOKEN_ABI,
          functionName: "approve",
          args: [CONTRACT_ADDRESS, amount],
          account: address
        });

        const approveTxHash = await walletClient.writeContract(approveRequest);
        setTransactionStatus("Waiting for approval confirmation...");
        const approveReceipt = await publicClient.waitForTransactionReceipt({
          hash: approveTxHash,
          timeout: 60000
        });

        if (approveReceipt.status === 'reverted') {
          throw new Error("USDC approval transaction was reverted");
        }
      }

      // Now proceed with the transfer
      const { request: transferRequest } = await publicClient.simulateContract({
        address: usdcAddress as `0x${string}`,
        abi: USDC_TOKEN_ABI,
        functionName: "transfer",
        args: [CONTRACT_ADDRESS, amount],
        account: address
      });

      const transferTxHash = await walletClient.writeContract(transferRequest);
      setTransactionStatus("Waiting for transfer confirmation...");
      const transferReceipt = await publicClient.waitForTransactionReceipt({
        hash: transferTxHash,
        timeout: 60000
      });

      if (transferReceipt.status === 'reverted') {
        throw new Error("USDC transfer transaction was reverted");
      }

      return transferTxHash;
    } catch (error) {
      console.error("Error transferring USDC:", error);
      throw error;
    }
  };

  const resetForm = () => {
    setSelectedCountry("");
    setSelectedOperator("");
    setSelectedAmount(null);
    setRecipientPhone("");
  };

  const handleConfirmedSubmit = async () => {
    if (!selectedAmount) return;
    
    setIsSubmitting(true);
    try {
      if (!isConnected) {
        await connect({ connector: injected() });
      }

      if (!walletClient || !address) {
        throw new Error("Wallet connection failed. Please try again.");
      }

      const usdcValue = selectedAmount.usdc_value;
      const amountInWei = parseUnits(usdcValue.toString(), 6);

      setTransactionStatus("Checking your USDC balance...");
      let balance;
      try {
        balance = await checkUsdcBalance();
        const formattedBalance = formatUnits(balance, 6);
        
        if (balance < amountInWei) {
          throw new Error(
            `Insufficient USDC balance. You have ${formattedBalance} USDC, but ${usdcValue} USDC is required.`
          );
        }
      } catch (error) {
        throw error;
      }

      setTransactionStatus("Processing payment...");
      let txHash;
      try {
        txHash = await transferUsdcDirectly(amountInWei);
      } catch (error) {
        throw new Error("Payment failed. Please try again.");
      }

      if (txHash) {
        setTransactionStatus("Sending airtime topup request...");
        const response = await fetch(`${API_BASE_URL}/send-topup`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            operatorId: selectedAmount.operator_id,
            amount: selectedAmount.amount,
            currency: selectedAmount.currency,
            recipientPhone,
            senderPhone: "08012345678",
            recipientEmail: "miniapp@aitimeplus.xyz",
            tx_hash: txHash
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Network response was not ok");
        }
        
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        resetForm();
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
      let errorMessage = "Transaction unsuccessful. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("user rejected")) {
          errorMessage = "Transaction was rejected. Please try again.";
        } else if (error.message.includes("insufficient funds") || error.message.includes("Insufficient")) {
          errorMessage = error.message;
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your connection and ensure you're on the correct network.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setErrorMessage(errorMessage);
      setShowConfirmModal(false);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
      setTransactionStatus("");
    }
  };

  const getSelectedCountryOperators = () => {
    const country = countries.find(c => c.name === selectedCountry);
    return country?.services.airtime || [];
  };

  const getOperatorAmounts = () => {
    return getSelectedCountryOperators().filter(
      service => service.network_operator === selectedOperator
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-8">Buy Airtime</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">Enter recipient details</p>
            
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Country</label>
              <select
                className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedOperator("");
                  setSelectedAmount(null);
                }}
                disabled={isLoading}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {isLoading && (
                <p className="text-sm text-gray-500 mt-1">Loading countries...</p>
              )}
            </div>

            {/* Operator Selection */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Operator</label>
              <select
                className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedOperator}
                onChange={(e) => {
                  setSelectedOperator(e.target.value);
                  setSelectedAmount(null);
                }}
                disabled={!selectedCountry || isLoading}
              >
                <option value="">Select Operator</option>
                {Array.from(new Set(getSelectedCountryOperators().map(op => op.network_operator))).map(operator => (
                  <option key={operator} value={operator}>
                    {operator}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Amount</label>
              <select
                className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedAmount?.amount.toString() || ""}
                onChange={(e) => {
                  const amount = getOperatorAmounts().find(
                    service => service.amount.toString() === e.target.value
                  );
                  setSelectedAmount(amount || null);
                }}
                disabled={!selectedOperator || isLoading}
              >
                <option value="">Select Amount</option>
                {getOperatorAmounts().map((service) => (
                  <option key={service.amount} value={service.amount}>
                    {service.amount} {service.currency} 
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Recipient Phone Number</label>
              <input
                type="tel"
                className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter phone number"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                maxLength={11}
                disabled={isLoading}
              />
            </div>

            <div className="text-right">
              <button
                onClick={handleSubmitForm}
                disabled={isSubmitting || isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Buy"}
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && selectedAmount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Please confirm the details of your airtime purchase:
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-center dark:text-white">
                  <span className="font-bold">Country:</span> {selectedCountry}
                </p>
                <p className="text-center dark:text-white">
                  <span className="font-bold">Operator:</span> {selectedAmount.network_operator}
                </p>
                <p className="text-center dark:text-white">
                  <span className="font-bold">Amount:</span> {selectedAmount.amount} {selectedAmount.currency}
                </p>
                <p className="text-center dark:text-white">
                  <span className="font-bold">USDC Value:</span> ${selectedAmount.usdc_value}
                </p>
                <p className="text-center dark:text-white">
                  <span className="font-bold">Recipient:</span> {recipientPhone}
                </p>
              </div>
              {transactionStatus && (
                <p className="text-blue-500 text-center mb-4">{transactionStatus}</p>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirmedSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Purchase"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <p className="text-red-600 dark:text-red-400 mb-4">{errorMessage}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Airtime Sent Successfully
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your airtime transfer has been completed successfully.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
