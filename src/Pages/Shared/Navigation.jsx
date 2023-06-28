import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         TASK DEMO
        </Typography>
        <Button component={Link} to="/dashboard" color="inherit">Home</Button>
        <Button component={Link} to="/addProduct" color="inherit"> Add Product</Button>
        <Button component={Link} to="/addedProduct" color="inherit">All Product</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
