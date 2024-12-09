

import React, { useState, useEffect } from 'react';
import { MdEditNote } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { TbMessageCircle } from 'react-icons/tb';
import './Allplan.css';
import { Button } from '../../../components';
import Path from '../../../constants/Path';
import { Link } from 'react-router-dom';
import EditPlanPopup from '../../../components/PopUp/EditPlanPopup';
import PlanPopup from '../../../components/PopUp/PlanPopup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {MdOutlineEmail} from "react-icons/md"

const AllPlan = (props) => {
	const [plans, setPlans] = useState([]);
	const [planId, setPlanId] = useState(null);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPlanVisible, setPopupPlanVisible] = useState(false);
	const [showAll, setShowAll] = useState(false);
	const updateStatus = useSelector((state) => state.updatePlan.updateStatus);

	const items = Array.from(
		Array(
			plans.filter((plan) => plan.email === 'vanechamanav@gmail.com').length
		).keys()
	);
	const [displayCount, setDisplayCount] = useState(2);

	const handleShowAll = () => {
		setDisplayCount(displayCount + 2);
	};

	const handleShowLess = () => {
		setDisplayCount(2);
	};

	const handlePopup = (data) => {
		setPlanId(data);
		setPopupVisible(true);
	};

	const handlePlanPopup = (data) => {
		setPlanId(data);
		setPopupPlanVisible(true);
	};

	function toggleShowAll() {
		setShowAll(!showAll);
	}

	const sendEmail = async (email,name) => {

		let message = "Confirm sending an email to join "+name+"'s plan?";
        if(window.confirm(message)===true){

		await axios({
			method:'post',
			url:'/plan/mail/sendmail',
			data:{
				to:email,
			},
			headers: { 'Content-Type': 'application/json' },

		}).then((res)=>{
			if(res.data.success){
			toast.success("Email sent successfully!!", {
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
		})		
		}			
	}

	function deleteFunction(data) {
		return function () {
			let message = 'Confirm delete?';
			if (window.confirm(message) === true) {
				axios
					.delete(`/plan/delete/${data}`)
					.catch((error) => {
						console.log(error);
					});

				toast.success('Plan deleted successfully!!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else {
				toast.warn('Cancelled delete!!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
		};
	}

	useEffect(() => {
		props.setProgress(10);
		fetchPlan();
	}, [updateStatus]);

	const fetchPlan = async () => {
		const response = await axios.get(
			'/plan/'
		);
		props.setProgress(100);
		setPlans(response.data);
	};

	return (
		<>
			<div
				className={`${
					popupVisible || popupPlanVisible
						? 'non_scrollable_main_container'
						: 'main-container'
				}`}
			>
				<div className="left-container">
					<div className="left-container-title">
						<span className="left-container-title-bar">My Plans</span>

						<Link to={Path.CREATE_PLAN}>
							<Button
								variant="transparent"
								name="+ Post Plan"
							/>
						</Link>
					</div>
					<div className="left-container-own-plan">
						{plans
							.filter((plan) => plan.email === 'vanechamanav@gmail.com')
							.slice(0, displayCount)
							.map((plan) => (
								<div className="own-plan-card">
									<div key={plan._id}>
										<div className="card-title">
											<div className="destination">{plan.destination}</div>

											<div className="customize">
												<div
													className="update"
													onClick={() => handlePopup(plan._id)}
												>
													<MdEditNote />
												</div>

												<EditPlanPopup
													trigger={popupVisible}
													setTrigger={setPopupVisible}
													planId={planId}
													
												></EditPlanPopup>

												<div
													className="delete"
													onClick={deleteFunction(plan._id)}
												>
													<MdDeleteOutline />
												</div>
											</div>
										</div>
										<div className="dateandexpense">
											<div className="dates">{plan.startDate}</div>
										</div>
										<div className="own-plan-description">
											<div className="user_name_and_description">
												<div>
													{showAll
														? plan.travelDescription
														: `${plan.travelDescription.slice(0, 130)}....`}
													<button
														className="show_more_btn_in_description_all_plan"
														onClick={toggleShowAll}
													>
														{showAll ? 'show less' : 'show more'}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						{displayCount < items.length && (
							<div className="show-all-less">

								<Button
									// className="show-all-less-button"
									variant="grey"
									name="Load more"
									onClick={handleShowAll}
								/>
							</div>
						)}
						{displayCount >= items.length && (
							<div className="show-all-less">
								<Button
									// className="show-all-less-button"
									variant="grey"
									name="Show Less"
									onClick={handleShowLess}
								/>
							</div>
						)}
					</div>
				</div>

				<div className="right-container">
					<div className="all-plan-title">
						<span>Travel Plans</span>
					</div>
					<div className="plans">
						{plans
							.filter((plan) => plan.email !== 'vanechamanav@gmail.com')
							.map((plan) => (
								<div className="card">
									<div className="dateandexpense">
										<div className="destination">{plan.destination}</div>
										<div className="share">By {plan.firstName}</div>
										<PlanPopup
											trigger={popupPlanVisible}
											setTrigger={setPopupPlanVisible}
											planId={planId}
										></PlanPopup>
									</div>
									<div className="dates">{plan.startDate}</div>
									<div className="pt-2">
										<p>{plan.travelDescription.slice(0, 150)}....</p>
									</div>
									<hr />

									<div className="plan-by-section">
										<Button
											className="btn-more-details"
											variant="grey"
											name="More details"
											onClick={() => handlePlanPopup(plan._id)}
										/>

										<div className="message">
											<MdOutlineEmail onClick={()=>{sendEmail(plan.email,plan.firstName)}}/>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default AllPlan;
