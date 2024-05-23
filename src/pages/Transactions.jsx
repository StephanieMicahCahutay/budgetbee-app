import React, { useState } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import TransactionCard from '../components/TransactionCard';
import { Grid, Typography } from '@mui/material';
import { useTransactions } from '../context/TransactionContext';

const Transactions = () => {
  const [date, setDate] = useState(new Date());
  const { transactions } = useTransactions();

  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div style={{ padding: '20px' }}>
      <CalendarComponent onChange={handleDateChange} value={date} />
      <Grid container spacing={2}>
        {transactions.map((transaction, index) => (
          <Grid item xs={12} key={index}> 
            <TransactionCard transaction={transaction} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Transactions;
