import React from 'react';
import MenuLink from './MenuLink';
import Conditional from './Conditional';
import { apiPath } from '../config';

import './Header.css';

const Header = (props) => {
	return(
		<div className='header'>
			<MenuLink link='/form/item' highlight={props.view==='form'&&props.type==='item'}>New Item</MenuLink>
			<MenuLink link='/form/book' highlight={props.view==='form'&&props.type==='book'}>New Book</MenuLink>
			<MenuLink link='/list/items' highlight={props.view==='list'&&props.type==='items'}>All Items</MenuLink>
			<MenuLink link='/list/books' highlight={props.view==='list'&&props.type==='books'}>Books</MenuLink>
			<MenuLink link='/data' highlight={props.view==='data'}>Saved Data</MenuLink>
			<MenuLink link='/support' highlight={props.view==='support'}>Support</MenuLink>
			<Conditional render={props.type && props.view !== 'form'}>
				<a href={`${apiPath}/${props.type}/csv/`}>
					<div className='externalLinkContainer'>
						<p>Download CSV</p>
					</div>
				</a>
			</Conditional>
		</div>
	);
}

export default Header;
