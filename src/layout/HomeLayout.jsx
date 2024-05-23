import React from 'react';
import HomeCards from '../components/HomeCards';
import AllowanceCard from '../components/AllowanceCard';
import Typography from '@mui/material/Typography';
import { useTransactions } from '../context/TransactionContext';

const HomeLayout = () => {
  const { totalExpenses, allowance } = useTransactions(); // Ensure allowance is also managed here

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom style={{ textAlign: "center", fontWeight: "bold" }}>
        Expenses: ₱{totalExpenses}
      </Typography>
      <HomeCards />
      <Typography variant="h6" gutterBottom style={{ textAlign: "center", fontWeight: "bold" }}>
        Allowance: ₱{allowance} 
      </Typography>
      <AllowanceCard />
    </div>
  );
};

export default HomeLayout;
