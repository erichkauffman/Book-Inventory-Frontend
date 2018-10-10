import React from 'react';

const ListItem = (props) => {
	return(
		<div>
			<p>{props.itemId}</p>
			<p>{props.title}</p>
		</div>
	)
}

export default ListItem;