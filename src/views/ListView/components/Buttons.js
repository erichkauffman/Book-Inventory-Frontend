import React from 'react';
import './Dialog.css';

const Buttons = (props) => {
	if(props.values){
		return props.values.map((value) => {
			return <button key={value}
						   value={value}
					   	   onClick={(e)=>{props.onClick(e.target.value)}}>{props.labels[value]}</button>
		});
	}
	return props.labels.map((label, index) => {
		return <button key={index}
					   value={index}
					   onClick={(e)=>{props.onClick(e.target.value)}}>{label}</button>
	});
}

export default Buttons;
