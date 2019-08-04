import React from 'react';

import deleteImg from '../../../images/DeleteButton.png';
import './DisplaySavedData.css';

type Props = {
	data: string[],
	deleteData: (value: string) => void
}

const DisplaySavedData = (props: Props) => {
	let dataDivs = props.data.map((info) => {
		return(
			<div key={info} className='savedDataDiv'>
				<p>{info}</p>
				<img src={deleteImg} alt='delete' onClick={()=>{props.deleteData(info)}}/>
			</div>
		);
	});
	return <div>{dataDivs}</div>
}

export default DisplaySavedData;
