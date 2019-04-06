import React from 'react';
import './Error.css';

const Error = (props) => {
	if(props.err){
		return(
			<h3 className='error'>
				{props.children}
			</h3>
		);
	}
	return null;
}

export default Error;
