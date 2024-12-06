

import React, { useState, useEffect } from 'react';
import './liveUpdateImage.css';

const LiveUpdates = (props) => {
	const [model, setModel] = useState(false);
	const toggleModel = () => {
		setModel(!model);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (model === true) setModel(false);
		}, 10000);

		return () => clearTimeout(timer);
	}, [model]);

	return (
		<div className="live_update_div">
			<img
				onClick={toggleModel}
				className="live_update_pic"
				src={props.live_update_url}
				alt="No live update available"
			></img>
			{model && (
				<div className="model_in_live_update">
					<div
						onClick={toggleModel}
						className="overlay"
					></div>
					<p
						className="close_button_in_model"
						onClick={toggleModel}
					>
						&times;
					</p>
					<div className="popup_div">
						<div className="popup_image_animation"></div>
						<img
							className="popup_image"
							src={props.live_update_url}
							alt="No profile pic available"
						></img>
					</div>
				</div>
			)}
		</div>
	);
};

export default LiveUpdates;
