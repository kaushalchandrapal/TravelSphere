import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { axios } from '../../utils/axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/admin/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/admin/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((error) => console.error('Error deleting post:', error));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Post ID</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post._id}>
            <TableCell>{post._id}</TableCell>
            <TableCell>{post.description}</TableCell>
            <TableCell>{post.userId}</TableCell>
            <TableCell>
              <Button variant="contained" color="error" onClick={() => handleDelete(post._id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Posts;
