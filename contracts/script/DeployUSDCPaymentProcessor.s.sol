// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/USDCPaymentProcessor.sol";

contract DeployUSDCPaymentProcessor is Script {
    function run() external {
        // Load the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address paymentReceiver = vm.envAddress("PAYMENT_RECEIVER");
        address usdcAddress = vm.envAddress("USDC_ADDRESS");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        USDCPaymentProcessor processor = new USDCPaymentProcessor(
            usdcAddress,
            paymentReceiver
        );

        vm.stopBroadcast();

        // Log the deployed contract address
        console.log("USDCPaymentProcessor deployed to:", address(processor));
    }
} 