import React from 'react';
import './ListItem.css';

const ListItem = (props) => {
	return(
		<div class='listItem'>
			<p class='itemId'>{props.itemId}</p>
			<p class='titleText'>{props.title}</p>
		</div>
	)
}

export default ListItem;