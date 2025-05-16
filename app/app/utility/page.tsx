'use client';

import React, { useState, useEffect } from "react";
import { useAccount, useWalletClient, usePublicClient, useConnect } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { injected } from 'wagmi/connectors';
import { API_BASE_URL } from '../config';

// Types
type UtilityService = {
  provider: string;
  provider_id: string;
  service_type: string;
  amount: number;
  currency: string;
  usdc_value: number;
};

type Country = {
  name: string;
  services: {
    utility: UtilityService[];
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

export default function UtilityPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Pay A Utility Bill</h1>


      <select
        value={selectedCountry}
        onChange={e => setSelectedCountry(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
      >
        <option value="">Select Country</option>
        <option value="coming_soon">Coming Soon</option>
      </select>

      <button
        onClick={() => {}}
        disabled={!selectedCountry || loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Processing..." : "Pay with USDC"}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
