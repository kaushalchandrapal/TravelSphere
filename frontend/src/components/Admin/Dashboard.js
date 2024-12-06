import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { axios } from '../../utils/axios';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalPlans: 0,
    totalLiveUpdates: 0,
  });

  useEffect(() => {
    axios.get('/admin/analytics')
      .then((response) => setAnalytics(response.data))
      .catch((error) => console.error('Error fetching analytics:', error));
  }, []);

  return (
    <Grid container spacing={3}>
      {Object.entries(analytics).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={3} key={key}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{key.replace('total', '').toUpperCase()}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
