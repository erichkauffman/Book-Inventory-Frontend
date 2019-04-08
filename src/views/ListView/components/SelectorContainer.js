import React from 'react';

import Selector from './Selector';

const SelectorContainer = (props) => {
	return props.fields.map((field) => {
		return(<Selector active={props.activated===field} 
						 key={field}
						 onClick={props.onClick}>
					{field}
			   </Selector>);
	});
}

export default SelectorContainer;
