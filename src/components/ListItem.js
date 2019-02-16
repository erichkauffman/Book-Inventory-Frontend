import React from 'react';
import { commitRemoveAction } from '../lib/ItemRoutes';
import './ListItem.css';
import editImg from '../images/EditButton.png';
import sellImg from '../images/MoneyButton.png';
import deleteImg from '../images/DeleteButton.png';

let handleClick = (props) => {
	props.onClick(props.itemId);
}

let buttonClick = (e, id) => {
	e.stopPropagation();
	if(e.target.alt === 'edit'){
		console.log(`The ${e.target.alt} button was pressed!`);
	}else if(e.target.alt === 'sell'){
		commitRemoveAction(id, 1);
	}else if(e.target.alt === 'delete'){
		commitRemoveAction(id, 0);
	}else{
		console.log("ListItem buttonClick called without proper handling");
	}
}

const ListItem = (props) => {
	return(
		<div className='listItem' onClick={() => {return handleClick(props)}}>
			<p className='itemId'>{props.itemId}</p>
			<p className='titleText'>{props.title}</p>
			<img className='itemButton' src={editImg} alt='edit' onClick={(e) => {buttonClick(e, props.itemId)}}/>
			<img className='itemButton' src={sellImg} alt='sell' onClick={(e) => {buttonClick(e, props.itemId)}}/>
			<img className='itemButton' src={deleteImg} alt='delete' onClick={(e) => {buttonClick(e, props.itemId)}}/>
		</div>
	)
}

export default ListItem;
