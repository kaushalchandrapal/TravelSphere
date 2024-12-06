

import React from "react";
import "./recentExpense.css";

const RecentExpense = (props) => {
  return (
    <div className="recent_expense_div">
      <div className="recent_expense_div-data">
        <div className="trip_name_and_time">
          <div className="trip_name_and_time-trip_name">
            <span className="trip_name_span">{props.tripName}</span>
          </div>
          <div className="trip_name_and_time-time">
            <span className="trip_time_span">{props.tripTime}</span>
          </div>
        </div>
        <div className="recent_expense_div-trip_expense">
          <span className="trip_expense_span">{props.tripExpense}</span>
        </div>
      </div>
      <div className="border_div"></div>
    </div>
  );
};

export default RecentExpense;
