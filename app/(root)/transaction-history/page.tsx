import HeaderBox from '@/components/HeaderBox';
import RandomTransactions from '@/components/MockTransactions'; // Import the MockTransactions component
import React from 'react';
import { formatAmount } from '@/lib/utils';

const TransactionHistory = async () => {
  const randomBalance = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      {/* Current Balance Box */}
      <div className="balance-box p-4 rounded-lg bg-blue-500 shadow-md flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Current Balance</h2>
        <p className="text-xl font-bold text-white">{formatAmount(randomBalance)}</p>
      </div>

      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <RandomTransactions /> {/* Displaying the MockTransactions component */}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;


