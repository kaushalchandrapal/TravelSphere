import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, CircularProgress, Box, LinearProgress } from "@mui/material";
import { Line, Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import axios from "../../utils/axios";

// Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/admin/analytics");
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error.message);
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  // Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "User Registrations",
        data: [10, 20, 15, 30, 25, 40, 50],
        borderColor: "#3e95cd",
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(62, 149, 205, 0.2)",
      },
      {
        label: "Posts Created",
        data: [5, 15, 10, 20, 18, 30, 35],
        borderColor: "#8e5ea2",
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(142, 94, 162, 0.2)",
      },
    ],
  };

  // Donut Chart Data
  const donutData = {
    labels: ["Posts", "Plans", "Live Updates"],
    datasets: [
      {
        label: "Content Distribution",
        data: [
          analytics.totalPosts || 0,
          analytics.totalPlans || 0,
          analytics.totalLiveUpdates || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Animation Variants
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box p={3}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Get insights and manage platform activities with ease.
        </Typography>
      </motion.div>

      <Grid container spacing={4} mt={2}>
        {/* Statistic Cards with Progress Bars */}
        {[
          { label: "Total Users", value: analytics.totalUsers || 0, progress: 80, color: "#3e95cd" },
          { label: "Total Posts", value: analytics.totalPosts || 0, progress: 70, color: "#8e5ea2" },
          { label: "Total Plans", value: analytics.totalPlans || 0, progress: 90, color: "#FFCE56" },
          { label: "Live Updates", value: analytics.totalLiveUpdates || 0, progress: 60, color: "#FF6384" },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={cardVariant}
            >
              <Paper elevation={4} sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4" color={item.color}>
                  {item.value}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={item.progress} sx={{ bgcolor: "#ddd", height: 8, borderRadius: 4 }} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}

        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <motion.div initial="hidden" animate="visible" transition={{ duration: 1 }} variants={cardVariant}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User and Post Activity Trends
              </Typography>
              <Line data={lineData} />
            </Paper>
          </motion.div>
        </Grid>

        {/* Donut Chart */}
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" animate="visible" transition={{ duration: 1.2 }} variants={cardVariant}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Content Distribution
              </Typography>
              <Doughnut data={donutData} />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
