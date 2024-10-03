import { useState, useEffect } from 'react';
import './Style.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Path from '../../constants/Path';
import Axios from 'axios';

const Host = process.env.REACT_APP_HOST_URL;

function RegistrationForm() {
	const initialValues = {
		fname: '',
		lname: '',
		email: '',
		password: '',
		cnfpassword: '',
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const nav = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit === true) {
			console.log('Successful registration');
			nav(Path.PROFILE_PAGE);
		}

		Axios.post('http://localhost:2020/register', {
        firstname:formValues.fname,
        lastname:formValues.lname,
        emailid:formValues.email,
        pass:formValues.password
    })
	}, [formErrors, isSubmit, nav]);


	const validate = (values) => {
		const errors = {};
		const txtreg = /^[a-zA-Z]*$/;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.fname) {
			errors.fname = 'First name is required!';
		} else if (!txtreg.test(values.fname)) {
			errors.fname = 'Please enter text only';
		}
		if (!values.lname) {
			errors.lname = 'Last name is required!';
		} else if (!txtreg.test(values.lname)) {
			errors.lname = 'Please enter text only';
		}

		if (!values.email) {
			errors.email = 'Email is required!';
		} else if (!regex.test(values.email)) {
			errors.email = 'This is not a valid email format!';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 4) {
			errors.password = 'Password must be more than 4 characters';
		} else if (values.password.length > 10) {
			errors.password = 'Password cannot exceed more than 10 characters';
		}
		if (!values.cnfpassword) {
			errors.cnfpassword = 'Password is required';
		} else if (values.cnfpassword !== values.password) {
			errors.cnfpassword = "Password doesn't match";
		}

		return errors;
	};

	return (
		<div className="body1">
			<div className="container">
				<h3> Sign-up to use our exciting features</h3>
				<form
					className="container_form"
					onSubmit={handleSubmit}
				>
					<h2>Sign-up</h2>

					<div className="ui form">
						<div className="field">
							<label className="container_lable">First Name</label>
							<input
								type="text"
								name="fname"
								className="fname_input"
								placeholder="First Name"
								value={formValues.fname}
								onChange={handleChange}
							/>
						</div>
						<p className="forgotpass">{formErrors.fname}</p>

						<div className="field">
							<label className="container_lable">Last Name</label>
							<input
								type="text"
								name="lname"
								className="lname_input"
								placeholder="Last Name"
								value={formValues.lname}
								onChange={handleChange}
							/>
						</div>
						<p className="forgotpass">{formErrors.lname}</p>

						<div className="field">
							<label className="container_lable">Email</label>
							<input
								type="text"
								name="email"
								className="email_input"
								placeholder="Email"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p className="forgotpass">{formErrors.email}</p>
						<div className="field">
							<label className="container_lable">Password</label>
							<input
								type="password"
								name="password"
								className="password_input"
								placeholder="Password"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p className="forgotpass">{formErrors.password}</p>

						<div className="field">
							<label className="container_lable">Confirm Password</label>
							<input
								type="password"
								name="cnfpassword"
								className="password_input"
								placeholder=" Re-enter Password"
								value={formValues.cnfpassword}
								onChange={handleChange}
							/>
						</div>
						<p className="forgotpass">{formErrors.cnfpassword}</p>

						<div>
							<p className="exstuser text-right">
								<Link to={'/'}>Already a user?</Link>
							</p>
						</div>

						<div className="btn">
							<button className="btn-login">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default RegistrationForm;
