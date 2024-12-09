import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Path from "../../constants/Path";
import Axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const initialValues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleSubmit = (e) => {
  // e.preventDefault();
  // setFormErrors(validate(formValues));
  // setIsSubmit(true);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate the form values
    const errors = validate(formValues);
    setFormErrors(errors);
  
    // Proceed only if there are no errors
    if (Object.keys(errors).length > 0) {
      return;
    }
  
    setIsSubmit(true);
  
    try {
      const response = await Axios.post("/login", {
        emailid: formValues.email,
        pass: formValues.password,
      });

      console.log(response.data)
  
      
      setFormErrors({ general: response.data.message || "Login failed!" });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login Successful!");

        if (response.data.user.role.toLowerCase() === 'admin') {
          nav(Path.ADMIN_LAYOUT);
        } else {
          nav(Path.HOME);
        }
    } catch (error) {
      console.error("Error during login:", error);
  
      // Handle error during login
      const errorMessage = error.response?.data || "An error occurred during login. Please try again.";
      setFormErrors({ general: errorMessage });
      toast.error(errorMessage);
    }
  };
  

  // useEffect(() => {
  //     if (Object.keys(formErrors).length === 0 && isSubmit === true) {
  //         nav(Path.PROFILE_PAGE);
  //     }

  // Axios.post('/login', {
  //     emailid: formValues.email,
  //     pass: formValues.password
  // });

  // }, [formErrors, isSubmit, nav]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }

    return errors;
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-logo">
          <span className="first-logo">TRAVEL</span>
          <span className="second-logo">SPHERE</span>
        </div>

        <div className="login-card">
          <div className="login-row">
            <div className="login-image">
              <img src="/Images/login.png" alt="Travel" className="login-img" />
            </div>

            <div className="login-form-section">
              <div className="login-form-content">
                <h4 className="login-title">Login to Your Account</h4>
                <form onSubmit={handleLogin} noValidate>
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

                  <button type="submit" className="submit-btn">
                    Login
                  </button>

                  <div className="form-links">
                    <Link to={"/forgotpass"} className="link-text">
                      Forgot Password?
                    </Link>
                    <Link to={"/register"} className="link-text">
                      New User? Register here
                    </Link>
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
