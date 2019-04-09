import React, { Component } from 'react';

import ListContainer from './components/ListContainer';
import ItemDetail from './components/ItemDetail';
import SelectorGenerator from './components/SelectorGenerator';
import { commitRemoveAction, getItemById } from '../../lib/ItemRoutes';
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
		if(window.confirm(`${e.target.alt}\nThis action is permanent and cannot be undone`)){
			if(e.target.alt === 'sell'){
				commitRemoveAction(itemId, 1);
			}else if(e.target.alt === 'delete'){
				commitRemoveAction(itemId, 0);
			}else{
				console.log("ListItem buttonClick called without proper handling");
			}
		}
	}

	render(){
		return(
			<div>
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
