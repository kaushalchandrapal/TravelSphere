

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/ButtonComp";
import InputField from "../InputField/InputField";
import "../AddExpensePopUp/AddExpensePopUp.styles.css";
import { addTransaction } from "../../redux/Transaction.reducer";
import { axios } from "../../utils/axios";
import { expenseAdded } from "../../redux/expenseAdded.reducer";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

const AddExpensePopUp = (props) => {
  const selectedTripId = useSelector((store) => store.sample);
  const [wantToPay, setWantToPay] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState("");
  const initialValues = {
    tripId: selectedTripId.tripIdSelected,
    transactionName: "",
    transactionAmount: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // handleError();
  };

  const handlePayExpense = () => {
    // if (handleError()) return;
    axios
      .post("/expense/add", {
        tripId: selectedTripId.tripIdSelected,
        transactionName: formValues.transactionName,
        transactionAmount: formValues.transactionAmount,
      })
      .then((response) => {
        if (response.data.success) {
          props.setTrigger(false);
          dispatch(expenseAdded(response.data.expense._id));
          setWantToPay(true);
          setCurrentExpenseId(response.data.expense._id);
          setFormValues(initialValues);
          toast.success("Expense added successfully!!", {
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
    dispatch(addTransaction(formValues));
    setFormValues(initialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (e.nativeEvent.submitter.name) {
      case "Save":
        handleTransactionSave();
        break;
      case "Pay":
        handlePayExpense();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    try {
      if (wantToPay) {
        axios
          .post("/expense/pay", {
            expenseId: currentExpenseId,
          })
          .then((response) => {
            console.log(response.data.sessionUrl);
            window.location = response.data.sessionUrl;
            setFormValues(initialValues);
            setWantToPay(false);
            toast.success("Expense added successfully!!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => {
            setWantToPay(false);
          });
      }
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
  }, [wantToPay]);

  const dispatch = useDispatch();

  // const handleError = () => {
  //   const requiredMsg = "This field is mandatory";
  //   const { transactionName, transactionAmount } = formValues;
  //   let isError = true;
  //   if (!transactionName) {
  //     setFormErrors({ ...formErrors, transactionName: requiredMsg });
  //   } else if (!transactionAmount) {
  //     setFormErrors({ ...formErrors, transactionAmount: requiredMsg });
  //   } else if (transactionAmount && isNaN(Number(transactionAmount))) {
  //     setFormErrors({ ...formErrors, transactionAmount: "Invalid number" });
  //   } else {
  //     setFormErrors();
  //     isError = false;
  //   }
  //   return isError;
  // };

  const handleTransactionSave = () => {
    // if (handleError()) return;
    axios
      .post("/expense/add", {
        tripId: selectedTripId.tripIdSelected,
        transactionName: formValues.transactionName,
        transactionAmount: formValues.transactionAmount,
      })
      .then((response) => {
        if (response.data.success) {
          props.setTrigger(false);
          dispatch(expenseAdded(response.data.expense._id));
          setFormValues(initialValues);
          toast.success("Expense added successfully!!", {
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
    // }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="add-expense-popup-inner">
        <div className="popup-title">
          <div className="card-trip-title__popup">
            <span>Add Expense</span>
          </div>
          <div
            className="popup-button-close"
            onClick={() => props.setTrigger(false)}
          >
            <IoCloseCircleOutline />
          </div>
        </div>
        <hr />
        <form className="popup-input-list" onSubmit={handleSubmit}>
          <InputField
            label="Expense Name"
            id="Expense Name"
            type="text"
            name="transactionName"
            required
            handleChange={handleChange}
            // error={formErrors?.transactionName}
          />
          <InputField
            label="Expense Amount"
            id="Expense Amount"
            type="text"
            name="transactionAmount"
            required
            pattern="^[0-9]*$"
            handleChange={handleChange}
            // error={formErrors?.transactionAmount}
          />
          <div className="popup-save-and-pay-button">
            <Button type="submit" variant="blue" name="Save" />
            <Button type="submit" variant="blue" name="Pay" />
          </div>
        </form>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddExpensePopUp;
