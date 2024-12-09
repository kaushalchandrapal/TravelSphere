

import React, { useState, useEffect } from 'react';
import { Button, InputField } from '..';
import '../PopUp/EditPlanPopup.styles.css';
import TextArea from '../TextArea/TextArea';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { changeUpdateStatus } from '../../redux/planupdate.reducer';
import { toast } from "react-toastify";

const EditPlanPopup = (props) => {
	const dispatch = useDispatch();

	const initialValues = {
		startDate: '',
		endDate: '',
		destination: '',
		estimatedExpenses: '',
		travelDescription: '',
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState(initialValues);
	const [planDetails, setPlanDetails] = useState({});
	
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name,value);
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSave = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		console.log(Object.keys(formErrors).length)
		if (Object.keys(formErrors).length === 0) {
			// setFormValues(initialValues);
			// setFormErrors(initialValues);
			// setPlanDetails({});
			props.setTrigger(false);

			axios
				.put(
					`/plan/update/${props.planId}`,
					{
						startDate:
							formValues.startDate !== ''
								? formValues.startDate
								: planDetails.startDate,
						endDate:
							formValues.endDate !== ''
								? formValues.endDate
								: planDetails.endDate,
						destination:
							formValues.destination !== ''
								? formValues.destination
								: planDetails.destination,
						estimatedExpenses:
							formValues.estimatedExpenses !== ''
								? formValues.estimatedExpenses
								: planDetails.estimatedExpenses,
						travelDescription:
							formValues.travelDescription !== ''
								? formValues.travelDescription
								: planDetails.travelDescription,
					},
					{
						headers: { 'Content-Type': 'application/json' },
					}
				)
				.then((response) => {
					if (response.data.status === 'ok') {
						dispatch(changeUpdateStatus());
						toast.success("Your Plan Updated Successfully!!", {
              				position: "top-right",
             				autoClose: 3000,
              				hideProgressBar: false,
              				closeOnClick: true,
              				pauseOnHover: true,
              				draggable: true,
              				progress: undefined,
              				theme: "light",
            			});
						navigate('/plan');

					}
				})
				.catch((error) => {
					// alert(error)
				});
		}
	};

	useEffect(() => {
		async function myFunction() {
			const response = await axios.get(
				`/plan/${props.planId}`
			);
			setPlanDetails(response.data);
			setFormValues({
				startDate: response.data.startDate,
				endDate: response.data.endDate,
				destination: response.data.destination,
				estimatedExpenses: response.data.estimatedExpenses,
				travelDescription: response.data.travelDescription,
			});
		}
		myFunction();
	}, [props.planId]);

	const validate = (values) => {
		const errors = {};
		const nameregex = /^[a-z ,.'-]+$/i;
		const numRegex = /^[0-9]*$/i;
		const dateRegex =
			/^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(202[3-9]))$/i;

		if (!dateRegex.test(values.startDate)) {
			errors.startDate = 'Please enter a date in a format shown above';
		}

		if (!dateRegex.test(values.endDate)) {
			errors.endDate = 'Please enter a date in a format shown above';
		}

		const startDateStr = values.startDate;
		const endDateStr = values.endDate;

		const dateFormat = 'DD/MM/YYYY';

		const startDate = moment(startDateStr, dateFormat);
		const endDate = moment(endDateStr, dateFormat);

		if (!endDate.isSameOrAfter(startDate)) {
			errors.endDate = 'End date should not be less than start date';
		}

		if (!nameregex.test(values.destination)) {
			errors.destination = "Destination doesn't contain numbers";
		}

		if (!numRegex.test(values.estimatedExpenses)) {
			errors.estimatedExpenses = "Expense doesn't contains alaphabets";
		}

		return errors;
	};

	return props.trigger ? (
		<div className="popup">
			<div className="edit-plan-popup-inner">
				<div className="popup-title">
					<div className="card-trip-title__popup">
						<span>Update plan</span>
					</div>
					<div
						className="popup-button-close"
						onClick={() => props.setTrigger(false)}
					>
						<IoCloseCircleOutline />
					</div>
				</div>
				<hr />
				<div
					className="popup-input-list"
				>
					<div className="name-in-plan">
						<InputField
							type="text"
							name="startDate"
							value={formValues.startDate}
							handleChange={handleChange}
							label="Startdate"
							placeholder={planDetails.startDate}
							error={formErrors.startDate}
						/>
						<InputField
							type="text"
							name="endDate"
							value={formValues.endDate}
							handleChange={handleChange}
							label="Enddate"
							placeholder={planDetails.endDate}
							error={formErrors.endDate}
						/>
					</div>
					<InputField
						type="text"
						name="destination"
						value={formValues.destination}
						handleChange={handleChange}
						label="Destination"
						placeholder={planDetails.destination}
						error={formErrors.destination}
					/>
					<InputField
						type="text"
						name="estimatedExpenses"
						value={formValues.estimatedExpenses}
						handleChange={handleChange}
						label="Estimated Expense"
						placeholder={planDetails.estimatedExpenses}
						error={formErrors.estimatedExpenses}
					/>
					<TextArea
						row={2}
						name="travelDescription"
						value={formValues.travelDescription}
						handleChange={handleChange}
						label="Travel Description"
						placeholder={planDetails.travelDescription}
					/>
					<div className="popup-update-button">
					<Button
						onClick={handleSave}
						type="submit"
						variant="blue"
						name="Update"
					/>
					</div>
				</div>
			</div>
		</div>
	) : (
		''
	);
};

export default EditPlanPopup;
