import React from 'react';
import MenuLink from './MenuLink';
import Conditional from './Conditional';
import { apiPath } from '../config';

import './Header.css';

const Header = (props) => {
	return(
		<div className='header'>
			<MenuLink link='/form/item'>New Item</MenuLink>
			<MenuLink link='/form/book'>New Book</MenuLink>
			<MenuLink link='/list/items'>All Items</MenuLink>
			<MenuLink link='/list/books'>Books</MenuLink>
			<MenuLink link='/data'>Saved Data</MenuLink>
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
