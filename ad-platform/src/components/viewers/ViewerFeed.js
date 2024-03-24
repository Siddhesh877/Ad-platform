import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useNavigate  } from 'react-router-dom';


// const jwtToken = localStorage.getItem('token');
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ5ZWQ0NGQ1YWQ5NDdmZDMwMWM0MiIsImlhdCI6MTcxMTI3MDg5MCwiZXhwIjoxNzExMzU3MjkwfQ.IX4Y2XfoAojBFl3EoJ72ZYZkgFEo5TRCJED9D1LnIqw"

const columns = [
  { id: 'ad', label: 'Your Ads', minWidth: 200, align: 'center' },
];


export default function ViewerFeed() {
    const [Ads, setAds] = React.useState([]);
    const navigate = useNavigate();
  
    const fetchAds = async () => {
      axios
        .get('http://localhost:5501/api/viewer/getTargetedAds', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          setAds(response.data);
        })
        .catch((error) => {
          console.error('You are not authorized', error);
          // window.location.href = 'http://localhost:3000/login';
          // localStorage.removeItem('token');
          navigate('/login', { replace: true });
        });
    };

    React.useEffect(() => {
      fetchAds();
    }, []);
  
    return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontSize: '1.6rem', fontWeight: 'normal' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Ads.map((ads, index) => (
                  <TableRow
                    key={ads._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderRadius: '8px', // Add border radius for a rounded look
                      padding: '8px', // Add padding to increase spacing between rows
                      '& > *': { borderBottom: 'unset' }, // Remove bottom border from TableCell
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: '20%' }}>
                      <Grid item xs={12} sm={6} md={4} key={ads._id}>
                        <Card sx={{ width: { xs: '100%', sm: '200%', md: '300%' } }}>
                          <CardContent>
                            <Typography variant="h6" component="div">
                              {ads.content.title}
                            </Typography>
                            <Box component="img" sx={{ maxWidth: '100%', marginBottom: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {ads.content.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  }