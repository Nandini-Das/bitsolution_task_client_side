import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <Typography variant="h2" align="center">
                Task Demo
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >

                <Button variant="contained" component={Link} to="/dashboard" color="primary">Go to Dashboard</Button>

            </Box>
        </div>
    );
};

export default Home;