import React from 'react';

import ListItem from './ListItem';
import Conditional from '../../../components/Conditional';

const List = (props) => {
	return props.items.map((item, index) => {
		return(
			<Conditional render={index >= props.start && index < props.end}>
				<ListItem
					key={item.itemId}
					itemId={item.itemId}
					type={props.type}
					selectedItem={props.selectedItem}
					title={item.title}
					onClick={props.onClick}
					buttonClick={props.buttonClick}
				/>
			</Conditional>
		);
	});
}

export default List;
