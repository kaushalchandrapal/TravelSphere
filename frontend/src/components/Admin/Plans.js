import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import { Event, LocationOn, AttachMoney, Delete } from '@mui/icons-material';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  // Fetch plans on component load
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get('/admin/plans');
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error.message);
      }
    };
    fetchPlans();
  }, []);

  // Handle plan deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/plans/${id}`); // Backend delete request
      setPlans(plans.filter((plan) => plan._id !== id)); // Update UI
    } catch (error) {
      console.error('Error deleting plan:', error.message);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Travel Plans
      </Typography>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <LocationOn sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {plan.destination}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Event sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Start Date: {plan.startDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Event sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  End Date: {plan.endDate}
                </Typography>
                <Typography variant="body1" color="textPrimary" sx={{ marginTop: '10px' }}>
                  <AttachMoney sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Estimated Expenses: ${plan.estimatedExpenses}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => console.log(`View Details for Plan ID: ${plan._id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Plans;
