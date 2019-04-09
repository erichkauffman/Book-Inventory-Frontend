import React from 'react';
import './EnvironmentWarning.css';

const EnvironmentWarning = (props) => {
	if(props.envType === 'Development' || props.envType === 'Staging'){
		return(<div className='envWarning'>{props.envType}: Use For Testing Only!</div>)
	}
	return null;
}

export default EnvironmentWarning;
