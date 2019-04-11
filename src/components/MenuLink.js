import React from 'react';
import { Link } from 'react-router-dom';

import './MenuLink.css';

const MenuLink = (props) => {
	return(
		<Link to={props.link}>
			<div className={props.highlight?'menuButtonHighlight':'menuButtonContainer'}>
				<p>{props.children}</p>
			</div>
		</Link>
	)
}

export default MenuLink;
