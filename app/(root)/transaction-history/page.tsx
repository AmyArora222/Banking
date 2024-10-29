"use client";

import { Client, Databases } from "node-appwrite";
import HeaderBox from '@/components/HeaderBox';
import React, { useEffect, useState } from 'react';
import { formatAmount } from '@/lib/utils';
import TransactionsTable from '@/components/TransactionsTable'; 
import { getTransactions } from "@/lib/actions/transaction.actions";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(); // Fetch transactions using the getTransactions function
        setTransactions(data.documents); // Set the fetched transactions in state
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Stop the loading state after fetching data
      }
    };

    fetchTransactions(); // Call the fetch function on component mount
  }, []);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
      <p>Recent Transactions</p>
      {/* Replace div-based rendering with the TransactionsTable component */}
      <TransactionsTable transactions={transactions}/>
    </div>
  );
};

export default TransactionHistory;
