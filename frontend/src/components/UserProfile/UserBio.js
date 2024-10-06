/** @format */
import { Navbar } from "..";
// import { IconComponent } from '../../components';

import React, { useState } from "react";
import { MapPin, Globe, Heart, MessageCircle } from "lucide-react";

const UserBio = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  const profileInfoStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };
  const editButtonStyle = {
    backgroundColor: "#4a0e4e",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    marginBottom: "10px",
  };

  return (
    <div>

      <main>
        <div style={profileInfoStyle}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
            Aria Evergreen
          </h2>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <MapPin size={16} style={{ marginRight: "5px" }} /> Nomad, Earth
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Globe size={16} style={{ marginRight: "5px" }} /> 42 Countries
            Explored
          </p>
          <button style={editButtonStyle}>Edit Profile</button>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Adventure seeker, story collector, and citizen of the world. My
            passport is my most prized possession, and the world is my
            classroom.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserBio;
