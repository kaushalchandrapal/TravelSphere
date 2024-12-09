import { useState, useEffect } from "react";
import "./register.css"; // Custom CSS
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import Path from "../../constants/Path";
import InputField from "../InputField/InputField";

function RegistrationForm() {
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cnfpassword: "",
    userName: "",
    profilePic: "",
    socialMediaHandle: "",
    userBio: "",
  };
  const [image, setImage] = useState(null);
  const [isImageValidated, setIsImageValidaed] = useState(false);

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const nav = useNavigate();
  
  const validateImage = (value) => {
    value === " "
      ? setFormErrors((prevState) => ({
          ...prevState,
          imageError: "please select an Image!!",
        }))
      : setFormErrors((prevState) => ({
          ...prevState,
          imageError: "",
        }));
    setIsImageValidaed(true);
    return value;
  };

  const onImageChange = (e) => {
    console.log("on image change")
    const imageUrl = validateImage(URL.createObjectURL(e.target.files[0]));
    setImage(imageUrl);
    setFormValues((prevState) => ({
      ...prevState,
      profilePic: validateImage(e.target.files[0]),
    }));
    console.log("FOrmm image ------ " , formValues)
  };

  

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
    const registerUser = async () => {
      try {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            
          await Axios.post("/register", {
            firstname: formValues.fname,
            lastname: formValues.lname,
            emailid: formValues.email,
            pass: formValues.password,
            userName: formValues.userName,
            profilePic: formValues.profilePic,
            socialMediaHandle: formValues.socialMediaHandle,
            userBio: formValues.userBio,
          }, {headers: {
            'Content-Type': 'multipart/form-data',
        }},);

          toast.success("Registration successful!");
          nav(Path.LOGIN);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    };

    registerUser();
  }, [formErrors, isSubmit, nav]);


  const validate = (values) => {
    const errors = {};
    const txtreg = /^[a-zA-Z]*$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fname) {
      errors.fname = "First name is required!";
    } else if (!txtreg.test(values.fname)) {
      errors.fname = "Please enter text only";
    }

    if (!values.lname) {
      errors.lname = "Last name is required!";
    } else if (!txtreg.test(values.lname)) {
      errors.lname = "Please enter text only";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.cnfpassword) {
      errors.cnfpassword = "Confirm password is required";
    } else if (values.cnfpassword !== values.password) {
      errors.cnfpassword = "Password doesn't match";
    }

    if (!values.userName) {
      errors.userName = "Username is required!";
    }

    if (!values.profilePic) {
      errors.profilePic = "Profile Picture URL is required!";
    }

    if (!values.socialMediaHandle) {
      errors.socialMediaHandle = "Social Media Handle is required!";
    }

    if (!values.userBio) {
      errors.userBio = "User bio is required!";
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
                  {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
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
                      </div>

                      <div className="col-md-6 col-sm-12">
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
                      </div>

                      <div className="col-md-6 col-sm-12">
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
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="userName">Username</label>
                          <input
                            type="text"
                            className="input-field"
                            id="userName"
                            name="userName"
                            placeholder="Username"
                            value={formValues.userName}
                            onChange={handleChange}
                          />
                          <p className="error-message">{formErrors.userName}</p>
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-12">
                        
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
                      </div>
                      
                      <div className="col-md-6 col-sm-12">
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

                      </div>
                    </div>
                  {/* </div> */}
                  

                  



                  

                  <div className="form-group">
                    <label htmlFor="profilePic">Profile Picture</label>
                    {/* <input
                      type="text"
                      className="input-field"
                      id="profilePic"
                      name="profilePic"
                      placeholder="Profile Picture URL"
                      value={formValues.profilePic}
                      onChange={handleChange}
                    /> */}

                    <div className="row">
                      <div className="col-10">

                        <InputField
                          type="file"
                          name="profilePic"
                          id="photo"
                          accept="image/png,image/jpg, image/gif, image/jpeg"
                          error={formErrors.imageError}
                          handleChange={onImageChange}
                          label="Select a photo"
                        />
                      </div>

                      <div className="col-2">

                        {image ? (
                          <img
                            className="post-image-registration mt-3 ml-4"
                            src={image}
                            id="target"
                            alt="preview"
                            name="profilePic"
                          />
                        ) : null}
                      </div>


                    </div>


                    <p className="error-message">{formErrors.profilePic}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="socialMediaHandle">
                      Social Media Handle
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      id="socialMediaHandle"
                      name="socialMediaHandle"
                      placeholder="Social Media Handle"
                      value={formValues.socialMediaHandle}
                      onChange={handleChange}
                    />
                    <p className="error-message">
                      {formErrors.socialMediaHandle}
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="userBio">User Bio</label>
                    <textarea
                      className="input-field"
                      id="userBio"
                      name="userBio"
                      placeholder="Tell us about yourself"
                      value={formValues.userBio}
                      onChange={handleChange}
                    />
                    <p className="error-message">{formErrors.userBio}</p>
                  </div>

                  <button type="submit" className="submit-btn">
                    Sign Up
                  </button>

                  <div className="form-links">
                    <Link to="/login" className="link-text">
                      Already a user? Login here
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

export default RegistrationForm;
