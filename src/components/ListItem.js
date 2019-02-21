import React, { Component } from 'react';
import { commitRemoveAction } from '../lib/ItemRoutes';
import './ListItem.css';
import editImg from '../images/EditButton.png';
import sellImg from '../images/MoneyButton.png';
import deleteImg from '../images/DeleteButton.png';

export default class ListItem extends Component{

	handleClick = () => {
		this.props.onClick(this.props.itemId);
	}

	buttonClick = (e) => {
		let id = this.props.itemId;
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

	render(){
		return(
			<div className='listItem' onClick={this.handleClick}>
				<p className='itemId'>{this.props.itemId}</p>
				<p className='titleText'>{this.props.title}</p>
				<img className='itemButton' src={editImg} alt='edit' onClick={this.buttonClick}/>
				<img className='itemButton' src={sellImg} alt='sell' onClick={this.buttonClick}/>
				<img className='itemButton' src={deleteImg} alt='delete' onClick={this.buttonClick}/>
			</div>
		)
	}
}
