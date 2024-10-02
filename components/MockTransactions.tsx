import React from "react";
import TransactionsTable from "./TransactionsTable";

type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "debit" | "credit";
};

const generateRandomTransactions = (): Transaction[] => {
  const transactionNames = ["Groceries", "Utilities", "Rent", "Salary", "Dining Out", "Shopping", "Transfer"];
  const transactions: Transaction[] = [];

  for (let i = 0; i < 10; i++) {
    const randomAmount = Math.floor(Math.random() * 1000) + 1; // Random amount between 1 and 1000
    const transactionType: "debit" | "credit" = Math.random() > 0.5 ? "debit" : "credit"; // Randomly assign type

    transactions.push({
      id: `${i + 1}`,
      name: transactionNames[Math.floor(Math.random() * transactionNames.length)],
      amount: transactionType === "debit" ? -randomAmount : randomAmount,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(), // Random date within the last 30 days
      type: transactionType,
    });
  }

  return transactions;
};

const MockTransactions: React.FC = () => {
  const transactions = generateRandomTransactions(); // Generate random transactions

  return (
    <div>
      <h2>Recent Transactions</h2>
      {/* Use TransactionsTable to display the transactions in a table */}
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default MockTransactions;
