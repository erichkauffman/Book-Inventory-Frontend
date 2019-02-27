import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import ItemDetail from '../components/ItemDetail';
import Selector from '../components/Selector';
import { getSellableInventory, commitRemoveAction } from '../lib/ItemRoutes';
import './ListView.css';

export default class ListView extends Component{

	constructor(props){
		super(props);
		this.state = {
			items: [],
			itemDetailRender: null,
			id: null,
			filter: 'itemId',
			search: ''
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

	createSelectors = () => {
		let fields = ['itemId', 'upc', 'title'];
		if(this.props.type === 'books'){
			fields = fields.concat(['author']);
		}
		return fields.map((field) => {
			return(<Selector active={this.state.filter===field} 
							 onClick={(value)=>{this.setState({filter:value})}}>
						{field}
				   </Selector>);
		});
	}

	createList = () => {
		let items = this.state.items;
		if(this.state.search){
			items = items.filter((item) => {
				if(item.item){
					item = {...item, ...item.item};
					delete item.item;
				}
				return item[this.state.filter].toString().toLowerCase().includes(this.state.search.toLowerCase());
			});
		}
		return items.map((item) => {
			if(item.item){
				item = item.item;
			}
			return(<ListItem key={item.itemId}
							 itemId={item.itemId}
							 type={this.props.type}
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

	getInventory = (type) => {
		let itemsPromise = getSellableInventory(type);
		itemsPromise.then((res) => {
			this.setState({
				items: res
			});
		});	
	}

	componentDidMount(){
		this.getInventory(this.props.type);
	}

	componentWillReceiveProps(nextProps){
		this.setState({filter:'itemId'});
		this.getInventory(nextProps.type);
	}

	render(){
		return(
			<div>
				<div className='contain'>
					<div className='search'>
						<input className='searchBar' type='text' onChange={(e)=>{this.setState({search:e.target.value})}}/>
						{this.createSelectors()}
					</div>
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
