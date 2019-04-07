import React from 'react';

const CheckBoxes = (props) => {
	return props.labels.map((label, index) => {
		return(
			<label key={index}>{label}
				<input type='checkbox' name={props.name} value={index} onChange={props.onChange} checked={props.checkedValues[index]}/>
			</label>
		);
	});
}

export default CheckBoxes;
