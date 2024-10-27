import React from 'react';
import { useState, useEffect } from 'react';
import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import Path from '../../constants/Path';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="bg-light py-2">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="logo d-flex align-items-center">
                        <span className="first-half-logo text-dark">TRAVEL</span>
                        <span className="second-half-logo text-dark">SPHERE</span>
                    </div>
                </div>

                <div className="card shadow-lg w-100 mx-auto" style={{ maxWidth: '750px' }}>
                    <div className="row g-0">
                        <div className="col-md-6 d-none d-md-block">
                            <img
                                src="/Images/login.png"
                                alt="Travel"
                                className="img-fluid h-100"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="card-body p-4">
                                <h4 className="card-title mb-3">Login to Your Account</h4>
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
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


                                    <button
                                        type="submit"
                                        className="btn w-100 btn-sm"
                                        style={{ backgroundColor: '#2F2A99', color: 'white' }}
                                    >
                                        Login
                                    </button>


                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={'/forgotpass'} className="small text-primary">Forgot Password?</Link>
                                        <Link to={'/register'} className="small text-primary">New User? Register here</Link>
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

export default Login;
