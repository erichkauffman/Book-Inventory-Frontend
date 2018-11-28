import React from 'react';
import './ListItem.css';

let handleClick = (e, props) => {
	props.onClick(props.itemId);
}

const ListItem = (props) => {
	return(
		<div className='listItem' onClick={(e) => {return handleClick(e, props)}}>
			<p className='itemId'>{props.itemId}</p>
			<p className='titleText'>{props.title}</p>
		</div>
	)
}

export default ListItem;