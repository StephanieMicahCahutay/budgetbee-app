import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeLayout from '../layout/HomeLayout';
import { useTransactions } from '../context/TransactionContext';

const Home = () => {
  const { addTransaction } = useTransactions();
  
  return <HomeLayout addTransaction={addTransaction} />;
};

export default Home;
