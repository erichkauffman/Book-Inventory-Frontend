import React from 'react';
import MenuLink from './MenuLink';

import './Header.css';

const Header = () => {
	return(
		<div class='header'>
			<MenuLink link='/form/item'>New Item</MenuLink>
			<MenuLink link='/form/book'>New Book</MenuLink>
		</div>
	);
}

export default Header;
