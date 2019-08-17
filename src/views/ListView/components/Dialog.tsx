import React, { ReactElement } from 'react';
import Conditional from '../../../components/Conditional';

type Props = {
	renderCondition: boolean,
	children: ReactElement|ReactElement[]
}

const Dialog = (props: Props) => {
	return(
		<Conditional render={props.renderCondition}>
			<div className='backDrop'>
				<div className='dialogBox'>
					{props.children}
				</div>
			</div>
		</Conditional>
	);
}

export default Dialog;
