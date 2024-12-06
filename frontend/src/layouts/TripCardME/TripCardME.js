

import React, { useState } from "react";
import "../TripCardME/TripCardME.styles.css";
const TripCard = ({ props }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="card-trip-me container_trip">
        <div className="card-trip__details">
          <div>
            <span className="card-trip__title">{props.title}</span>
          </div>
          <div>
            <span className="card-trip__date">{props.date}</span>
          </div>
        </div>
        <br />
        <div>
          <span className="card-trip__description">
            {showAll
              ? props.tripDescription
              : `${props.tripDescription.slice(0, 130)}......`}
            <button
              className="show_more_btn_in_description"
              onClick={toggleShowAll}
            >
              {showAll ? "show less" : "show more"}
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default TripCard;
