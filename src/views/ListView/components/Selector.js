import React from 'react';
import './Selector.css';

const Selector = (props) => {
	return(
		<div className={`${props.active?'selectorActive':'selector'}`} onClick={()=>{props.onClick(props.children)}}>
			{props.children}
		</div>
	);
}

export default Selector;
