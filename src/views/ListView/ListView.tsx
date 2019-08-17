import React, { Component } from 'react';

import ListContainer from './components/ListContainer';
import ItemDetail from './components/ItemDetail';
import Dialog from './components/Dialog';
import Buttons from './components/Buttons';
import SelectorGenerator from './components/SelectorGenerator';
import Conditional from '../../components/Conditional';
import { commitRemoveAction, commitSell, getItemById, getSites } from '../../lib/ItemRoutes';
import { IBasicItem, IBasicBook, IItem, IBook } from '../../data/types';
import { filterItems } from './lib/filterItems';
import './ListView.css';

type Props = {
	type: string,
	items: IBasicItem[] | IBasicBook[]
}

type State = {
	itemDetailRender: IItem | IBook | null,
	id: number|null,
	filter: string,
	search: string,
	sell: number | null,
	remove: number | null,
	sites: number[]|null
}

const fields = ['itemId', 'siteId', 'upc', 'title'];

export default class ListView extends Component<Props, State>{
	state: State = {
		itemDetailRender: null,
		id: null,
		filter: 'itemId',
		search: '',
		sell: null,
		remove: null,
		sites: null
	};

	setItem = (itemId: number) => {
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

	handleRemove = (e: any, itemId: number) => {
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

	handleDelete = (itemId: number, deleteValue: number) => {
		commitRemoveAction(itemId, deleteValue);
		this.setState({remove:null});
	}

	handleSell = (itemId: number, site: number) => {
		if(site === -1){
			commitSell(itemId, null);
		}else{
			commitSell(itemId, site);
		}
		this.setState({sell:null, sites:[]});
	}

	render(){
		return(
			<div>
				<Dialog renderCondition={this.state.remove}>
					<h3>Delete</h3>
					<p>This action is permanent and cannot be undone</p>
					<button onClick={()=>{this.setState({remove:null})}}>Cancel</button>
					<Buttons
						labels={['Destroy', 'Personal Use']}
						onClick={(data: any)=>{this.handleDelete(this.state.remove as number, parseInt(data)+1)}}
					/>
				</Dialog>
				<Dialog renderCondition={this.state.sell}>
					<h3>Sell</h3>
					<p>This action is permanent and cannot be undone</p>
					<button onClick={()=>{this.setState({sell:null, sites:[]})}}>Cancel</button>
					<button onClick={()=>{this.handleSell(this.state.sell as number, -1)}}>Physical</button>
					<Buttons
						labels={['Amazon', 'EBay']}
						values={this.state.sites}
						onClick={(data: any)=>{this.handleSell(this.state.sell as number, parseInt(data))}}
					/>
				</Dialog>
				<div className='contain'>
					<div>
						<input
							className='searchBar'
							type='text'
							value={this.state.search}
							onChange={(e)=>{this.setState({search:e.target.value})}}
						/>
						<SelectorGenerator
							fields={fields}
							activated={this.state.filter}
							onClick={(value: any)=>{this.setState({filter:value})}}
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
					<Conditional render={!!this.state.itemDetailRender}>
						<ItemDetail item={this.state.itemDetailRender} type={this.props.type}/>
					</Conditional>
				</div>
			</div>
		);
	}
}
