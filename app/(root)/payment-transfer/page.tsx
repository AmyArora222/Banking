"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Client, Databases, Role,Permission } from "node-appwrite";
import { permission } from "process";
import { any } from "zod";
import { ID, Query } from "node-appwrite";
import { createTransaction } from "@/lib/actions/transaction.actions";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const TransferFundsPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  
  const handleTransfer = async () => {
    setIsProcessing(true);

    try {
      // Create order
      const response = await fetch("/api/create-order", { method: "POST" });
      const data = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number(amount) * 100,
        currency: "INR",
        name: "Amy",
        description: "Fund Transfer",
        order_id: data.orderId,
        handler: async function (response: RazorpayResponse) {
          console.log("Payment successful", response);

          const transactionData = {
            name,
            amount,
            status: 'success',
            date: new Date().toISOString(),
          };

          try {
            const result = await createTransaction(transactionData);
            console.log("Transaction stored successfully:", result);
          } catch (error) {
            console.error("Error storing transaction:", error);
          }
        },
        prefill: {
          name,
          contact: "9873468034", 
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <form className="w-full h-full bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Payment Transfer</h1>

        <div className="mb-6 flex">
          <label htmlFor="note" className="w-1/4 font-normal text-lg">Transfer Note:</label>
          <textarea 
            id="note" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            className="w-3/4 p-4 border rounded-lg h-32"
            placeholder="Enter transfer note" 
            required 
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Bank Account Details</h2>
          <p className="text-gray-500 mb-2">Enter the bank account details of the recipient.</p>

          <div className="flex mb-4">
            <label htmlFor="email" className="w-1/4 font-normal text-lg">Recipient's Name:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-3/4 p-4 border rounded-lg" 
              placeholder="Enter recipient's name" 
              required 
            />
          </div>

          <div className="flex mb-4">
            <label htmlFor="accountNumber" className="w-1/4 font-normal text-lg">Recipient's Account Number:</label>
            <input 
              type="text" 
              id="accountNumber" 
              value={accountNumber} 
              onChange={(e) => setAccountNumber(e.target.value)} 
              className="w-3/4 p-4 border rounded-lg" 
              placeholder="Enter recipient's account number" 
              required 
            />
          </div>

          <div className="flex mb-4">
            <label htmlFor="amount" className="w-1/4 font-normal text-lg">Amount (INR):</label>
            <input 
              type="number" 
              id="amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="w-3/4 p-4 border rounded-lg" 
              placeholder="Enter amount" 
              required 
            />
          </div>
        </div>

        <button 
          onClick={handleTransfer}
          disabled={isProcessing}
          className="w-full py-4 bg-blue-500 text-white text-lg font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Transfer Funds"}
        </button>
      </form>
    </div>
  );
};

export default TransferFundsPage;

