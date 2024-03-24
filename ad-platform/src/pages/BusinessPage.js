import React from 'react';
import BusinessFeed from '../components/business/BusinessFeed';
import Grid from '@mui/material/Grid';
import FormComponent from '../components/business/FormComponent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function BusinessPage() {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    // window.location.href = 'http://localhost:3000/login';
    navigate('/login', { replace: true });
    console.log("Logout clicked");
  };

  return (
    <div style={{ marginTop: 20 }}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
        <Typography variant="h4" component="div" style={{marginLeft: '2rem'}}>
            Business Client
        </Typography>
        </Grid>
        <Grid item xs={4}>
        <Button color="inherit" style={{ float: 'right',marginRight: '2rem' }} onClick={handleLogout}>Logout</Button>
        </Grid>
        </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <BusinessFeed />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '80vh', overflowY: 'auto' }}>
            <FormComponent />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
