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
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright @ Siddhesh Parate '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {

  const [contained, setContained] = React.useState(1); // 0 for business, 1 for viewer
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const navigate = useNavigate();

  const logFormDataToBusiness = async (postData) => {
    const response = await axios.post('http://localhost:5501/api/business/registration', postData)
    .then((response) => {
      console.log(response);
      // window.location.href = 'http://localhost:3000/login';
      setRedirectToLogin(true);
    })
    .catch((error) => {console.error('Login error:', error)});
    console.log(postData);
  };

  const logFormDataToViewer = async (postData) => {
    const response = await axios.post('http://localhost:5501/api/viewer/registration', postData)
    .then((response) => {
      console.log(response);
      // window.location.href = 'http://localhost:3000/login';
      navigate('/login', { replace: true });
    })
    .catch((error) => {console.error('Login error:', error)});
    console.log(postData);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (contained === 1) {
      const postData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        age: parseInt(data.get('age')),
        gender: data.get('gender'),
        location: {
          state: data.get('state'),
          city: data.get('city'),
          country: data.get('country')
        }
      };
      // Call the logFormDataToBusiness function for viewer registration
      logFormDataToViewer(postData);
    } else {
      const postData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        address: {
          street: data.get('street'),
          city: data.get('city'),
          state: data.get('state'),
          zip: parseInt(data.get('zip')),
          country: data.get('country')
        },
        website: data.get('website'),
        phone_number: data.get('phone_number')
      };
      // Call the logFormDataToBusiness function for business registration
      logFormDataToBusiness(postData);
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        {/* {redirectToLogin && navigate('/login', { replace: true })} */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack spacing={30} direction="row">
                <Button variant={contained === 0 ? "constined" : "outlined"} onClick={()=>{setContained(1)}}>Viewer</Button>
                <Button variant={contained === 1 ? "constined" : "outlined"} onClick={()=>{setContained(0)}}>Business</Button>
            </Stack>
            
            { contained === 1 ? <>
                <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="eamil"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  autoComplete="age"
                  name="age"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  autoComplete="gender"
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="state"
              label="State"
              type="state"
              id="state"
              autoComplete="state"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="City"
              type="city"
              id="city"
              autoComplete="city"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="country"
              label="Country"
              type="country"
              id="country"
              autoComplete="country"
            /></> : <> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="eamil"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                margin="normal"
                autoComplete="street"
                name="street"
                required
                fullWidth
                id="street"
                label="Street"
                autoFocus
                />
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              autoComplete="state"
              name="state"
              required
              fullWidth
              id="state"
              label="State"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="zip"
              label="Zip"
              name="zip"
              autoComplete="zip"
            />
          </Grid>
        </Grid>
        <TextField
              margin="normal"
              autoComplete="website"
              name="website"
              fullWidth
              id="website"
              label="Website"
              autoFocus
        />
        <TextField
              margin="normal"
              autoComplete="phone_number"
              name="phone_number"
              required
              fullWidth
              id="phone_number"
              label="Ph.No"
              autoFocus
            />
        </>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

  );

};


