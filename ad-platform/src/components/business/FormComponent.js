import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ5YmUxZmY0MGI5ZTZiNGEyZDE4YyIsImlhdCI6MTcxMTE4NzQwOSwiZXhwIjoxNzExMjczODA5fQ.x_0C8N23u5drXfcnTPhj-hgbQ-AKaPjAwFlTMkQKHxo`;
const jwtToken = localStorage.getItem('token');
export default function SignUp() {

const [change, setChange] = React.useState(false);
const newAd = async (formData) => {

    const response = await axios.post('http://localhost:5501/api/business/createAd', formData,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`

    }}).then((response) => {
      console.log(response);
      setChange(!change);
    }).catch((error) => {
      console.log(error);
    });
    // console.log(response);
}


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      content:{
        title: data.get('title'),
        description: data.get('description'),
      },
      target_gender: data.get('target_gender'),
      target_age_range: {
        min_age: parseInt(data.get('min_age')),
        max_age: parseInt(data.get('max_age')),
      },
      target_location:{
        state: data.get('state'),
        city: data.get('city'),
        country: data.get('country'),
      }
      
    };
    newAd(formData);
  };

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Ad
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="target_gender"
                  label="Target Gender"
                  name="target_gender"
                  autoComplete="target_gender"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="min_age"
                  name="min_age"
                  required
                  fullWidth
                  id="min_age"
                  label=" Target Min Age"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="max_age"
                  label="Target Max Age"
                  name="max_age"
                  autoComplete="max_age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="Target State"
                  name="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="Target City"
                  type="city"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Target Country"
                  type="country"
                  id="country"
                  autoComplete="country"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Ad
            </Button>
          </Box>
        </Box>
      </Container>
  );
}