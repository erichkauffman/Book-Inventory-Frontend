import React from 'react';

const Dialog = (props) => {
	if(!props.renderCondition){
		return null;
	}
	return(
		<div className='backDrop'>
			<div className='dialogBox'>
				{props.children}
			</div>
		</div>
	);
}

export default Dialog;
