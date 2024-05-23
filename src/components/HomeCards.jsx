import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Modal, Box, TextField, Button } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useTransactions } from '../context/TransactionContext';

const categories = [
    { name: 'Food & Drink', color: '#FFDEDD', Icon: FastfoodIcon },
    { name: 'Transportation', color: '#DEEDFF', Icon: DirectionsBusIcon },
    { name: 'Personal Care', color: '#F1E8F9', Icon: InsertEmoticonIcon },
    { name: 'Shopping', color: '#FEF3DD', Icon: ShoppingBagIcon },
    { name: 'Health Care', color: '#D2F7F0', Icon: HealthAndSafetyIcon },
    { name: 'Giving', color: '#FEE4ED', Icon: VolunteerActivismIcon }
];

const HomeCards = () => {
    const [open, setOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const [inputValue, setInputValue] = useState('');
    const { addTransaction, categoryValues } = useTransactions();

    const handleOpen = (category) => {
        setCurrentCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value); 
    };

    const handleSubmit = () => {
        if (currentCategory && inputValue) {
          const amount = parseFloat(inputValue);
          addTransaction({
            category: currentCategory.name,
            amount: amount,
            date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
          });
          setInputValue(''); 
          handleClose(); 
        }
    };

    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: 20 }}>
                {categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card style={{ width: '100%', height: 200, backgroundColor: category.color }}>
                            <CardContent onClick={() => handleOpen(category)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <category.Icon style={{ fontSize: 40, marginBottom: 8 }} />
                                <Typography variant="h5" component="div">
                                    {category.name}
                                </Typography>
                                <Typography variant="h6">
                                    ₱{categoryValues[category.name] || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Expense for {currentCategory?.name}
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default HomeCards;
