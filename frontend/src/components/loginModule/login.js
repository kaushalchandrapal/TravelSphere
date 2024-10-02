import React from 'react';
import { useState, useEffect } from 'react';
import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import Path from '../../constants/Path';
import Axios from 'axios';

const Host = process.env.REACT_APP_HOST_URL;

function Login() {
	const initialValues = { email: '', password: '' };

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
			console.log('Successful Login');
			nav(Path.PROFILE_PAGE);
		}

		Axios.post('http://localhost:2020/register', {
        emailid:formValues.email,
        pass:formValues.password
    })
	}, [formErrors, isSubmit, nav]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = 'Email is required!';
		} else if (!regex.test(values.email)) {
			errors.email = 'This is not a valid email format!';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 8) {
			errors.password = 'Password must be more than 8 characters';
		}

		return errors;
	};

	return (
		<div className="body1">
			<div className="container">
				<form
					className="container_form"
					onSubmit={handleSubmit}
				>
					<h2>Login</h2>

					<div className="ui form">
						<div className="field">
							<label className="container_lable">Email </label>
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
							<label className="container_lable">Password </label>
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

						<div>
							<p className="forgotpass text-left">
								<Link to={'/forgotpass'}>Forgot Password?</Link>
							</p>

							<p className="forgotpass text-right">
								<Link to={'/register'}>New User? Register here</Link>
							</p>
						</div>

						<div className="btn">
							<button className="btn-login">Login</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Login;
