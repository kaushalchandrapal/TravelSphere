import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/admin/posts');
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                image={post.image}
                alt="Post Image"
                sx={{
                  objectFit: 'contain', // Ensures the image fits without cropping
                  maxHeight: 200, // Adjusts the height dynamically
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.userName || 'Unknown Author'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(post._id)}
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

export default Posts;
