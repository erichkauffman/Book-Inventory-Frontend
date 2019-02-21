import React from 'react';
import MenuLink from './MenuLink';

import './Header.css';

const Header = () => {
	return(
		<div className='header'>
			<MenuLink link='/form/item'>New Item</MenuLink>
			<MenuLink link='/form/book'>New Book</MenuLink>
			<MenuLink link='/list/items'>All Items</MenuLink>
			<MenuLink link='/list/books'>Books</MenuLink>
		</div>
	);
}

export default Header;
