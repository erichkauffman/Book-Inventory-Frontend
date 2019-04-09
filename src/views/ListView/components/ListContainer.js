import React, { Component } from 'react';

import List from './List';
import NotFound from '../../../components/NotFound';
import './ListContainer.css';

export default class ListContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			scroll: 0,
			height: 0
		};
	}

	getScrollStartValue = (scrollTop, itemHeight) => {
		return Math.max(Math.floor(scrollTop / itemHeight) - 20, 0);
	}

	getScrollEndValue = (numItems, scrollTop, itemHeight, windowHeight) => {
		let scrollBottom = scrollTop + windowHeight;
		return Math.min(Math.ceil((scrollBottom / itemHeight) + 20), numItems);
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
		if(!this.props.items){
			return(<NotFound/>);
		}
		let start = this.getScrollStartValue(this.state.scroll, this.props.itemHeight);
		let end = this.getScrollEndValue(this.props.items.length, this.state.scroll, this.props.itemHeight, this.state.height);
		return(
			<div className='listContainer' onScroll={(e)=>{this.setState({scroll:e.target.scrollTop})}}>
				<div className='list'
					 style={{
						 height:(this.props.items.length*this.props.itemHeight),
						 paddingTop:(start*this.props.itemHeight)
					 }}
				>
					<List
						items={this.props.items}
						type={this.props.type}
						selectedItem={this.props.selectedItem}
						start={start}
						end={end}
						onClick={this.props.onClick}
						buttonClick={this.props.buttonClick}
					/>
				</div>
			</div>
		);
	}
}
