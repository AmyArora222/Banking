import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";


import AccountLinkingForm from '@/components/AccountLinkingForm';
import React, { useEffect} from 'react';


const Home = async ({ searchParams: { id } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  
  const banks = [
    { $id: '1', name: 'ICICI', currentBalance: 1235.5 },
    { $id: '2', name: 'HDFC', currentBalance: 4560.56 },
  ];
  

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
          
          
          <TotalBalanceBox 
            accounts={[]} 
            totalBanks={banks.length}
            totalCurrentBalance={banks.reduce((total, bank) => total + bank.currentBalance, 0)} 
          />
        </header>

        <p>Recent Transactions</p>
        
        <Table>
          <TableHeader className="bg-[#f9fafb]">
            <TableRow>
              <TableHead className="px-2">Transaction</TableHead>
              <TableHead className="px-2">Amount (₹)</TableHead>
              <TableHead className="px-2">Status</TableHead>
              <TableHead className="px-2">Date</TableHead>
              </TableRow>
          </TableHeader>
        </Table> 
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]} 
        banks={[{currentBalance:50000},{currentBalance:1000}]} 
      />
    </section>
  );
}

export default Home;
