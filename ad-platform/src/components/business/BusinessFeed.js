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

const jwtToken = localStorage.getItem('token');

const columns = [
  { id: 'ad', label: 'Your Ads', minWidth: 200, align: 'center' },
];

const Modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ChildModal({ prop, onClose, onRefresh }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose callback when closing the child modal
  };

  const updateAd = (adId, formData) => {
    axios
      .put(`http://localhost:5501/api/business/updateAd/${adId}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        onRefresh(); // Call the onRefresh callback to update the parent component
        setOpen(false);
      })
      .catch((error) => console.error('Error updating ad:', error));
    console.log('Update ad with ID:', adId);
  };

  const handleUpdate = (event) => {
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
    updateAd(prop, formData);
    // console.log(prop);
    handleClose();
  };
  return (
    <React.Fragment>
      <Button size="small" variant="contained" color="success" onClick={handleOpen}>
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Modalstyle, width: '50%', height: '60%', overflowY: 'auto' }}>
          <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update Ad
            </Button>
          </Box>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function BusinessFeed() {
  const [Ads, setAds] = React.useState([]);
  const [open, setOpen] = React.useState([]);
  const [modalData, setModalData] = React.useState(null);
  const navigate = useNavigate();

  const handleOpen = (adData, index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = true;
    setOpen(updatedOpen);
    setModalData(adData);
  };

  const handleClose = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = false;
    setOpen(updatedOpen);
    setModalData(null);
  };

  const fetchAds = async () => {
    axios
      .get('http://localhost:5501/api/business/getAds', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setAds(response.data);
        setOpen(Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error('You are not authorized', error);
        // window.location.href = 'http://localhost:3000/login';
        // localStorage.removeItem('token');
        navigate('/login', { replace: true });
      });
  };

  const handleDelete = async (adId, index) => {
    if (Ads[index]._id === adId) {
      console.log('trying to Delete ad with ID:', adId);
    }
    try {
      const response = await axios.delete(`http://localhost:5501/api/business/deleteAd/${adId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response.data);
      handleClose(index); // Close the modal after successful deletion
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId)); // Remove the deleted ad from the state
      fetchAds(); // Fetch updated data after successful deletion
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };
  const handleRefresh = () => {
    fetchAds();
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
                        <CardActions>
                          <Button size="small" onClick={() => handleOpen(ads, index)}>
                            Learn More
                          </Button>
                          <Modal
                            open={open[index]}
                            onClose={() => handleClose(index)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={Modalstyle}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modalData?.content.title}
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {modalData?.content.description}
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '1rem' }}>
                                More content can be added here like photo or video of the ad
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                <ChildModal prop={ads._id} onClose={() => handleClose(index)} onRefresh={handleRefresh}/>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(ads._id, index)}
                                >
                                  Delete
                                </Button>
                              </Stack>
                            </Box>
                          </Modal>
                        </CardActions>
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