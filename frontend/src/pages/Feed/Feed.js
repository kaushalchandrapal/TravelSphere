

import React, { useEffect, useState } from 'react';
import { LiveUpdateImage } from '../../components';
import { RecentExpense } from '../../components';
import { Button } from '../../components';
import { Post } from '../../layouts';
import './Feed.css';
import Path from '../../constants/Path';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { createPost } from '../../redux/postReducer';
import { createLiveUpdate } from '../../redux/liveUpdate.reducer';

const Feed = () => {
	const dispatch = useDispatch();
	const [recentTrip, setRecentTrip] = useState([]);
	const [token , setToken] = useState(localStorage.getItem("token"));
	const navigate = useNavigate();

	useEffect(() => {
		{localStorage.getItem("token") ? setToken(localStorage.getItem("token")) : navigate("/login") }
	},[])

	useEffect(() => {
		// fetch all posts from database
		axios
			.get(`/post/view` , 
				{
					headers : {
						'Authorization' : `Bearer ${token}`
					}
				})
			.then(function (response) {
				dispatch(createPost(response.data));
			});
		// detch all live updates from database
		axios
			.get(`/liveupdate/view`)
			.then(function (response) {
				dispatch(createLiveUpdate(response.data));
			})
			.catch((err) => {
				console.log(err);
			});
		axios.get('/trip' , {
			headers : {
				'Authorization' : `Bearer ${token}`
			}
		}).then((response) => {
			setRecentTrip(response.data.trips.reverse().slice(0, 5));
		});
	}, [dispatch]);
	const post = useSelector((state) => state.post);
	const liveUpdates = useSelector((state) => state.liveUpdate);

	return (
		<div className="feed_container">
			<div className="live_update_div_in_home">
				{liveUpdates.liveUpdatesData.map((liveUpdates, i) => {
					return (
						<>
							<LiveUpdateImage
								type="horizontal"
								live_update_url={liveUpdates.image}
							/>
							<div className="userName_in_live_update_outer_div">
								<span className="userName_in_live_update">
									{liveUpdates.userName}
								</span>
							</div>
						</>
					);
				})}
			</div>
			<div className="feed_container-post_div">
				{post.postData.map((post, i) => (
					<Post
						userImage = {post?.userId?.profilePic}
						type="feed_post"
						userName={post.userName}
						location={post.location}
						image={post.image}
						description={post.description}
					/>
				))}
			</div>
			<div className="feed_container-latest_trip_div">
				<div className="feed_container-latest_trip_div-heading">
					Recent trips
				</div>
				{recentTrip.map((trip, i) => (
					<RecentExpense
						className="recent_expense_in_feed"
						tripName={trip.tripName}
						tripTime={trip.tripDate}
						tripExpense={`$${trip.totalExpense}`}
					></RecentExpense>
				))}

				<div className="feed_container-latest_trip_div-button">
					<Link to={Path.MANAGE_EXPENSES}>
						<Button
							variant="blue"
							name="SEE ALL EXPENSES"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Feed;
