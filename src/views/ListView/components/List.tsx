import React, { Fragment } from 'react';

import ListItem from './ListItem';
import Conditional from '../../../components/Conditional';
import { IBasicItem } from '../../../data/types';

type Props = {
	items: IBasicItem[],
	type: string,
	start: number,
	end: number,
	selectedItem: number | null,
	onClick: (...args: any) => void,
	buttonClick: (...args: any) => void
}

const List = (props: Props) => {
	let itemArray = props.items.map((item: IBasicItem, index: number) => {
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
	return(
		<Fragment>
			{itemArray}
		</Fragment>
	);
}

export default List;
