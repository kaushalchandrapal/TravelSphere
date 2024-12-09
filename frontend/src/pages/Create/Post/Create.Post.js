

import React, { useEffect, useState } from 'react';
import { InputField } from '../../../components';
import { Button } from '../../../components';
import TextArea from '../../../components/TextArea/TextArea';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {
	// const initialValues = {
	// 	// Static data given, because user data did not came from authentication module!!
	// 	userId: 123,
	// 	// userId: props.userId,
	// 	userName: 'Shani',
	// 	// userName: props.userName,
	// 	postImage: '',
	// 	location: '',
	// 	description: '',
	// };

	const [user , setUser] = useState({});

	const initialErrorValues = {
		imageError: '',
		locationError: '',
	};
	const locationRegex = /^[a-z ,.'-]+$/i;

	const [formValues, setFormValues] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [image, setImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(initialErrorValues);
	const [isImageValidated, setIsImageValidaed] = useState(false);
	const [isLocationValidated, setIsLocationValidated] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")));
		setFormValues(JSON.parse(localStorage.getItem("user")));
	},[])

	const onImageChange = (e) => {
		const imageUrl = validateImage(URL.createObjectURL(e.target.files[0]));
		setImage(imageUrl);
		setFormValues((prevState) => ({
			...prevState,
			postImage: validateImage(e.target.files[0]),
		}));
	};
	// validate Uploaded image
	const validateImage = (value) => {
		value === ' '
			? setErrorMessage((prevState) => ({
					...prevState,
					imageError: 'please select an Image!!',
			  }))
			: setErrorMessage((prevState) => ({
					...prevState,
					imageError: '',
			  }));
		setIsImageValidaed(true);
		return value;
	};

	const handleChangeLocation = (e) => {
		setFormValues((prevState) => ({
			...prevState,
			location: validateLocation(e.target.value),
		}));
	};

	// validate entered location
	const validateLocation = (value) => {
		if (value === '') {
			setErrorMessage((prevState) => ({
				...prevState,
				locationError: 'please enter valid input!!',
			}));
		} else if (!locationRegex.test(value)) {
			setErrorMessage((prevState) => ({
				...prevState,
				locationError: 'Location sould not contain numbers!!',
			}));
		} else {
			setErrorMessage((prevState) => ({
				...prevState,
				locationError: '',
			}));
		}
		setIsLocationValidated(true);
		return value;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// check all fields are validated and no error found, then create post
		if (isImageValidated && isLocationValidated) {
			if (
				errorMessage.locationError === '' &&
				errorMessage.imageError === '' &&
				image !== ''
			) {
				axios
					.post(
						'http://localhost:5001/post/create',
						{
							userId: formValues._id,
							userName: formValues.userName,
							postImage: formValues.postImage,
							location: formValues.location,
							description: formValues.description,
						},
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					)
					.then(function (response) {
						// dispatch(createPost(formValues));
					});

				setIsSubmit(true);
			} else {
				setIsSubmit(false);
				toast.error('Invalid data entered!!', {
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
		} else {
			setIsSubmit(false);
			toast.error('Please add Image and Location!!', {
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

	useEffect(() => {
		if (isSubmit) {
			navigate('/profile');
			toast.success('Post Created successfully!!', {
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
	}, [isSubmit, navigate]);

	return (
		<div className="create_post_outer_div">
			<div className="title_for_create_post">Create New Post</div>

			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				<div className="createpost-form">
					<div className="photo-select">
						<InputField
							type="file"
							name="postImage"
							id="photo"
							accept="image/png, image/gif, image/jpeg"
							error={errorMessage.imageError}
							handleChange={onImageChange}
							label="Select a photo"
						/>

						{image ? (
							<img
								className="post-image"
								src={image}
								id="target"
								alt="preview"
								name="postImage"
							/>
						) : null}
					</div>

					<div className="post-info">
						<div className="input-container ic2">
							<InputField
								type="text"
								name="location"
								value={formValues.location}
								error={errorMessage.locationError}
								handleChange={handleChangeLocation}
								label="Location"
							/>
						</div>

						<div className="input-container-for-post ic2">
							<TextArea
								style={{
									height: '30vh',
								}}
								row={5}
								name="description"
								value={formValues.description}
								handleChange={handleChange}
								label="Description of place"
							/>
						</div>

						<div className="feed_container-latest_trip_div-button">
							<Button
								type="submit"
								onSubmit={handleSubmit}
								variant="blue"
								name="POST"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default CreatePost;
