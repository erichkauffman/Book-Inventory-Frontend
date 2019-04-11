import React from 'react';
import Conditional from '../../../components/Conditional';

const Dialog = (props) => {
	return(
		<Conditional render={props.renderCondition}>
			<div className='backDrop'>
				<div className='dialogBox'>
					{props.children}
				</div>
			</div>
		</Conditional>
	);
}

export default Dialog;
