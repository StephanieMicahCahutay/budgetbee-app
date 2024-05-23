import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <TransactionProvider>
        <NavBar />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          } />
          <Route path="/transactions" element={
            <ErrorBoundary>
              <Transactions />
            </ErrorBoundary>
          } />
          <Route path="/budget" element={
            <ErrorBoundary>
              <Budget />
            </ErrorBoundary>
          } />
        </Routes>
      </TransactionProvider>
    </Router>
  );
}

export default App;
