
import React, { useState } from 'react';
import { Button, InputField } from '..';
import "../PopUp/PopUp.styles.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Path from "../../constants/Path"

const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    confirmNewPassword: Yup.string()
      .required('Confirm New Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });
  
  const onClose = () => {
    navigate(Path.PROFILE_PAGE)
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // Make API call to change password endpoint with values.currentPassword, values.newPassword and values.confirmNewPassword
      // Reset form and display success message if successful, display error message if not
      setIsSubmitting(false);
      onClose();
    },
  });

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-title">
          <div className="card-trip-title__popup">
            <span>Change Password</span>
            <button  className="close-button" onClick={onClose}>X</button> 
          </div>
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="popup-input-list">
            <InputField
              label="Current Password"
              id="currentPassword"
              type="password"
              name="currentPassword"
              handleChange={formik.handleChange}
              value={formik.values.currentPassword}
              error={
                Boolean(formik.touched.currentPassword) &&
                formik.errors.currentPassword
              }
            />
            <InputField
              label="New Password"
              id="newPassword"
              type="password"
              name="newPassword"
              handleChange={formik.handleChange}
              value={formik.values.newPassword}
              error={
                Boolean(formik.touched.newPassword) && formik.errors.newPassword
              }
            />
            <InputField
              label="Confirm New Password"
              id="confirmNewPassword"
              type="password"
              name="confirmNewPassword"
              handleChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
              error={
                Boolean(formik.touched.confirmNewPassword) &&
                formik.errors.confirmNewPassword
              }
            />
          </div>
          <div className="popup-save-button">
            <Button
              type="submit"
              variant="blue"
              name={isSubmitting ? 'Submitting...' : 'Save'}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;