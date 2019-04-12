import React from 'react';
import Conditional from '../../../components/Conditional';

const TextInputs = (props) => {
	return props.labelValues.map((labelValue, index) => {
		return(
			<Conditional render={labelValue}>
				<label>{props.labels[index]} id:</label>
				<input type='text'/>
				<br/>
			</Conditional>
		);
	});
}

export default TextInputs;
