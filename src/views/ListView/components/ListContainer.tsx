import React, { Component } from 'react';

import List from './List';
import NotFound from '../../../components/NotFound';
import './ListContainer.css';
import { IBasicItem } from '../../../data/types';

type Props = {
	items: IBasicItem[],
	type: string,
	buttonClick: (...args: any) => void,
	onClick: (...args: any) => void,
	selectedItem: number | null,
	itemHeight: number
}

type State = {
	scroll: number,
	height: number
}

export default class ListContainer extends Component<Props, State>{
	constructor(props: Props){
		super(props);
		this.state = {
			scroll: 0,
			height: 0
		};
	}

	getScrollStartValue = (scrollTop: number, itemHeight: number): number => {
		return Math.max(Math.floor(scrollTop / itemHeight) - 20, 0);
	}

	getScrollEndValue = (numItems: number, scrollTop: number, itemHeight: number, windowHeight: number): number => {
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
		const start = this.getScrollStartValue(this.state.scroll, this.props.itemHeight);
		const end = this.getScrollEndValue(this.props.items.length, this.state.scroll, this.props.itemHeight, this.state.height);
		const height = this.props.items.length * this.props.itemHeight;
		return(
			<div className='listContainer' onScroll={(e)=>{this.setState({scroll:(e.target as HTMLElement).scrollTop})}}>
				<div className='list'
					 style={{
						 height:height,
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
