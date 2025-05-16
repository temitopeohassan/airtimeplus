// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract USDCPaymentProcessor is ReentrancyGuard {
    address public immutable owner;
    address public paymentReceiver;
    IERC20 public immutable usdc;
    
    event PaymentProcessed(address indexed from, uint256 amount, uint256 timestamp);
    event PaymentReceiverUpdated(address indexed oldReceiver, address indexed newReceiver);

    constructor(address _usdcAddress, address _paymentReceiver) {
        require(_usdcAddress != address(0), "Invalid USDC address");
        require(_paymentReceiver != address(0), "Invalid payment receiver address");
        
        owner = msg.sender;
        usdc = IERC20(_usdcAddress);
        paymentReceiver = _paymentReceiver;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function processPayment(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(usdc.balanceOf(msg.sender) >= amount, "Insufficient USDC balance");
        require(usdc.allowance(msg.sender, address(this)) >= amount, "Insufficient USDC allowance");

        bool success = usdc.transferFrom(msg.sender, paymentReceiver, amount);
        require(success, "USDC transfer failed");

        emit PaymentProcessed(msg.sender, amount, block.timestamp);
    }

    function updatePaymentReceiver(address _newReceiver) external onlyOwner {
        require(_newReceiver != address(0), "Invalid payment receiver address");
        address oldReceiver = paymentReceiver;
        paymentReceiver = _newReceiver;
        emit PaymentReceiverUpdated(oldReceiver, _newReceiver);
    }
} 