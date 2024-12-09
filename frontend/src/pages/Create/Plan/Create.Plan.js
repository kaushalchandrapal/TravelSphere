

import React, { useState, useEffect } from 'react';
import './CreatePlan.css';
import '../../../components/Navbar/Navbar';
import { InputField } from '../../../components';
import TextArea from '../../../components/TextArea/TextArea';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Plan() {
	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		startDate: '',
		endDate: '',
		destination: '',
		estimatedExpenses: '',
		travelDescription: '',
	};


	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState(initialValues);
	const [isSubmit, setIsSubmit] = useState(false);
	const [errorCheck, setErrorCheck] = useState(false);
	const [token,setToken] = useState('');

	useEffect(() => {
		setToken(localStorage.getItem('token'));
	},[])
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setErrorCheck(true);

		if (
			Object.keys(formErrors).length === 0 &&
			formValues.firstName !== '' &&
			formValues.lastName !== '' &&
			formValues.email !== '' &&
			formValues.startDate !== '' &&
			formValues.endDate !== '' &&
			formValues.destination !== '' &&
			formValues.estimatedExpenses !== '' &&
			formValues.travelDescription !== ''
		) {
			setIsSubmit(true);
		}
	};

	useEffect(() => {
		if (errorCheck) {
			setFormErrors(validate(formValues));
		}
		if (isSubmit) {
			(async function () {
				await axios({
					method: 'post',
					url: '/plan/create',
					data: {
						firstName: formValues.firstName,
						lastName: formValues.lastName,
						email: formValues.email,
						startDate: formValues.startDate,
						endDate: formValues.endDate,
						destination: formValues.destination,
						estimatedExpenses: formValues.estimatedExpenses,
						travelDescription: formValues.travelDescription,
					},
					headers: { 
						'Content-Type': 'application/json',
						'Authorization' : `Bearer ${token}`
					},
				})
					.then((response) => {
						if (response.data.status === 'ok') {
							navigate('/plan');
						}
					})
					.catch((error) => {
						// alert(error);
					});
			})();
		}
	}, [isSubmit, navigate, formValues, errorCheck]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const nameregex = /^[a-z ,.'-]+$/i;
		const numRegex = /^[0-9]*$/i;
		const dateRegex =
			/^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(202[3-9]))$/i;

		if (values.firstName === '') {
			errors.firstName = 'Firstname is required!';
		} else if (!nameregex.test(values.firstName)) {
			errors.firstName = "Firstame doesn't contain numbers";
		}

		if (values.lastName === '') {
			errors.lastName = 'Lastname is required!';
		} else if (!nameregex.test(values.lastName)) {
			errors.lastName = "Lastname doesn't contain numbers";
		}

		if (!values.email) {
			errors.email = 'Email is required!';
		} else if (!regex.test(values.email)) {
			errors.email = 'Please enter a valid email format!';
		}

		if (!values.startDate) {
			errors.startDate = 'Start Date is required!';
		} else if (!dateRegex.test(values.startDate)) {
			errors.startDate = 'Please enter a date in a format shown below';
		}

		if (!values.endDate) {
			errors.endDate = 'End Date is required!';
		} else if (!dateRegex.test(values.endDate)) {
			errors.endDate = 'Please enter a date in a format shown below';
		}

		const startDateStr = values.startDate;
		const endDateStr = values.endDate;

		const dateFormat = 'DD/MM/YYYY';

		const startDate = moment(startDateStr, dateFormat);
		const endDate = moment(endDateStr, dateFormat);

		if (!endDate.isSameOrAfter(startDate)) {
			errors.endDate = 'End date should not be less than start date';
		}

		if (!startDate.isSameOrAfter(moment())) {
			errors.startDate = "Startdate can't be less than today's date";
		}

		if (values.destination === '') {
			errors.destination = 'Destination is required!';
		} else if (!nameregex.test(values.destination)) {
			errors.destination = "Destination doesn't contain numbers";
		}

		if (!values.estimatedExpenses) {
			errors.estimatedExpenses = 'Estimated Expanses Details is required!';
		} else if (!numRegex.test(values.estimatedExpenses)) {
			errors.estimatedExpenses = "Expense doesn't contains alaphabets";
		}

		if (!values.travelDescription) {
			errors.travelDescription = 'Description of Travel is required!';
		}
		return errors;
	};

	return (
		<>
			<div className="page-container">
				<div className="create-plan-page">
					<div className="title">Create Plan</div>

					<form
						className="form"
						onSubmit={handleSubmit}
					>
						<div className="name-in-plan">
							<InputField
								type="text"
								name="firstName"
								id="firstName"
								value={formValues.firstName}
								handleChange={handleChange}
								label="Firstname"
								error={formErrors.firstName}
							/>

							<InputField
								type="text"
								name="lastName"
								value={formValues.lastName}
								handleChange={handleChange}
								label="Lastname"
								error={formErrors.lastName}
							/>
						</div>

						<InputField
							type="text"
							name="email"
							value={formValues.email}
							handleChange={handleChange}
							label="Email"
							error={formErrors.email}
						/>

						<div className="name-in-plan">
							<InputField
								type="text"
								name="startDate"
								value={formValues.startDate}
								handleChange={handleChange}
								label="Startdate"
								info="dd/mm/yyyy"
								error={formErrors.startDate}
							/>

							<InputField
								type="text"
								name="endDate"
								value={formValues.endDate}
								handleChange={handleChange}
								label="Enddate"
								info="dd/mm/yyyy"
								error={formErrors.endDate}
							/>
						</div>
						<div className="name-in-plan">
							<InputField
								type="text"
								name="destination"
								value={formValues.destination}
								handleChange={handleChange}
								label="Destination"
								error={formErrors.destination}
							/>

							<InputField
								type="text"
								name="estimatedExpenses"
								value={formValues.estimatedExpenses}
								handleChange={handleChange}
								label="Estimated Expense"
								error={formErrors.estimatedExpenses}
							/>
						</div>
						<TextArea
							row={2}
							name="travelDescription"
							value={formValues.travelDescription}
							handleChange={handleChange}
							label="Travel Description"
							error={formErrors.travelDescription}
						/>

						<div className="feed_container-latest_trip_div-button">
							<Button
								type="submit"
								variant="blue"
								name="Post this Plan"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Plan;
