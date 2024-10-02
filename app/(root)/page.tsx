import HeaderBox from '@/components/HeaderBox';
import MockTransactions from '@/components/MockTransactions'; // Use MockTransactions component
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
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
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={[]} 
            totalBanks={banks.length}
            totalCurrentBalance={banks.reduce((total, bank) => total + bank.currentBalance, 0)} 
          />
        </header>

        {/* Include the MockTransactions component to show the transaction table */}
        <MockTransactions />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]} 
        banks={banks} 
      />
    </section>
  );
}

export default Home;
