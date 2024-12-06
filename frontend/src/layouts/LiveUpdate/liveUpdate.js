

import React from 'react';
import { LiveUpdateImage } from '../../components';
import './liveUpdate.css';

const LiveUpdate = (props) => {
	return (
		<div className="live_update_images">
			<LiveUpdateImage live_update_url={props.image}></LiveUpdateImage>
		</div>
	);
};

export default LiveUpdate;
