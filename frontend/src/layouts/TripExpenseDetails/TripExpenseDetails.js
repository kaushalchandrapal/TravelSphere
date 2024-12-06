

import React from "react";
import "../TripExpenseDetails/TripExpenseDetails.styles.css";

const TripExpenseDetails = ({ props }) => {
  return (
    <>
      <div className="trip-expense-details container_trip">
        <div>
          <span className="trip-expense-details__description">
            {props.detailedDescription}
          </span>
        </div>
        <div className="trip-expense-details__numbers">
          <div>
            <span className="trip-expense-details__initialBudget">
              Initial Budget : {props.initialBudget}
            </span>
          </div>
          <div>
            <span className="trip-expense-details__initialBudget">
              Total Expense : {props.totalExpense}
            </span>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default TripExpenseDetails;
