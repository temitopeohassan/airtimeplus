// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/USDCPaymentProcessor.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockUSDC is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;

    function mint(address to, uint256 amount) external {
        _balances[to] += amount;
        _totalSupply += amount;
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external override returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external override returns (bool) {
        require(_balances[from] >= amount, "Insufficient balance");
        require(_allowances[from][msg.sender] >= amount, "Insufficient allowance");
        
        _balances[from] -= amount;
        _balances[to] += amount;
        _allowances[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
}

contract USDCPaymentProcessorTest is Test {
    USDCPaymentProcessor public processor;
    MockUSDC public mockUSDC;
    address public owner;
    address public paymentReceiver;
    address public user;

    uint256 public constant INITIAL_BALANCE = 1000e6; // 1000 USDC (6 decimals)
    uint256 public constant PAYMENT_AMOUNT = 100e6; // 100 USDC

    function setUp() public {
        owner = address(this);
        paymentReceiver = makeAddr("paymentReceiver");
        user = makeAddr("user");

        // Deploy mock USDC
        mockUSDC = new MockUSDC();
        
        // Deploy payment processor
        processor = new USDCPaymentProcessor(address(mockUSDC), paymentReceiver);

        // Setup initial balances and allowances
        mockUSDC.mint(user, INITIAL_BALANCE);
        vm.prank(user);
        mockUSDC.approve(address(processor), INITIAL_BALANCE);
    }

    function testProcessPayment() public {
        uint256 initialReceiverBalance = mockUSDC.balanceOf(paymentReceiver);
        uint256 initialUserBalance = mockUSDC.balanceOf(user);

        vm.prank(user);
        processor.processPayment(PAYMENT_AMOUNT);

        assertEq(
            mockUSDC.balanceOf(paymentReceiver),
            initialReceiverBalance + PAYMENT_AMOUNT,
            "Receiver balance should increase by payment amount"
        );
        assertEq(
            mockUSDC.balanceOf(user),
            initialUserBalance - PAYMENT_AMOUNT,
            "User balance should decrease by payment amount"
        );
    }

    function testUpdatePaymentReceiver() public {
        address newReceiver = makeAddr("newReceiver");
        processor.updatePaymentReceiver(newReceiver);
        assertEq(processor.paymentReceiver(), newReceiver, "Payment receiver should be updated");
    }

    function testFailUpdatePaymentReceiverUnauthorized() public {
        address newReceiver = makeAddr("newReceiver");
        vm.prank(user);
        processor.updatePaymentReceiver(newReceiver);
    }

    function testFailProcessPaymentInsufficientBalance() public {
        vm.prank(user);
        processor.processPayment(INITIAL_BALANCE + 1);
    }

    function testFailProcessPaymentZeroAmount() public {
        vm.prank(user);
        processor.processPayment(0);
    }
} 