/** @format */

import { Button } from "../../components";
import { Navbar } from "../../components";
import UserBio from "../../components/UserProfile/UserBio.js";

// import { IconComponent } from '../../components';

import React, { useState } from "react";
import { MapPin, Globe, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  const containerStyle = {
    maxWidth: "100%",
    margin: "0 auto",

    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#4a0e4e",
    color: "white",
    padding: "20px",
    marginBottom: "20px",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  };

  const navButtonStyle = {
    padding: "10px 20px",
    border: "none",
    background: "none",
    color: "white",
    cursor: "pointer",
  };

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

  const tabStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    paddingleft: "70px",
  };

  const tabButtonStyle = (isActive) => ({
    padding: "10px 20px",
    border: "none",
    backgroundColor: isActive ? "#4a0e4e" : "#e0e0e0",
    color: isActive ? "white" : "black",
    cursor: "pointer",
    marginRight: "10px",
  });

  const galleryStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  };

  const imageContainerStyle = {
    position: "relative",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const imageOverlayStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "10px",
  };

  return (
    <div>
      <Navbar />
      <main>
        <UserBio />

        <div style={tabStyle}>
          {[
            "Post",
            "Upload Post",
            "adventures",
            "friends",
            "More",
            "Logout",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={tabButtonStyle(activeTab === tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Post" && (
          <div style={galleryStyle}>
            <h2>Here All the Post come</h2>
          </div>
        )}
        {activeTab === "Upload Post" && (
          <div style={galleryStyle}>
            <h2>Here All the Post come</h2>
          </div>
        )}

        {activeTab === "adventures" && (
          <div>
            {[
              "Trekking in Nepal",
              "Scuba Diving in Great Barrier Reef",
              "Northern Lights in Iceland",
            ].map((adventure, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <h3 style={{ marginBottom: "5px" }}>{adventure}</h3>
                <p>Amazing experience, would do it again!</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "friends" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "20px",
            }}
          >
            {["Alex", "Sam", "Jordan", "Taylor", "Casey", "Morgan"].map(
              (friend, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                    padding: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={`/api/placeholder/${200 + index}`}
                    alt={friend}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <h4 style={{ marginBottom: "5px" }}>{friend}</h4>
                  <p style={{ fontSize: "14px" }}>4 trips together</p>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === "More" && (
          <div style={galleryStyle}>
            <h2>More Stttings </h2>
          </div>
        )}
        {activeTab === "Logout" && (
          <div style={galleryStyle}>
            <h2>More Stttings </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
