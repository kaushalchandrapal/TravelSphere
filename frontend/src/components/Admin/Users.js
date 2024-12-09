import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Delete, AdminPanelSettings, Person } from '@mui/icons-material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/admin/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card elevation={3}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: user.role === 'admin' ? '#3f51b5' : '#f50057' }}>
                    {user.firstname.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={`${user.firstname} ${user.lastname}`}
                subheader={user.emailid}
                action={
                  <IconButton
                    aria-label="role"
                    color={user.role === 'admin' ? 'primary' : 'default'}
                  >
                    {user.role === 'admin' ? (
                      <AdminPanelSettings />
                    ) : (
                      <Person />
                    )}
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  style={{ marginTop: '10px' }}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Users;
