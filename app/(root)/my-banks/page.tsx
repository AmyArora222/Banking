import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import React from 'react';


// Mock bank account data
const mockAccounts = [
  {
    id: '1',
    name: 'ICICI Bank',
    currentBalance: 50000,
    officialName: 'ICICI Bank Ltd',
    mask: '1234',
  },
  {
    id: '2',
    name: 'HDFC Bank',
    currentBalance: 75000,
    officialName: 'HDFC Bank Ltd',
    mask: '5678',
  },
];

const MyBanks = async() => {
  // Mock logged-in user data
  const loggedIn = { firstName: 'John' };
  
  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {mockAccounts.map((account) => (
              <BankCard 
                key={account.id} // Use the account id as the key
                account={account}
                userName={loggedIn.firstName} // Pass the user's first name
                showBalance={true} // Assuming you want to show the balance
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyBanks;





