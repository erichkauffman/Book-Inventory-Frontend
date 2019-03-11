import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import ItemDetail from '../components/ItemDetail';
import Selector from '../components/Selector';
import { commitRemoveAction, getItemById } from '../lib/ItemRoutes';
import './ListView.css';

export default class ListView extends Component{

	constructor(props){
		super(props);
		this.state = {
			itemDetailRender: null,
			id: null,
			filter: 'itemId',
			search: ''
		};
	}

	setItem = (itemId) => {
		if(this.state.id !== itemId){
			let itemPromise = getItemById(itemId, this.props.type);
			itemPromise.then((raw) => {
				let item = {...raw, ...raw.item};
				delete item.item;
				return item;
			})
			.then((item) => {
				this.setState({
					itemDetailRender: item,
					id: itemId
				});
			});
		}
	}

	handleRemove = (e, itemId) => {
		if(window.confirm(`${e.target.alt}\nThis action is permanent and cannot be undone`)){
			if(e.target.alt === 'sell'){
				commitRemoveAction(itemId, 1);
				this.props.removeItem(itemId, this.props.type);
			}else if(e.target.alt === 'delete'){
				commitRemoveAction(itemId, 0);
				this.props.removeItem(itemId, this.props.type);
			}else{
				console.log("ListItem buttonClick called without proper handling");
			}
		}
	}

	createSelectors = () => {
		let fields = ['itemId', 'upc', 'title'];
		if(this.props.type === 'books'){
			fields = fields.concat(['author']);
		}
		return fields.map((field) => {
			return(<Selector active={this.state.filter===field} 
							 key={field}
							 onClick={(value)=>{this.setState({filter:value})}}>
						{field}
				   </Selector>);
		});
	}

	createList = () => {
		let items = this.props.items;
		if(this.state.search){
			items = items.filter((item) => {
				return item[this.state.filter].toString().toLowerCase().includes(this.state.search.toLowerCase());
			});
		}
		return items.map((item) => {
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
			return(<ItemDetail item={this.state.itemDetailRender} type={this.props.type}/>);
		}
	}

	componentWillReceiveProps(){
		this.setState({
			filter: 'itemId',
			itemDetailRender: null,
			id: null,
			search: ''
		});
	}

	render(){
		return(
			<div>
				<div className='contain'>
					<div>
						<input className='searchBar' type='text' value={this.state.search} onChange={(e)=>{this.setState({search:e.target.value})}}/>
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
