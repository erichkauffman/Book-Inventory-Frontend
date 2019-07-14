import React from 'react';
import { NavLink } from 'react-router-dom';
import Conditional from './Conditional';
import { apiPath } from '../config';

import './Header.css';

const Header = (props) => {
	return(
		<div className='header'>
			<ul id='nav'>
				<li><NavLink to='/form/item'>New Item</NavLink></li>
				<li><NavLink to='/form/book'>New Book</NavLink></li>
				<li><NavLink to='/list/items'>All Items</NavLink></li>
				<li><NavLink to='/list/books'>Books</NavLink></li>
				<li><NavLink to='/data'>Saved Data</NavLink></li>
				<li><NavLink to='/support'>Support</NavLink></li>
				{/* The Download CSV button should be moved elsewhere */}
				{/* It's really bad UX to have this look like a tab, I'm sorry */}
				<Conditional render={props.type && props.view !== 'form'}>
					<li><a href={`${apiPath}/${props.type}/csv/`}>Download CSV</a></li>
				</Conditional>
			</ul>
		</div>
	);
}

export default Header;
