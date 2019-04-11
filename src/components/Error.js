import React from 'react';

import Conditional from './Conditional';
import './Error.css';

const Error = (props) => {
	return(
		<Conditional render={props.err}>
			<h3 className='error'>
				{props.children}
			</h3>
		</Conditional>
	);
}

export default Error;
