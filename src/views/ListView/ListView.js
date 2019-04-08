import React, { Component } from 'react';

import ListItem from './components/ListItem';
import ItemDetail from './components/ItemDetail';
import SelectorContainer from './components/SelectorContainer';
import NotFound from '../../components/NotFound';
import { commitRemoveAction, getItemById } from '../../lib/ItemRoutes';
import './ListView.css';

const itemHeight = 56;

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
			search: '',
			scroll: 0,
			height: 0
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

	createList = (unfilteredItems) => {
		if(!unfilteredItems){
			return(<NotFound/>);
		}
		let items = unfilteredItems;
		if(this.state.search){
			items = items.filter((item) => {
				return item[this.state.filter].toString().toLowerCase().includes(this.state.search.toLowerCase());
			});
		}
		let numItems = items.length;
		let scrollTop = this.state.scroll;
		let scrollBottom = scrollTop + this.state.height;
		let start = Math.max(Math.floor(scrollTop / itemHeight) - 20, 0);
		let end  = Math.min(Math.ceil((scrollBottom / itemHeight) + 20), items.length);
		items = items.map((item, index) => {
			if(index >= start && index < end){
				return(<ListItem key={item.itemId}
							 itemId={item.itemId}
							 type={this.props.type}
							 selectedItem={this.state.id}
							 title={item.title}
							 onClick={this.setItem}
							 buttonClick={this.handleRemove}/>
				);
			}
			return null;
		});
		return(
			<div className='list' style={{height:(numItems*itemHeight), paddingTop:(start*itemHeight)}}>
				{items}
			</div>);
	}

	renderDetail = (item, type) => {
		if(item){
			return(<ItemDetail item={item} type={type}/>);
		}
	}

	updateWindowHeight = () => {
		this.setState({height:window.innerHeight-150});
	}

	componentDidMount(){
		this.updateWindowHeight();
		window.addEventListener('resize', this.updateWindowHeight);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.updateWindowHeight)
	}

	render(){
		return(
			<div>
				<div className='contain'>
					<div>
						<input className='searchBar' type='text' value={this.state.search} onChange={(e)=>{this.setState({search:e.target.value})}}/>
						<SelectorContainer fields={this.state.fields}
										   activated={this.state.filter}
										   onClick={(value)=>{this.setState({filter:value})}}
						/>
					</div>
					<div className='listContainer' onScroll={(e)=>{this.setState({scroll:e.target.scrollTop})}}>
						{this.createList(this.props.items)}
					</div>
				</div>
				<div className='detail'>
					{this.renderDetail(this.state.itemDetailRender, this.props.type)}
				</div>
			</div>
		);
	}
}
