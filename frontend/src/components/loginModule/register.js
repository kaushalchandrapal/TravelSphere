import { useState, useEffect } from 'react';
import './register.css'; // Custom CSS
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Path from '../../constants/Path';

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
        if (Object.keys(formErrors).length === 0 && isSubmit === true) {
            nav(Path.PROFILE_PAGE);
        }

        Axios.post('http://localhost:2020/register', {
            firstname: formValues.fname,
            lastname: formValues.lname,
            emailid: formValues.email,
            pass: formValues.password
        });
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
        <div className="registration-container">
            <div className="registration-wrapper">
                <div className="registration-logo">
                    <span className="first-logo">TRAVEL</span>
                    <span className="second-logo">SPHERE</span>
                </div>

                <div className="registration-card">
                    <div className="registration-row">
                        <div className="registration-image">
                            <img
                                src="/Images/register.jpg"
                                alt="Travel"
                                className="registration-img"
                            />
                        </div>

                        <div className="registration-form-section">
                            <div className="registration-form-content">
                                <h4 className="registration-title">Create your account</h4>
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-group">
                                        <label htmlFor="fname">First Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            id="fname"
                                            name="fname"
                                            placeholder="First Name"
                                            value={formValues.fname}
                                            onChange={handleChange}
                                        />
                                        <p className="error-message">{formErrors.fname}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lname">Last Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            id="lname"
                                            name="lname"
                                            placeholder="Last Name"
                                            value={formValues.lname}
                                            onChange={handleChange}
                                        />
                                        <p className="error-message">{formErrors.lname}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="input-field"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                        <p className="error-message">{formErrors.email}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                        />
                                        <p className="error-message">{formErrors.password}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cnfpassword">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            id="cnfpassword"
                                            name="cnfpassword"
                                            placeholder="Re-enter Password"
                                            value={formValues.cnfpassword}
                                            onChange={handleChange}
                                        />
                                        <p className="error-message">{formErrors.cnfpassword}</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        Sign Up
                                    </button>

                                    <div className="form-links">
                                        <Link to="/" className="link-text">Already a user? Login here</Link>
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
