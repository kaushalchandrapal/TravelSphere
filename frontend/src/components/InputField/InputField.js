

import React, { useState } from 'react';
import './InputField.styles.scss';

const InputField = ({
	label,
	id,
	handleChange,
	error,
	info,
	// handleDisabledButton,
	...otherProps
}) => {
	const [isFilled, setIsFilled] = useState(false);

	return (
		<div className="field__wrapper">
			<div className="field__group">
				<input
					className={`field__input ${error ? 'field__input--error' : ''}`}
					id={id}
					{...otherProps}
					onChange={(e) => {
						handleChange(e);
						otherProps.value?.length !== 0
							? setIsFilled(true)
							: setIsFilled(false);
					}}
					onBlur={(e) => {
						// handleDisabledButton();
						otherProps.value?.length !== 0
							? setIsFilled(true)
							: setIsFilled(false);
					}}
				/>
				<label
					className={`field__label ${isFilled ? 'field__label--filled' : ''}`}
					id={id}
				>
					{label} <span className="required-icon">*</span>
				</label>
			</div>
			{error ? <div className="field__error">{error}</div> : null}
			{info ? <div className="field__info">{info}</div> : null}
		</div>
	);
};

export default InputField;
