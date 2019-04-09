import React from 'react';

const Dialog = (props) => {
	if(props.renderCondition){
		return(
			<div className='backDrop'>
				<div className='dialogBox'>
					{props.children}
				</div>
			</div>
		);
	}
	return null;
}

export default Dialog;
