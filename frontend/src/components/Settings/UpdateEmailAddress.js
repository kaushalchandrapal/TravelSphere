
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axios } from "../../utils/axios";
import { Button, InputField } from "../index";
import Path from "../../constants/Path"
import { useNavigate } from "react-router-dom";

const ChangeEmailPage = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    currentEmail: Yup.string().required("Current email is required"),
    newEmail: Yup.string()
      .email("Invalid email address")
      .required("New email is required"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("newEmail")], "Email addresses must match")
      .required("Confirm email is required"),
  });

  const onClose = () => {
    navigate(Path.PROFILE_PAGE)
  }

  const formik = useFormik({
    initialValues: {
      currentEmail: "",
      newEmail: "",
      confirmEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        axios.post("/user/change-email", {
          currentEmail: values.currentEmail,
          newEmail: values.newEmail,
        });
        setSubmitting(false);
        formik.resetForm();
        alert("Email changed successfully");
      } catch (err) {
        alert("Something went wrong, please try again");
      }
    },
  });

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-title">
          <div className="card-trip-title__popup">
            <span>Change Email Address</span>
            <button  className="close-button" onClick={onClose}>X</button> 
          </div>
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="popup-input-list">
            <InputField
              label="Current Email Address"
              id="currentEmail"
              type="email"
              name="currentEmail"
              handleChange={formik.handleChange}
              value={formik.values.currentEmail}
              error={
                formik.touched.currentEmail && formik.errors.currentEmail
              }
            />
            <InputField
              label="New Email Address"
              id="newEmail"
              type="email"
              name="newEmail"
              handleChange={formik.handleChange}
              value={formik.values.newEmail}
              error={formik.touched.newEmail && formik.errors.newEmail}
            />
            <InputField
              label="Confirm New Email Address"
              id="confirmEmail"
              type="email"
              name="confirmEmail"
              handleChange={formik.handleChange}
              value={formik.values.confirmEmail}
              error={
                formik.touched.confirmEmail && formik.errors.confirmEmail
              }
            />
          </div>
          <div className="popup-save-button">
            <Button
              type="submit"
              variant="blue"
              name="Change Email Address"
              disabled={formik.isSubmitting || !formik.isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmailPage;