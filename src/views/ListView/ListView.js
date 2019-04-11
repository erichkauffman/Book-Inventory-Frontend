import React, { Component } from 'react';

import ListContainer from './components/ListContainer';
import ItemDetail from './components/ItemDetail';
import Dialog from './components/Dialog';
import Buttons from './components/Buttons';
import SelectorGenerator from './components/SelectorGenerator';
import { commitRemoveAction, commitSell, getItemById, getSites } from '../../lib/ItemRoutes';
import { filterItems } from './lib/filterItems';
import './ListView.css';

export default class ListView extends Component{

	constructor(props){
		super(props);
		let fields = ['itemId', 'upc', 'title'];
		if(props.type === 'books'){
			fields.push('author');
		}
		this.state = {
			itemDetailRender: null,
			id: null,
			filter: 'itemId',
			fields: fields,
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
		if(e.target.alt === 'sell'){
			let sitesPromise = getSites(itemId);
			sitesPromise.then((sites) => {
				this.setState({sell:itemId, sites:sites});
			});
		}else if(e.target.alt === 'delete'){
			this.setState({remove:itemId});
		}else{
			console.log("ListItem buttonClick called without proper handling");
		}
	}

	handleDelete = (itemId, deleteValue) => {
		commitRemoveAction(itemId, deleteValue);
		this.setState({remove:false});
	}

	handleSell = (itemId, site) => {
		if(site === -1){
			site = null;
		}
		commitSell(itemId, site);
		this.setState({sell:false, sites:[]});
	}

	render(){
		return(
			<div>
				<Dialog renderCondition={this.state.remove}>
					<h3>Delete</h3>
					<p>This action is permanent and cannot be undone</p>
					<button onClick={()=>{this.setState({remove:false})}}>Cancel</button>
					<Buttons labels={['Destroy', 'Personal Use']} onClick={(data)=>{this.handleDelete(this.state.remove, parseInt(data)+1)}}/>
				</Dialog>
				<Dialog renderCondition={this.state.sell}>
					<h3>Sell</h3>
					<p>This action is permanent and cannot be undone</p>
					<button onClick={()=>{this.setState({sell:false, sites:[]})}}>Cancel</button>
					<button onClick={()=>{this.handleSell(this.state.sell, -1)}}>Physical</button>
					<Buttons labels={['Amazon', 'EBay']} values={this.state.sites} onClick={(data)=>{this.handleSell(this.state.sell, parseInt(data))}}/>
				</Dialog>
				<div className='contain'>
					<div>
						<input className='searchBar' type='text' value={this.state.search} onChange={(e)=>{this.setState({search:e.target.value})}}/>
						<SelectorGenerator fields={this.state.fields}
										   activated={this.state.filter}
										   onClick={(value)=>{this.setState({filter:value})}}
						/>
					</div>
					<ListContainer
						items={filterItems(this.props.items, this.state.filter, this.state.search)}
						type={this.props.type}
						itemHeight={56}
						selectedItem={this.state.id}
						onClick={this.setItem}
						buttonClick={this.handleRemove}
					/>
				</div>
				<div className='detail'>
					<ItemDetail item={this.state.itemDetailRender} type={this.props.type}/>
				</div>
			</div>
		);
	}
}
