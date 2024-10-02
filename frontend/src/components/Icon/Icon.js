import React from 'react';

import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { ReactComponent as Settings } from '../../assets/settings.svg';
import { ReactComponent as Close } from '../../assets/close.svg';

let iconTypes = {
	edit: Edit,
	delete: Delete,
	setting: Settings,
	close: Close,
};

const IconComponent = ({ name, ...props }) => {
	let Icon = iconTypes[name];
	return <Icon {...props} />;
};

export default IconComponent;
