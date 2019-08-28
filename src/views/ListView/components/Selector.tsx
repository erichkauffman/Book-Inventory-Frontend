import React from 'react';
import './Selector.css';

type Props = {
	active: boolean,
	children: string,
	onClick: (...args: any) => void
}

const Selector = (props: Props) => {
	return(
		<div className={`${props.active?'selectorActive':'selector'}`} onClick={()=>{props.onClick(props.children)}}>
			{props.children}
		</div>
	);
}

export default Selector;
