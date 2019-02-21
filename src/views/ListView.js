import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import ItemDetail from '../components/ItemDetail';
import { getSellableInventory, commitRemoveAction } from '../lib/ItemRoutes';
import './ListView.css';

export default class ListView extends Component{

	constructor(props){
		super(props);
		this.state = {
			items: [],
			itemDetailRender: null,
			id: null
		};
	}

	setItem = (itemId) => {
		let item = this.state.items.find((x) => {return x.itemId === itemId || (x.item && x.item.itemId === itemId)});
		this.setState({
			itemDetailRender: item,
			id: itemId
		});
	}

	removeItem = (itemId) => {
		let items = [];
		if(this.props.type === 'items'){
			items = this.state.items.filter((x) => {return x.itemId !== itemId});
		}else if(this.props.type === 'books'){
			items = this.state.items.filter((x) => {return x.item.itemId !== itemId});
		}
		this.setState({
			items: items
		});
	}

	handleRemove = (e, itemId) => {
		if(e.target.alt === 'sell'){
			commitRemoveAction(itemId, 1);
			this.removeItem(itemId);
		}else if(e.target.alt === 'delete'){
			commitRemoveAction(itemId, 0);
			this.removeItem(itemId);
		}else{
			console.log("ListItem buttonClick called without proper handling");
		}
	}

	createList = () => {
		return this.state.items.map((item) => {
			if(item.item){
				item = item.item
			}
			return(<ListItem key={item.itemId}
							 itemId={item.itemId}
							 selectedItem={this.state.id}
							 title={item.title}
							 onClick={this.setItem}
							 buttonClick={this.handleRemove}/>
			);
		});
	}

	renderDetail = () => {
		if(this.state.itemDetailRender){
			return(<ItemDetail item={this.state.itemDetailRender}/>);
		}
	}

	componentDidMount(){
		let itemsPromise = getSellableInventory(this.props.type);
		itemsPromise.then((res) => {
			this.setState({
				items: res,
			});
		});
	}

	render(){
		return(
			<div>
				<div className='contain'>
					<input className='searchBar' type='text'/>
					<div className='list'>
						{this.createList()}
					</div>
				</div>
				<div className='detail'>
					{this.renderDetail()}
				</div>
			</div>
		);
	}
}
