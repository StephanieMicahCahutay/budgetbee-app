import axios from 'axios';

const API_URL = 'https://budgetbee-server.vercel.app';

export const fetchTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await axios.post(`${API_URL}/transactions`, transaction);
  return response.data;
};

export const fetchBudgets = async () => {
  const response = await axios.get(`${API_URL}/budgets`);
  return response.data;
};

export const updateBudget = async (categoryId, budget) => {
  const response = await axios.put(`${API_URL}/budgets/${categoryId}`, budget);
  return response.data;
};
