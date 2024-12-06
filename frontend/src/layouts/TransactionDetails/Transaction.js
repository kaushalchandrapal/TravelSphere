

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IconComponent from "../../components/Icon/Icon";
import { axios } from "../../utils/axios";
import "../TransactionDetails/Transaction.styles.css";
import { expenseAdded } from "../../redux/expenseAdded.reducer";
import EditExpensePopUp from "../../components/EditExpensePopUp/EditExpensePopUp";
import { toast } from "react-toastify";

const Transaction = ({ props }) => {
  const [popupVisibleForEditExpense, setPopupVisibleForEditExpense] =
    useState(false);
  const [transactionId, setTransactionId] = useState(props.transactionId);
  const dispatch = useDispatch();
  const handleDelete = () => {
    let message = "Confirm Delete?";
    if (window.confirm(message) === true) {
      axios.delete(`/expense/delete/${transactionId}`).then((response) => {
        if (response.data.success) {
          dispatch(expenseAdded(transactionId));
          toast.success("Expense Deleted successfully!!", {
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
    }
  };

  const handleEdit = () => {
    setPopupVisibleForEditExpense(true);
    setTransactionId(props.transactionId);
  };
  return (
    <div className="transaction-details transaction-details__row container_transaction">
      <div className="transaction-details__col">
        <span className="transaction-details-col__name">
          {props.transactionName}
        </span>
        <span className="transaction-details-col__id">#{transactionId}</span>
      </div>
      <div className="transaction-details__value">
        <span>{props.transactionAmount}</span>
      </div>
      <div className="transaction-details__icon">
        <div className="transaction-details-icon__edit">
          <IconComponent name="edit" onClick={handleEdit} />
        </div>
        <EditExpensePopUp
          transactionId={transactionId}
          trigger={popupVisibleForEditExpense}
          setTrigger={setPopupVisibleForEditExpense}
        ></EditExpensePopUp>
        <div className="transaction-details-icon__delete">
          <IconComponent name="delete" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
