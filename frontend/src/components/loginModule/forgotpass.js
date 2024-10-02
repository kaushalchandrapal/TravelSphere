import React from 'react';
import { useState, useEffect } from 'react';
import './Style.css';

function Forgotpass() {
	const initialValues = { email: '' };

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
		alert('A password reset link has been sent to your email');
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit === true) {
		}
	}, [formErrors, isSubmit]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = 'Email is required!';
		} else if (!regex.test(values.email)) {
			errors.email = 'This is not a valid email format!';
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
					<h2>Forgot Password</h2>

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

						<div className="btn">
							<button className="btn-login">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Forgotpass;
