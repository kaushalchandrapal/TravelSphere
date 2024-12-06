import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { axios } from '../../utils/axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/admin/users/${id}`)
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{`${user.firstname} ${user.lastname}`}</TableCell>
            <TableCell>{user.emailid}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Users;
