import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import { getListOfItems } from '../store/ItemStore'
import './ListView.css';

export default class ListView extends Component{

	constructor(props){
		super(props);
		this.state = {
			items: [],
		};
	}

	createList = () => {
		return this.state.items.map((item) => {
			return(<ListItem key={item.itemId} itemId={item.itemId} title={item.title}/>);
		});
	}

	componentDidMount(){
		let itemsPromise = getListOfItems();
		itemsPromise.then((res) => {
			this.setState({
				items: res,
			});
		});
	}

	render(){
		return(
			<div>
				<input class='searchBar' type='text'/>
				<div>
					{this.createList()}
				</div>
			</div>
		);
	}
}