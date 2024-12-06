

import React, { useState } from "react";
import "./TextArea.styles.scss";

const TextArea = ({ label, id, handleChange, error, ...otherProps }) => {
  const [isFilled, setIsFilled] = useState(false);

  return (
    <div className="field__wrapper">
      <div className="field__group">
        <textarea
          className={`field__input ${error ? "field__input--error" : ""}`}
          id={id}
          {...otherProps}
          onChange={(e) => {
            handleChange(e);
            otherProps.value?.length !== 0
              ? setIsFilled(true)
              : setIsFilled(false);
          }}
          onBlur={(e) => {
            otherProps.value?.length !== 0
              ? setIsFilled(true)
              : setIsFilled(false);
          }}
        />
        <label
          className={`field__label ${isFilled ? "field__label--filled" : ""}`}
          id={id}
        >
          {label} <span className="required-icon">*</span>
        </label>
      </div>
      {error ? <div className="field__error">{error}</div> : null}
    </div>
  );
};

export default TextArea;
