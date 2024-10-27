import React from 'react';
import { useState, useEffect } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="bg-light py-2">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="logo d-flex align-items-center">
                        <span className="first-half-logo text-dark">TRAVEL</span>
                        <span className="second-half-logo text-dark">SPHERE</span>
                    </div>
                </div>

                <div className="card shadow-lg w-100 mx-auto" style={{ maxWidth: '650px' }}>
                    <div className="row g-0">
                        <div className="col-md-5 d-none d-md-block">
                            <img
                                src="/Images/forgot.png" 
                                alt="Forgot Password"
                                className="img-fluid h-100"
                                style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body p-4">
                                <h4 className="card-title mb-3">Forgot Password</h4>
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

                                    <button
                                        type="submit"
                                        className="btn w-100 btn-sm"
                                        style={{ backgroundColor: '#2F2A99', color: 'white' }}
                                    >
                                        Submit
                                    </button>

                                    <div className="text-center mt-3">
                                        <Link to="/" className="small text-primary">Back to Login</Link>
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

export default Forgotpass;
