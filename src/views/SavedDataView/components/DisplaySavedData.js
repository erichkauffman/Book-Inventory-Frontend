import React from 'react';

import deleteImg from '../../../images/DeleteButton.png';
import './DisplaySavedData.css';

const DisplaySavedData = (props) => {
	if(props.data[props.type]){
		return props.data[props.type].map((info) => {
			return(
				<div key={info} className='savedDataDiv'>
					<p>{info}</p>
					<img src={deleteImg} alt='delete' onClick={()=>{props.deleteData(props.type, info)}}/>
				</div>
			);
		});
	}
	return null;
}

export default DisplaySavedData;
