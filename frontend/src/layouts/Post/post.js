

import React from 'react';
import './post.css';
import { IconComponent } from '../../components';
import { ProfilePic } from '../../components';
import EditPostPopup from '../../components/PopUp/EditPostPopup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/postReducer';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Post = (props) => {
	const [showAll, setShowAll] = useState(false);
	const dispatch = useDispatch();
	const [popup, setPopup] = useState(false);
	const [viewPopUpComponent, setViewPopUpComponent] = useState(false);

	const popupFunction = () => {
		setPopup(true);
		setViewPopUpComponent(true);
	};
	function toggleShowAll() {
		setShowAll(!showAll);
	}

	// delete post from database
	function deleteFunction() {
		return function () {
			let message = 'Confirm delete?';
			if (window.confirm(message) === true) {
				axios
					.post(
						`/post/delete/${props.postId}`
					)
					.then(function (response) {
						dispatch(createPost(response.data));
					})
					.catch((error) => {
						console.log(error);
					});

				toast.success('Post deleted successfully!!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else {
				toast.warn('Cancelled delete!!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
		};
	}

	const [model, setModel] = useState(false);

	const toggleModel = () => {
		setModel(!model);
	};

	return (
		<>
			{props.type === 'user_post' ? (
				<div className="post">
					<div className="user_header">
						<img
							className="location_image_in_post"
							src="./Images/location.jpg"
							alt="location"
						/>
						<h6 className="location_in_post">{props.location}</h6>
					</div>
					<div className="post_img_div">
						<img
							onClick={toggleModel}
							className="post_image"
							src={props.image}
							alt="Post"
						/>
					</div>

					<div className="post_description_user">
						<div className="user_name_and_description">
							<div>
								{/* slice description and put show more button */}
								{showAll
									? props.description
									: `${props.description.slice(0, 200)}....`}
								<button
									className="show_more_btn_in_description"
									onClick={toggleShowAll}
								>
									{showAll ? 'show less' : 'show more'}
								</button>
							</div>
						</div>
						<div className="btn_div">
							<div className="edit_img_div">
								<IconComponent
									className="edit_img"
									name="edit"
									onClick={popupFunction}
								/>
								{viewPopUpComponent ? (
									<EditPostPopup
										trigger={popup}
										setTrigger={setPopup}
										postId={props.postId}
									></EditPostPopup>
								) : (
									''
								)}
							</div>
							<div
								className="delete_img_div"
								onClick={deleteFunction()}
							>
								<IconComponent
									className="delete_img"
									name="delete"
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="post">
					<div className="user_header">
						<div className="profile_pic_in_post">
							<ProfilePic
								size="small"
								image_url={props.userImage}
								// Static data given, because user ID is not coming from authentication module yet!!
								// image_url={props.ProfilePic}
							/>
						</div>
						<div className="user_name_and_location_in_post">
							<h4 className="post_user_name">{props.location}</h4>
							<h6 className="post_location"> From {props.userName}</h6>
						</div>
					</div>
					<div className="post_img_div">
						<img
							onClick={toggleModel}
							className="post_image"
							src={props.image}
							alt="Post"
						/>
					</div>
					<div className="post_description">
						<div className="user_name_and_description">
							<div>
								{/* slice description and put show more button */}
								{showAll
									? props.description
									: `${props.description.slice(0, 260)}...`}
								<button
									className="show_more_btn_in_description"
									onClick={toggleShowAll}
								>
									{showAll ? 'show less' : 'show more'}
								</button>
							</div>
						</div>
						<div className="delete_and_update_btn"></div>
					</div>
				</div>
			)}
			{model && (
				<div className="model">
					<div
						onClick={toggleModel}
						className="overlay"
					></div>
					<span onClick={toggleModel}>&times;</span>
					<img
						className="post_image_in_big_view"
						src={props.image}
						alt="No profile pic available"
					></img>
				</div>
			)}
		</>
	);
};

export default Post;
