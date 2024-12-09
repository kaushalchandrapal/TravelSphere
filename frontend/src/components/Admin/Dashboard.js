import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Box, Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axios.get('/admin/analytics');
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error.message);
      }
    };
    fetchAnalytics();
  }, []);

  const items = [
    { label: 'Total Users', value: analytics.totalUsers },
    { label: 'Total Posts', value: analytics.totalPosts },
    { label: 'Total Plans', value: analytics.totalPlans },
    { label: 'Total Live Updates', value: analytics.totalLiveUpdates },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4">{item.value || 0}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
