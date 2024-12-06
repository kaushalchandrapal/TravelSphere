

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../utils/axios";
import { toast } from "react-toastify";

const CancelPay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.delete(`/expense/delete/${id}`).then((response) => {
      if (response.data.success) {
        navigate("/manageExpense");
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
  });
  return (
    <div>
      <h1>Canceling Transaction</h1>
    </div>
  );
};

export default CancelPay;
