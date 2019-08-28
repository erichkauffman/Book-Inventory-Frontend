import React, { Fragment } from 'react';

import Selector from './Selector';

type Props = {
	fields: string[],
	activated: string,
	onClick: (...args: any) => void
}

const SelectorGenerator = (props: Props) => {
	let selectorArray = props.fields.map((field) => {
		return(<Selector active={props.activated===field} 
						 key={field}
						 onClick={props.onClick}>
					{field}
			   </Selector>);
	});
	return(
		<Fragment>
			{selectorArray}
		</Fragment>
	);
}

export default SelectorGenerator;
