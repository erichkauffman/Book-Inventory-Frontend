import React from 'react';

import ListItem from './ListItem';

const List = (props) => {
	return props.items.map((item, index) => {
		if(index >= props.start && index < props.end){
			return(
				<ListItem
					key={item.itemId}
					itemId={item.itemId}
					type={props.type}
					selectedItem={props.selectedItem}
					title={item.title}
					onClick={props.onClick}
					buttonClick={props.buttonClick}
				/>
			);
		}
		return null;
	});
}

export default List;
