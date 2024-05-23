import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PaidIcon from '@mui/icons-material/Paid';

const categoryDetails = {
  'Food & Drink': { color: '#FFDEDD', Icon: FastfoodIcon },
  'Transportation': { color: '#DEEDFF', Icon: DirectionsBusIcon },
  'Personal Care': { color: '#F1E8F9', Icon: InsertEmoticonIcon },
  'Shopping': { color: '#FEF3DD', Icon: ShoppingBagIcon },
  'Health Care': { color: '#D2F7F0', Icon: HealthAndSafetyIcon },
  'Giving': { color: '#FEE4ED', Icon: VolunteerActivismIcon },
  'Allowance': { color: '#E9F8E1', Icon: PaidIcon }
};

const TransactionCard = ({ transaction }) => {
  const categoryInfo = categoryDetails[transaction.category];

  if (!categoryInfo) {
    console.error(`Category ${transaction.category} is not defined!`);
    return <Typography>Category not defined</Typography>;
  }

  const { Icon, color } = categoryInfo;

  return (
    <Card style={{ backgroundColor: color, marginBottom: '10px' }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Icon style={{ fontSize: 30, color: '#333' }} />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" component="div">
              {transaction.category}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {transaction.date}  {/* Display the date here */}
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: 'right' }}>
            <Typography variant="h6">
              ₱{transaction.amount}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
