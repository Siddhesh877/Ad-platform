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
import { useNavigate   } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright @ Siddhesh Parate '}
      {/* <Link color="inherit" href="https://mui.com/">
        © Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const handleLoginResponse = (response) => {
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  } else {
    console.error('Login failed:', response.data.error);
  }
};

export default function SignIn() {

  const [contained, setContained] = React.useState(1); // 0 for business, 1 for viewer
  const navigate = useNavigate();

  const logFormDataToBusiness = (postData) => {
    axios.post('http://localhost:5501/api/business/login', postData)
    .then((response) => {
      handleLoginResponse(response);
      // window.location.href = 'http://localhost:3000/business';
      navigate('/business', { replace: true });

    })
    .catch((error) => {console.error('Login error:', error)});
    // console.log(postData);
  };

  const logFormDataToViewer = (postData) => {
    axios.post('http://localhost:5501/api/viewer/login', postData)
    .then((response) => {
      handleLoginResponse(response);
      navigate('/viewer', { replace: true });
    })
    .catch((error) => {console.error('Login error:', error)});
    console.log(postData);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        fromViewer: contained,
        email: data.get('email'),
        password: data.get('password'),
      };
    const postData = {
        email: data.get('email'),
        password: data.get('password'),
    }
      if(formData.fromViewer === 0 )
      {
        logFormDataToBusiness(postData);
      }
      else
      {
        logFormDataToViewer(postData);
      }
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}