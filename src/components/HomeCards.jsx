import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Modal, Box, TextField, Button } from '@mui/material';
import { useTransactions } from '../context/TransactionContext';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const categories = [
  { name: 'Food & Drink', Icon: FastfoodIcon, color: '#FFDEDD' },
  { name: 'Transportation', Icon: DirectionsBusIcon, color: '#DEEDFF' },
  { name: 'Personal Care', Icon: InsertEmoticonIcon, color: '#F1E8F9' },
  { name: 'Shopping', Icon: ShoppingBagIcon, color: '#FEF3DD' },
  { name: 'Health Care', Icon: HealthAndSafetyIcon, color: '#D2F7F0' },
  { name: 'Giving', Icon: VolunteerActivismIcon, color: '#FEE4ED' },
];

const HomeCards = () => {
  const { transactions, categoryValues, addTransaction } = useTransactions();
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleOpen = (category) => {
    setCurrentCategory(category);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const newTransaction = {
      category: currentCategory,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
    };
    addTransaction(newTransaction);
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.name}>
            <Card style={{ backgroundColor: category.color }} onClick={() => handleOpen(category.name)}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <category.Icon style={{ fontSize: 40 }} />
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="h4">₱{categoryValues[category.name] || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6">Add Expense for {currentCategory}</Typography>
          <TextField value={amount} onChange={(e) => setAmount(e.target.value)} label="Amount" fullWidth />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
};

export default HomeCards;
