import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTransactions, addTransaction as apiAddTransaction, fetchBudgets, updateBudget as apiUpdateBudget } from '../api';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [budgets, setBudgets] = useState({});
  const [categoryValues, setCategoryValues] = useState({});

  const { data: fetchedTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    onSuccess: (data) => setTransactions(data),
  });

  const { data: fetchedBudgets } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets,
    onSuccess: (data) => setBudgets(data),
  });

  const addTransactionMutation = useMutation({
    mutationFn: apiAddTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    },
  });

  const updateBudgetMutation = useMutation({
    mutationFn: ({ categoryId, budget }) => apiUpdateBudget(categoryId, budget),
    onSuccess: () => {
      queryClient.invalidateQueries(['budgets']);
      toast.success('Budget updated successfully!');
    },
    onError: (error) => {
      toast.error(`Error updating budget: ${error.message}`);
    },
  });

  const addTransaction = (newTransaction) => {
    addTransactionMutation.mutate(newTransaction, {
      onSuccess: () => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        if (newTransaction.category === 'Allowance') {
          setAllowance((prevAllowance) => prevAllowance + newTransaction.amount);
        } else {
          setTotalExpenses((prevTotal) => prevTotal + newTransaction.amount);
          setCategoryValues((prevValues) => ({
            ...prevValues,
            [newTransaction.category]: (prevValues[newTransaction.category] || 0) + newTransaction.amount,
          }));
          checkBudget(newTransaction);
        }
      },
    });
  };

  const addBudget = (categoryId, budget) => {
    const existingBudget = budgets[categoryId];
    if (existingBudget) {
      updateBudgetMutation.mutate({ categoryId, budget });
    } else {
      setBudgets((prev) => ({ ...prev, [categoryId]: budget }));
      toast.success(`Budget set for ${categoryId}`);
    }
  };

  const checkBudget = (transaction) => {
    const relevantBudget = budgets[transaction.category];
    if (relevantBudget) {
      const totalSpent = transactions.reduce((acc, curr) => {
        return curr.category === transaction.category ? acc + curr.amount : acc;
      }, 0);
      if (totalSpent > relevantBudget.amount) {
        toast.warn(`You have exceeded your ${relevantBudget.period.toLowerCase()} budget for ${transaction.category}!`);
      }
    }
  };

  useEffect(() => {
    if (transactions) {
      const total = transactions.reduce((sum, transaction) => {
        return transaction.category !== 'Allowance' ? sum + transaction.amount : sum;
      }, 0);
      setTotalExpenses(total);

      const totalAllowance = transactions.reduce((sum, transaction) => {
        return transaction.category === 'Allowance' ? sum + transaction.amount : sum;
      }, 0);
      setAllowance(totalAllowance);
    }
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, totalExpenses, allowance, setAllowance, budgets, addBudget, updateBudget: updateBudgetMutation.mutate, categoryValues }}>
      {children}
      <ToastContainer />
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
