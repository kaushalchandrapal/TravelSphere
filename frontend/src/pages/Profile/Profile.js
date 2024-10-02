import React from "react";
import { Avatar, Button, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import { useState } from "react";
import './Profile.css'; // Import the CSS file for profile page styles
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} className="profile-image-section">
              <Avatar
                alt="Profile Picture"
                src="/Images/profilePic.jpg"
                sx={{ width: 120, height: 120 }}
                className="profile-avatar"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
              >
                {editMode ? "Save Changes" : "Edit Profile"}
              </Button>
            </Grid>

            <Grid item xs={12} md={8} className="profile-info-section">
              <Typography variant="h4" className="profile-name">
                John Doe
              </Typography>
              <Typography variant="body1" className="profile-bio">
                Travel enthusiast. Exploring the world, one destination at a time. Solo traveler. Adventure seeker.
              </Typography>
              <Typography variant="body2" className="profile-details">
                Location: New York, USA
              </Typography>
              <Typography variant="body2" className="profile-details">
                Travel Style: Adventure, Solo, Budget
              </Typography>
              <Typography variant="body2" className="profile-details">
                Favorite Destinations: Iceland, Japan, Australia
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper className="profile-additional-info">
        <Typography variant="h6">Recent Trips</Typography>
        <Typography variant="body1">Trip to Iceland - March 2024</Typography>
        <Typography variant="body1">Backpacking in canada - October 2023</Typography>
        {/* Add more travel information here */}
      </Paper>
    </div>
  );
};

export default Profile;
