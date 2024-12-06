

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, InputField } from "..";
import "./EditExpensePopUp.styles.css";
import { axios } from "../../utils/axios";
import { expenseAdded } from "../../redux/expenseAdded.reducer";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

const EditExpensePopUp = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    transactionName: "",
    transactionAmount: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTransactionSave = () => {
    axios
      .patch(`/expense/update/${props.transactionId}`, {
        transactionName: formValues.transactionName,
        transactionAmount: formValues.transactionAmount,
      })
      .then((response) => {
        if (response.data.success) {
          props.setTrigger(false);
          dispatch(expenseAdded(response.data.updatedExpense._id));
          toast.success("Expense Edited successfully!!", {
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
  };
  useEffect(() => {
    try {
      axios.get(`/expense/get/${props.transactionId}`).then((response) => {
        if (response.data.success) {
          setFormValues({
            transactionName: response.data.expense.transactionName,
            transactionAmount: response.data.expense.transactionAmount,
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
  }, [props.transactionId]);

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
        <div className="popup-input-list">
          <InputField
            label="Expense Name"
            id="Expense Name"
            type="text"
            name="transactionName"
            value={formValues.transactionName}
            handleChange={handleChange}
          />
          <InputField
            label="Expense Amount"
            id="Expense Amount"
            type="text"
            name="transactionAmount"
            value={formValues.transactionAmount}
            handleChange={handleChange}
          />
        </div>
        <div className="popup-save-button">
          <Button variant="blue" name="Save" onClick={handleTransactionSave} />
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditExpensePopUp;
