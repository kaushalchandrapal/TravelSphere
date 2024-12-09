

import React, { useEffect, useState } from 'react';
import { InputField } from '../../../components';
import { Button } from '../../../components';
import './CreateLiveUpdates.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateLiveUpdates = () => {
	

	const [formValues, setFormValues] = useState();
	const [userData , setUserData] = useState({});
	const [token , setToken] = useState("");


	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem('user')))
		setToken(localStorage.getItem('token'));
	},[])

	useEffect(() => {
		setFormValues({
			userName : userData.userName,
		})
	},[]);

	const [isSubmit, setIsSubmit] = useState(false);
	const [image, setImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState('please select an Image!!');

	const navigate = useNavigate();

	const onImageChange = (e) => {
		// create url of uploaded image to show it on the same page
		const imageUrl = validateImage(URL.createObjectURL(e.target.files[0]));
		setImage(imageUrl);
		setFormValues((prevState) => ({
			...prevState,
			liveUpdate: e.target.files[0],
		}));
	};

	const validateImage = (value) => {
		value === ' '
			? setErrorMessage('please select an Image!!')
			: setErrorMessage('');
		return value;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// check there are no errors and create live update
		if (errorMessage === '' && image !== undefined) {
			axios
				.post(
					'/liveUpdate/create',
					{
						liveUpdate: formValues.liveUpdate,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'Authorization' : `Bearer ${token}`
						},
					}
				)
				.then(function (response) {
					// dispatch(createPost(formValues));
				});
			setIsSubmit(true);
			toast.success('Live Update Created successfully!!', {
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
			setIsSubmit(false);
			toast.error('Please select an Image!!', {
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
		}
	}, [isSubmit, navigate]);

	return (
		<div className="create_live_update_div_outer_div">
			<div className="Live-update-title">Create Live Updates</div>

			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				<div className="createLiveUpdate-form">
					<div className="liveUpdatePhoto-select">
						<InputField
							type="file"
							name="liveUpdate"
							id="LiveUpdate"
							accept="image/png, image/gif, image/jpeg"
							handleChange={onImageChange}
							label="Select a photo"
						/>

						{image ? (
							<img
								className="liveUpdate-image"
								src={image}
								id="target"
								alt="preview"
								name="liveUpdate"
							/>
						) : null}
					</div>

					<div className="create_live_update_button">
						<Button
							type="submit"
							onSubmit={handleSubmit}
							variant="blue"
							name="POST"
						/>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateLiveUpdates;
