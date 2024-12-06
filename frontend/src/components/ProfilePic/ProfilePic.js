

import React, { useState } from 'react';
import './ProfilePic.css';

const ProfilePic = (props) => {
	const [model, setModel] = useState(false);

	const toggleModel = () => {
		setModel(!model);
	};

	return (
		<div className="profile_pic_div">
			<div className="image_container">
				{/* <div className="image"> */}
				<img
					onClick={toggleModel}
					className={`profile_pic ${
						props.size === 'small' ? 'small_profile_pic' : 'large_profile_pic'
					} `}
					src={props.image_url}
					alt="No profile pic available"
				></img>
				{/* </div> */}
			</div>
			{model && (
				<div className="model">
					<div
						onClick={toggleModel}
						className="overlay"
					></div>
					<span onClick={toggleModel}>&times;</span>
					<img
						className="profile_pic_in_big_view"
						src={props.image_url}
						alt="No profile pic available"
					></img>
				</div>
			)}
		</div>
	);
};

export default ProfilePic;
