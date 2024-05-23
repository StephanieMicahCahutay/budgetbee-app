import React from 'react';
import BudgetForm from '../components/BudgetForm';
import { Box } from '@mui/material';
import { categories } from '../constants/categories';

const Budget = () => {
  return (
    <Box sx={{ p: 2 }}>
      {categories.map(category => (
        <BudgetForm key={category.name} category={category} />
      ))}
    </Box>
  );
};

export default Budget;
