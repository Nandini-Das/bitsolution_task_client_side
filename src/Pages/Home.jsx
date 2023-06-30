import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const StyledComponent = styled(Box)`
    background-image: url("https://images.unsplash.com/photo-1648824571682-109acc138294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `;

  const StyledTitle = styled(Typography)`
    font-weight: bold;
    color: white;
  `;

  const StyledButton = styled(Button)`
    width: 200px; 
    height: 100px;
  `;

  return (
    <div>
      <StyledComponent>
        <StyledTitle variant="h1" align="center">
          Task Demo
        </StyledTitle>
        <Box
          display="flex"
          justifyContent="center"
          
          height="100vh"
        >
          <StyledButton
            variant="contained"
            component={Link}
            to="/dashboard"
            color="success"

          >
            <Typography varriant="h4" >Go to Dashboard</Typography>
          </StyledButton>
        </Box>
      </StyledComponent>
    </div>
  );
};

export default Home;
