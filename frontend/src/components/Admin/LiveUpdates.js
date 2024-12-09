import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import { Delete, Person, DateRange } from '@mui/icons-material';

const LiveUpdates = () => {
  const [liveUpdates, setLiveUpdates] = useState([]);

  // Fetch live updates on component mount
  useEffect(() => {
    const fetchLiveUpdates = async () => {
      try {
        const { data } = await axios.get('/admin/liveupdates');
        setLiveUpdates(data);
      } catch (error) {
        console.error('Error fetching live updates:', error.message);
      }
    };
    fetchLiveUpdates();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/liveupdates/${id}`);
      setLiveUpdates(liveUpdates.filter((update) => update._id !== id));
    } catch (error) {
      console.error('Error deleting live update:', error.message);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Live Updates
      </Typography>
      <Grid container spacing={3}>
        {liveUpdates.map((update) => (
          <Grid item xs={12} sm={6} md={4} key={update._id}>
            <Card
              elevation={3}
              sx={{
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={update.image}
                alt="Live Update"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Person sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {update.userName || 'Anonymous'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <DateRange sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {new Date(update.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(update._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveUpdates;
