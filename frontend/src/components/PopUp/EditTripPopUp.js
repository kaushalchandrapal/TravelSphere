

import React, { useEffect, useState } from "react";
import { Button, InputField } from "..";
import "./EditTripPopUp.styles.css";
import TextArea from "../TextArea/TextArea";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { tripEdited } from "../../redux/editTrip.reducers";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditTripPopUp = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    tripName: "",
    tripDescription: "",
    tripDate: "",
    initialBudget: "",
    // totalExpense: 0,
  };

  const [formValues, setFormValues] = useState(initialValues);
  console.log("formValues :>> ", props);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [errorCheck, setErrorCheck] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (errorCheck) {
      setFormErrors(validate(formValues));
    }
  }, [errorCheck, formValues]);

  useEffect(() => {
    try {
      axios.get(`/trip/get/${props?.selectedTripCard?._id}`).then((response) => {
        setFormValues(response.data.trip);
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
  }, []);

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
      tripName: props?.selectedTripCard?.tripName,
      tripDescription: props?.selectedTripCard?.tripDescription,
      tripDate: props?.selectedTripCard?.tripDate,
      initialBudget: props?.selectedTripCard?.initialBudget,
      totalExpense: props?.selectedTripCard?.totalExpense,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        axios
          .patch(`/trip/update/${props.selectedTripCard._id}`, {
            // TODO: Remove user ID
            userId: "64147ef19c2f3ba112246a4f",
            tripName: values.tripName,
            tripDescription: values.tripDescription,
            tripDate: values.tripDate,
            initialBudget: values.initialBudget,
          })
          .then((response) => {
            props.setTrigger(false);
            formik.resetForm();
            dispatch(tripEdited(response.data.updateTrip._id));
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

  const handleSave = () => {
    setFormErrors(validate(formValues));
    setErrorCheck(true);
    if (Object.keys(formErrors).length === 0) {
      props.setTrigger(false);
      try {
        axios
          .patch(`/trip/update/${props.selectedTripCard}`, {
            // TODO: Remove user ID
            userId: "64147ef19c2f3ba112246a4f",
            tripName: formValues.tripName,
            tripDescription: formValues.tripDescription,
            tripDate: formValues.tripDate,
            initialBudget: formValues.initialBudget,
          })
          .then((response) => {
            if (response.data.success) {
              setFormValues(initialValues);
              dispatch(tripEdited(response.data.updateTrip._id));
              setFormErrors(initialValues);
              setErrorCheck(false);
              toast.success("Trip Edited successfully!!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
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
    }
  };

  const validate = (values) => {
    const errors = {};
    const numRegex = /^[0-9]*$/i;
    const dateRegex =
      /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(202[0-9]))$/i;

    if (!values.tripDate) {
      errors.tripDate = "Trip Date is required!";
    } else if (!dateRegex.test(values.tripDate)) {
      errors.tripDate = "Please enter a valid date in a DD/MM/YYYY ";
    }
    if (!values.tripDescription) {
      errors.tripDescription = "Description of Trip is required!";
    }
    if (!values.tripName) {
      errors.tripName = "Name of Trip is required!";
    }
    if (!values.initialBudget) {
      errors.initialBudget = "Estimated Expanses Details is required!";
    } else if (!numRegex.test(values.initialBudget)) {
      errors.initialBudget = "Expense doesn't contains alaphabets";
    }
    return errors;
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-title">
          <div className="card-trip-title__popup">
            <span>Update Trip</span>
          </div>
          <div
            className="popup-button-close"
            onClick={() => props.setTrigger(false)}
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
            <Button variant="blue" name="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditTripPopUp;
