import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import ItemDetail from '../components/ItemDetail';
import { getListOfInventory } from '../store/ItemStore';
import './ListView.css';

export default class ListView extends Component{

	constructor(props){
		super(props);
		this.state = {
			items: [],
			itemDetailRender: null,
		};
	}

	setItem = (itemId) => {
		let item = this.state.items.filter((x) => {return x.itemId === itemId || (x.item && x.item.itemId === itemId)})[0];
		this.setState({
			itemDetailRender: item,
		});
	}

	createList = () => {
		return this.state.items.map((item) => {
			if(item.item){
				item = item.item
			}
			return(<ListItem key={item.itemId}
							 itemId={item.itemId}
							 title={item.title}
							 onClick={this.setItem}/>
				  );
		});
	}

	renderDetail = () => {
		if(this.state.itemDetailRender){
			return(<ItemDetail item={this.state.itemDetailRender}/>);
		}
	}

	componentDidMount(){
		let itemsPromise = getListOfInventory(this.props.type);
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