import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

// const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ5ZWQ0NGQ1YWQ5NDdmZDMwMWM0MiIsImlhdCI6MTcxMTI3MDg5MCwiZXhwIjoxNzExMzU3MjkwfQ.IX4Y2XfoAojBFl3EoJ72ZYZkgFEo5TRCJED9D1LnIqw"
const jwtToken = localStorage.getItem('token');

export default function BasicCard() {
    const [user, setUser] = React.useState({});

    const fetchUserInformation = async () => {
        // const jwtToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5501/api/viewer/current', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            console.log(response);
            setUser(response.data);
        }
        ).catch((error) => {
            console.log(error);
        });
      // return response.data;
    }

    React.useEffect(() => {
        fetchUserInformation();
    }, []);

  return (
    <Card sx={{ minWidth: 275, marginRight:'1.5rem', marginLeft:'1.5rem' }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {user.name}
        </Typography>
        <Typography sx={{ fontSize: 18, mb: 2 }} color="text.secondary" gutterBottom>
          User Information
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.location?.city}, {user.location?.state}
          <br />
          {user.location?.country}
        </Typography>
      </CardContent>
      {/* option to edit user information can be added here */}
    </Card>
  );
}