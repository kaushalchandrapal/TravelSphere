

import React, { useEffect, useState } from "react";
import { Button, InputField } from "..";
import "../PopUp/PopUp.styles.css";
import TextArea from "../TextArea/TextArea";
import { axios } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { tripAdded } from "../../redux/addTrip.reducers";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";

const PopUp = (props) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    tripName: Yup.string().required(),
    tripDescription: Yup.string().required(),
    tripDate: Yup.string().required(),
    initialBudget: Yup.number("Expense doesn't contains alaphabets").required(
      "Estimated Expanses Details is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      tripName: "",
      tripDescription: "",
      tripDate: "",
      initialBudget: "",
      totalExpense: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        axios
          .post("/trip/add", {
            // TODO: Remove user ID
            userId: "64147ef19c2f3ba112246a4f",
            tripName: values.tripName,
            tripDescription: values.tripDescription,
            tripDate: values.tripDate,
            initialBudget: values.initialBudget,
            totalExpense: 0,
          })
          .then((response) => {
            props.setTrigger(false);
            formik.resetForm();
            dispatch(tripAdded(response.data.trip._id));
            toast.success("Trip added successfully!!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } catch (err) {
        toast.error("Something went wrong!! Try again!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  console.log("formik.values :>> ", formik.values);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-title">
          <div className="card-trip-title__popup">
            <span>New Trip</span>
          </div>
          <div
            className="popup-button-close"
            onClick={() => {
              formik.resetForm();
              props.setTrigger(false);
            }}
          >
            <IoCloseCircleOutline />
          </div>
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="popup-input-list">
            <InputField
              label="Trip Name"
              id="Trip Name"
              type="text"
              name="tripName"
              handleChange={formik.handleChange}
              value={formik.values.tripName}
              error={Boolean(formik.touched.tripName) && formik.errors.tripName}
            />
            <TextArea
              label="Trip Description"
              id="Trip Description"
              type="text"
              name="tripDescription"
              value={formik.values.tripDescription}
              handleChange={formik.handleChange}
              row={5}
              error={
                Boolean(formik.touched.tripDescription) &&
                formik.errors.tripDescription
              }
            />
            <div className="budget-and-date">
              <InputField
                label="Initial Budget"
                id="Intial Budget"
                type="text"
                name="initialBudget"
                handleChange={formik.handleChange}
                value={formik.values.initialBudget}
                error={
                  Boolean(formik.touched.initialBudget) &&
                  formik.errors.initialBudget
                }
              />
              <InputField
                label="Date"
                id="Date"
                type="date"
                name="tripDate"
                min={new Date()}
                handleChange={formik.handleChange}
                value={formik.values.tripDate}
                error={
                  Boolean(formik.touched.tripDate) && formik.errors.tripDate
                }
              />
            </div>
          </div>
          <div className="popup-save-button">
            <Button type="submit" variant="blue" name="Save" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
