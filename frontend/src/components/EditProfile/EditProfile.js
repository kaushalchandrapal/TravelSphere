
import React, { useEffect, useState } from "react";
import { Button, InputField } from "..";
import "../EditProfile/EditProfile.styles.css";
import { useForm } from "react-hook-form";

const EditProfilePopup = (props) => {
  const {formValues,setFormValues , handleSubmit} = props;
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors }
  // } = useForm();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const formData = () => {
    props.setTrigger(false);
  };
  return props.trigger ? (
    // <form onSubmit={handleSubmit}>
      <div className="profile">
        <div className="profile-inner">
          <div className="profile-button-close">
            <div className="">
              <span className="edit-profile-title">Edit Profile</span>
            </div>

            <Button
              className="close-btn"
              variant="transparent"
              name="Close"
              onClick={() => props.setTrigger(false)}
            />
          </div>
          <div className="avatar-container">
            <label htmlFor="avatar-input">
              <img src={formValues?.profilePic} alt="avatar" />
            </label>
            {/* <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFormValues({...formValues , profilePic: URL.createObjectURL(event.target.files[0])})
              }
            /> */}
          </div>
          <div className="profile-input-list">
            <InputField
              label="Name"
              id="userName"
              type="text"
              name="userName"
              value={formValues.userName}
              handleChange={handleChange}
              // {...register("name", { required: true })}
            />
            {/* {errors.name && <span className="error">This field is required</span>} */}

            
			{/* {errors.location && <span className="error">This field is required</span>} */}
            <InputField
              label="Social Media"
              id="socialMediaHandle"
              type="text"
              name="socialMediaHandle"
              value={formValues.socialMediaHandle}
              handleChange={handleChange}
			  // {...register("socialMedia", { required: true })}
            />
			{/* {errors.socialMedia && <span className="error">This field is required</span>} */}
            <InputField
              label="User Bio"
              id="userBio"
              type="text"
              name="userBio"
              value={formValues.userBio}
              handleChange={handleChange}
			  // {...register("bio", { required: true })}
            />
			{/* {errors.bio && <span className="error">This field is required</span>} */}
          </div>
          <div className="profile-save-button">
            <Button
              variant="blue"
              name="Save"
              // type="submit"
                onClick={(e) => {
                  // eslint-disable-next-line no-undef
                  handleSubmit(e)
                  formData()}}
            />
          </div>
          {props.children}
        </div>
      </div>
    // </form>
  ) : (
    ""
  );
};

export default EditProfilePopup;