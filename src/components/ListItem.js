import React, { Component } from 'react';
import './ListItem.css';
import editImg from '../images/EditButton.png';
import sellImg from '../images/MoneyButton.png';
import deleteImg from '../images/DeleteButton.png';

export default class ListItem extends Component{

	constructor(props){
		super(props);
		this.state = {
			className: 'listItem'
		};
	}

	handleClick = () => {
		this.props.onClick(this.props.itemId);
	}

	buttonClick = (e) => {
		e.stopPropagation();
		if(e.target.alt === 'edit'){
			console.log('Edit button');
		}else{
			this.props.buttonClick(e, this.props.itemId);
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.selectedItem && nextProps.selectedItem === this.props.itemId){
			this.setState({
				className: 'listItemSelected'
			});
		}else{
			this.setState({
				className: 'listItem'
			});
		}
	}

	render(){
		return(
			<div className={this.state.className} onClick={this.handleClick}>
				<p className='itemId'>{this.props.itemId}</p>
				<p className='titleText'>{this.props.title}</p>
				<img className='itemButton' src={editImg} alt='edit' onClick={this.buttonClick}/>
				<img className='itemButton' src={sellImg} alt='sell' onClick={this.buttonClick}/>
				<img className='itemButton' src={deleteImg} alt='delete' onClick={this.buttonClick}/>
			</div>
		)
	}
}
