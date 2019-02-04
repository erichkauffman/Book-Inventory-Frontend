import React from 'react';
import './ListItem.css';
import editImg from '../images/EditButton.png';
import sellImg from '../images/MoneyButton.png';
import deleteImg from '../images/DeleteButton.png';

let handleClick = (e, props) => {
	props.onClick(props.itemId);
}

let buttonClick = (e, msg) => {
	e.stopPropagation();
	console.log(`The ${msg} button was pressed!`);
}

const ListItem = (props) => {
	return(
		<div className='listItem' onClick={(e) => {return handleClick(e, props)}}>
			<p className='itemId'>{props.itemId}</p>
			<p className='titleText'>{props.title}</p>
			<img className='itemButton' src={editImg} alt="edit" onClick={(e) => {return buttonClick(e, 'edit')}}/>
			<img className='itemButton' src={sellImg} alt="sell" onClick={(e) => {return buttonClick(e, 'sell')}}/>
			<img className='itemButton' src={deleteImg} alt="delete" onClick={(e) => {return buttonClick(e, 'delete')}}/>
		</div>
	)
}

export default ListItem;
