

import React, { useState, useEffect } from 'react';
import { Button, InputField } from '..';
import TextArea from '../TextArea/TextArea';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/postReducer';
import { toast } from 'react-toastify';
import { IconComponent } from '../../components';

import 'react-toastify/dist/ReactToastify.css';
import './EditPostPopup.css';
import axios from 'axios';

function EditPostPopup(props) {
	const dispatch = useDispatch();
	const initialErrorValues = {
		locationError: null,
		descriptionError: null,
	};
	const locationRegex = /^[a-z ,.'-]+$/i;
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [errorMessage, setErrorMessage] = useState(initialErrorValues);

	const handleChangeLocation = (e) => {
		setLocation(validateLocation(e.target.value));
	};
	const handleChangeDescription = (e) => {
		setDescription(validateDescription(e.target.value));
	};

	// validate location entered by user
	const validateLocation = (value) => {
		if (value === '') {
			setErrorMessage({
				locationError: 'please enter valid input!!',
			});
		} else if (!locationRegex.test(value)) {
			setErrorMessage({
				locationError:
					'Location sould not contain numbers or special characters!!',
			});
		} else {
			setErrorMessage({
				locationError: '',
			});
		}
		return value;
	};

	// validate location entered by user
	const validateDescription = (value) => {
		if (value === '') {
			setErrorMessage({
				descriptionError: 'please enter valid description!!',
			});
		} else {
			setErrorMessage({
				descriptionError: '',
			});
		}
		return value;
	};

	useEffect(() => {
		// Load all posts from database
		const getPostData = () => {
			axios
				.get(
					`/post/viewById/${props.postId}`
				)
				.then(function (response) {
					setLocation(response.data.location);
					setDescription(response.data.description);
				});
		};
		getPostData();
	}, [props.postId]);

	// update post in database and redux state
	const handleupdatePost = () => {
		if (!errorMessage.locationError && !errorMessage.descriptionError) {
			axios
				.put(
					`/post/update/${props.postId}`,
					{
						location: location,
						description: description,
					}
				)
				.then(function (response) {
					dispatch(updatePost({ postId: props.postId, location, description }));
				});
			createToast();

			props.setTrigger(false);
		} else {
			createErrorToast();
		}
	};

	const createToast = () => {
		toast.info('Post updated successfully!!', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};
	const createErrorToast = () => {
		toast.error(errorMessage.locationError || errorMessage.descriptionError, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	return props.trigger ? (
		<div className="editPostPopup">
			<div className="editPost-popup-inner">
				<div className="edit_post_title_and_close_btn">
					<div className="edit_post_pop_up_title">Edit Post</div>
					<div
						className="close-btn"
						onClick={() => props.setTrigger(false)}
					>
						<IconComponent
							className="close_icon_in_div"
							name="close"
						/>
					</div>
				</div>
				<div className="popup-input-list">
					<InputField
						label="Location"
						type="text"
						name="location"
						value={location}
						error={errorMessage.locationError}
						handleChange={handleChangeLocation}
					/>
					<TextArea
						style={{
							height: '30vh',
						}}
						label="Description"
						row={6}
						id="description"
						name="description"
						value={description}
						error={errorMessage.descriptionError}
						handleChange={handleChangeDescription}
					/>
				</div>
				<div className="popup_save_button_for_post">
					<Button
						variant="blue"
						name="Update"
						onClick={() => {
							handleupdatePost();
						}}
					/>
				</div>
				{props.children}
			</div>
		</div>
	) : (
		''
	);
}

export default EditPostPopup;
