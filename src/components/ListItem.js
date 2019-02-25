import React from 'react';
import { Link } from 'react-router-dom';
import './ListItem.css';
import editImg from '../images/EditButton.png';
import sellImg from '../images/MoneyButton.png';
import deleteImg from '../images/DeleteButton.png';

const handleClick = (props) => {
	props.onClick(props.itemId);
}

const buttonClick = (e, props) => {
	e.stopPropagation();
	if(e.target.alt === 'edit'){
		console.log('Edit button');
	}else{
		props.buttonClick(e, props.itemId);
	}
}

const ListItem = (props) => {
	return(
		<div className={props.selectedItem===props.itemId?'listItemSelected':'listItem'} onClick={() => {handleClick(props)}}>
			<p className='itemId'>{props.itemId}</p>
			<p className='titleText'>{props.title}</p>
			<Link to={`/form/${props.type}`}>
				<img className='itemButton' src={editImg} alt='edit' onClick={(e) => {buttonClick(e, props)}}/>
			</Link>
			<img className='itemButton' src={sellImg} alt='sell' onClick={(e) => {buttonClick(e, props)}}/>
			<img className='itemButton' src={deleteImg} alt='delete' onClick={(e) => {buttonClick(e, props)}}/>
		</div>
	)
}

export default ListItem;
