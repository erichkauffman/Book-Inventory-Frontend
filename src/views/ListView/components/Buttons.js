import React from 'react';
import './Dialog.css';

const Buttons = (props) => {
	return props.labels.map((label, index) => {
		return <button key={index}
					   value={index}
					   onClick={(e)=>{props.onClick(e.target.value)}}>{label}</button>
	});
}

export default Buttons;
