import React from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography, Button } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login page
      navigate('/');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/admin/users">
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/admin/posts">
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button component={Link} to="/admin/plans">
            <ListItemText primary="Plans" />
          </ListItem>
          <ListItem button component={Link} to="/admin/liveupdates">
            <ListItemText primary="Live Updates" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
