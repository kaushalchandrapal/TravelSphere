import { useState, useEffect } from 'react';
import './Style.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            errors.cnfpassword = 'Confirm password is required';
        } else if (values.cnfpassword !== values.password) {
			errors.cnfpassword = "Password doesn't match";
        }

        return errors;
    };

    return (
        <div className="bg-light py-2">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                        <span className="first-half-logo text-dark">TRAVEL</span>
                        <span className="second-half-logo text-dark">SPHERE</span>
                    </div>
                </div>

                <div className="card shadow-lg w-100 mx-auto" style={{ maxWidth: '750px' }}>
                    <div className="row g-0">
                        <div className="col-md-6 d-none d-md-block">
                            <img
                                src="/Images/register.jpg"
                                alt="Travel"
                                className="img-fluid h-100"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="card-body p-4">
                                <h4 className="card-title mb-3">Create your account</h4>
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-group mb-3">
                                        <label htmlFor="fname">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="fname"
                                            name="fname"
                                            placeholder="First Name"
                                            value={formValues.fname}
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger small">{formErrors.fname}</p>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="lname">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="lname"
                                            name="lname"
                                            placeholder="Last Name"
                                            value={formValues.lname}
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger small">{formErrors.lname}</p>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger small">{formErrors.email}</p>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger small">{formErrors.password}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cnfpassword">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="cnfpassword"
                                            name="cnfpassword"
                                            placeholder="Re-enter Password"
                                            value={formValues.cnfpassword}
                                            onChange={handleChange}
                                        />
                                        <p className="text-danger small">{formErrors.cnfpassword}</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn w-100 btn-sm mb-3"
                                        style={{ backgroundColor: '#2F2A99', color: 'white' }}
                                    >
                                        Sign Up
                                    </button>

                                    <div className="text-center">
                                        <Link to="/" className="text-primary small">Already a user? Login here</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
