import React from 'react';

const Selector = (props) => {
	return(
		<div className='selector' onClick={()=>{props.onClick(props.children)}}>
			{props.children}
		</div>
	);
}

export default Selector;
