import React from 'react';
import { useState, useEffect } from 'react';
import './forgotpass.css'; // Import the updated custom CSS file
import { Link } from 'react-router-dom';

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
            // Additional logic can be added here if needed
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
        <div className="forgotpass-container">
            <div className="forgotpass-wrapper">
                <div className="forgotpass-logo">
                    <span className="first-logo">TRAVEL</span>
                    <span className="second-logo">SPHERE</span>
                </div>

                <div className="forgotpass-card">
                    <div className="forgotpass-row">
                        <div className="forgotpass-image">
                            <img
                                src="/Images/forgot.png" 
                                alt="Forgot Password"
                                className="forgotpass-img"
                            />
                        </div>
                        <div className="forgotpass-form-section">
                            <div className="forgotpass-form-content">
                                <h4 className="forgotpass-title">Forgot Password</h4>
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                        <p className="error-message">{formErrors.email}</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        Submit
                                    </button>

                                    <div className="text-center mt-3">
                                        <Link to="/" className="link-text">Back to Login</Link>
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