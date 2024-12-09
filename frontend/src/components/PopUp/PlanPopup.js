

import React, { useState, useEffect } from 'react';
import '../PopUp/EditPlanPopup.styles.css';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import '../PopUp/PlanPopup.styles.css';
import { SlCalender, SlInfo } from 'react-icons/sl';
import { AiOutlineDollarCircle } from 'react-icons/ai';

const PlanPopup = (props) => {
	const [planDetails, setPlanDetails] = useState({});

	useEffect(() => {
		{props.planId &&  axios({
			method: 'get',
			url: `/plan/${props.planId}`,
		})
			.then((response) => {
				setPlanDetails(response.data);
			})
			.catch((error) => {
				// alert(error);
			});}
	}, [props]);

	return props.trigger ? (
		<div className="popup">
			<div className="see-plan-popup-inner">
				<div className="popup-title">
					<h2>
						Plan of <span>{planDetails.firstName}</span>
					</h2>
					<div
						className="popup-button-close"
						onClick={() => props.setTrigger(false)}
					>
						<IoCloseCircleOutline />
					</div>
				</div>

				<div>
					<div className="see-plan-destination">
						<span>{planDetails.destination}</span>
					</div>
				</div>

				<div className="plan-dates">
					<div className="calender">
						<SlCalender />
					</div>
					<div>
						{planDetails.startDate} to {planDetails.endDate}
					</div>
				</div>

				<div className="plan-expenses">
					<div className="dollar">
						<AiOutlineDollarCircle />
					</div>
					<div>${planDetails.estimatedExpenses}</div>
				</div>

				<div className="plan-details">
					<div className="info">
						<SlInfo />
					</div>
					<div>{planDetails.travelDescription}</div>
				</div>
			</div>
		</div>
	) : (
		''
	);
};

export default PlanPopup;
