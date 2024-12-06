

import React from "react";
import "../Button/ButtonComp.styles.css";

const ButtonComp = ({ onClick, variant, name, ...otherProps }) => {
  return (
    <div onClick={onClick}>
      <button
        name={name}
        className="dynamic-button"
        {...otherProps}
        variant={variant}
      >
        {name}
      </button>
    </div>
  );
};

export default ButtonComp;
