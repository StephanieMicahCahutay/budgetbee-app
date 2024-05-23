import React from 'react';
import BudgetForm from './BudgetForm';

const BudgetPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      {categories.map(category => (
        <BudgetForm key={category.name} category={category} />
      ))}
    </Box>
  );
};

export default BudgetPage;