/** @format */

import React, { useEffect, useState } from "react";
import { Button, Navbar } from "../../components";
import Path from "../../constants/Path";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./Feed.css"; // Updated to match correct case

const Feed = () => {
  const dispatch = useDispatch();
  const [recentTrip, setRecentTrip] = useState([]);
  const [posts, setPosts] = useState([]);
  const [liveUpdates, setLiveUpdates] = useState([]);

  useEffect(() => {
    // fetch all posts from database
    axios
      .get(`http://localhost:2020/post/view`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });

    // fetch all live updates from database
    axios
      .get(`http://localhost:2020/liveupdate/view`)
      .then(function (response) {
        setLiveUpdates(response.data);
      })
      .catch((err) => {
        console.log("Error fetching live updates:", err);
      });

    // fetch recent trips
    axios
      .get("http://localhost:2020/trip")
      .then((response) => {
        setRecentTrip(response.data.trips.reverse().slice(0, 5));
      })
      .catch((err) => {
        console.log("Error fetching trips:", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="feed_container">
        <div className="live_update_div_in_home">
          {liveUpdates.map((liveUpdate, i) => (
            <div key={i} className="live-update-item">
              <img
                src={liveUpdate.image}
                alt="Live update"
                className="live-update-image"
              />
              <div className="userName_in_live_update_outer_div">
                <span className="userName_in_live_update">
                  {liveUpdate.userName}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="feed_container-post_div">
          {posts.map((post, i) => (
            <div key={i} className="post-item">
              <div className="post-header">
                <span className="post-username">{post.userName}</span>
                <span className="post-location">{post.location}</span>
              </div>
              <img src={post.image} alt="Post content" className="post-image" />
              <p className="post-description">{post.description}</p>
            </div>
          ))}
        </div>

        <div className="feed_container-latest_trip_div">
          <div className="feed_container-latest_trip_div-heading">
            Recent trips
          </div>
          {recentTrip.map((trip, i) => (
            <div key={i} className="recent-trip-item">
              <span className="trip-name">{trip.tripName}</span>
              <span className="trip-date">{trip.tripDate}</span>
              <span className="trip-expense">${trip.totalExpense}</span>
            </div>
          ))}
          <div className="feed_container-latest_trip_div-button">
            <Link to={Path.MANAGE_EXPENSES}>
              <Button variant="blue" name="SEE ALL EXPENSES" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
