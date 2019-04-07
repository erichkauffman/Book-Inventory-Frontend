import React from 'react';

const Options = (props) => {
	if(props.options){
		let ops = props.options.map((option) => {
			return <option key={option} value={option}>{option}</option>
		});
		if(props.placeholder){
			ops.push(<option key='empty' value='' disabled>Select</option>);
		}
		return ops;
	}
	return null;
}

export default Options;
