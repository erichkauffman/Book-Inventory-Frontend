import React from 'react';

const RadioButtons = (props) => {
	return props.labels.map((label, index) => {
		return(
			<label key={index}>{label}
				<input type='radio' name={props.name} value={index} onChange={props.onChange} checked={parseInt(props.checkedValue) === index}/>
			</label>
		);
	});
}

export default RadioButtons;
