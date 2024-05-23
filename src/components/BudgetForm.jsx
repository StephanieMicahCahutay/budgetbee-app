import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useTransactions } from '../context/TransactionContext';

const BudgetForm = ({ category }) => {
  const { addBudget, budgets } = useTransactions();
  const [budget, setBudget] = useState({ period: 'Monthly', amount: '' });

  const handleSave = () => {
    const budgetData = { categoryId: category.name, amount: parseFloat(budget.amount), period: budget.period };
    addBudget(category.name, budgetData);
  };

  const handlePeriodChange = (event) => {
    setBudget({ ...budget, period: event.target.value });
  };

  const handleAmountChange = (event) => {
    setBudget({ ...budget, amount: event.target.value });
  };

  return (
    <Card style={{ marginBottom: 20, backgroundColor: category.color }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <category.Icon style={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{category.name}</Typography>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel>Period</InputLabel>
              <Select value={budget.period} label="Period" onChange={handlePeriodChange}>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField label="Amount" type="number" fullWidth value={budget.amount} onChange={handleAmountChange} />
          </Grid>
          <Grid item>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
