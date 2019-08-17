import React from 'react';
import './Dialog.css';

const Buttons = (props: any) => {
	if(props.values){
		return props.values.map((value: any) => {
			return <button key={value}
						   value={value}
					   	   onClick={(e)=>{props.onClick((e.target as HTMLInputElement).value)}}>{props.labels[value]}</button>
		});
	}
	return props.labels.map((label: any, index: any) => {
		return <button key={index}
					   value={index}
					   onClick={(e)=>{props.onClick((e.target as HTMLInputElement).value)}}>{label}</button>
	});
}

export default Buttons;
