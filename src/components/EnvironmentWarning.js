import React from 'react';

import Conditional from './Conditional';
import './EnvironmentWarning.css';

const EnvironmentWarning = (props) => {
	return(
		<Conditional render={props.envType === 'Development' || props.envType === 'Staging'}>
			<div className='envWarning'>{props.envType}: Use For Testing Only!</div>
		</Conditional>
	);
}

export default EnvironmentWarning;
