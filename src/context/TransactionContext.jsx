import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [budgets, setBudgets] = useState({});
  const [categoryValues, setCategoryValues] = useState({});

  // Add a transaction and update totals accordingly
  const addTransaction = (newTransaction) => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);

    // If it's an allowance transaction, update the allowance total
    if (newTransaction.category === 'Allowance') {
      setAllowance(prevAllowance => prevAllowance + newTransaction.amount);
    } else {
      // Otherwise, update the total expenses
      setTotalExpenses(prevTotal => prevTotal + newTransaction.amount);
      setCategoryValues(prevValues => ({
        ...prevValues,
        [newTransaction.category]: (prevValues[newTransaction.category] || 0) + newTransaction.amount
      }));
      checkBudget(newTransaction);
    }
  };

  const addBudget = (categoryId, budget) => {
    setBudgets(prev => ({ ...prev, [categoryId]: budget }));
  };

  const updateBudget = (categoryId, budget) => {
    setBudgets(prev => ({ ...prev, [categoryId]: budget }));
  };

  // Check if a transaction exceeds the budget
  const checkBudget = (transaction) => {
    const relevantBudget = budgets[transaction.category];
    if (relevantBudget) {
      // Sum transactions for this category
      const totalSpent = transactions.reduce((acc, curr) => {
        return curr.category === transaction.category ? acc + curr.amount : acc;
      }, 0);
      if (totalSpent > relevantBudget.amount) {
        // Trigger toast notification
        toast.warn(`You have exceeded your ${relevantBudget.period.toLowerCase()} budget for ${transaction.category}!`);
      }
    }
  };

  // Effect to recalibrate totals when transactions change, ensuring allowance is considered separately
  useEffect(() => {
    const total = transactions.reduce((sum, transaction) => {
      return transaction.category !== 'Allowance' ? sum + transaction.amount : sum;
    }, 0);
    setTotalExpenses(total);

    const totalAllowance = transactions.reduce((sum, transaction) => {
      return transaction.category === 'Allowance' ? sum + transaction.amount : sum;
    }, 0);
    setAllowance(totalAllowance);
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      totalExpenses,
      allowance,
      setAllowance,
      budgets,
      addBudget,
      updateBudget,
      categoryValues
    }}>
      {children}
      <ToastContainer />
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
