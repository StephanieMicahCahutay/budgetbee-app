import React, { useState } from 'react';
import { Card, CardContent, Typography, Modal, Box, TextField, Button } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { useTransactions } from '../context/TransactionContext';

const AllowanceCard = () => {
  const { allowance, addTransaction } = useTransactions();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => setInputValue(event.target.value);
  const handleSave = () => {
    const amount = Number(inputValue);
    addTransaction({
      category: 'Allowance',
      amount: amount,
      date: new Date().toISOString().split('T')[0], // Format the date as YYYY-MM-DD
    });
    setInputValue(''); // Reset input value
    handleClose(); // Close the modal
  };

  return (
    <>
      <Card style={{ width: '33%', height: 140, backgroundColor: '#E9F8E1', marginTop: '20px' }} onClick={handleOpen}>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <PaidIcon style={{ fontSize: 40, marginBottom: 8 }} />
          <Typography variant="h5">Allowance</Typography>
          <Typography variant="h6">₱{allowance}</Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">Edit Allowance</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Allowance Amount"
            type="number"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleChange}
          />
          <Button onClick={handleSave} color="primary">Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AllowanceCard;
