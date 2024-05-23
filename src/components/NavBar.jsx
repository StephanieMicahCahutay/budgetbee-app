import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/images/BudgetBee-Logo.png';
import text from '../assets/images/BudgetBee-Text.png';

const NavBar = () => {
    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <img className='h-10 w-auto' src={logo} alt="BudgetBee Logo" style={{ height: 80, width: 100 }} />
                <img className='h-10 w-auto' src={text} alt="BudgetBee" style={{ height: 50, width: 120, marginLeft: 10 }} />
                <Typography variant="h6" style={{ flexGrow: 1, color: 'black', marginLeft: 20 }}>
                    {/* Optional additional text or space */}
                </Typography>
                <Button color="inherit" component={Link} to="/" style={{ color: 'black' }}>Home</Button>
                <Button color="inherit" component={Link} to="/transactions" style={{ color: 'black' }}>Transactions</Button>
                <Button color="inherit" component={Link} to="/budget" style={{ color: 'black' }}>Budget</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
