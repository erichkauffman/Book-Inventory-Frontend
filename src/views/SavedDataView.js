import React, { Component } from 'react';
import { commitSavedData, deleteSavedData } from '../lib/ItemRoutes';
import deleteImg from '../images/DeleteButton.png';

import './SavedDataView.css';

export default class SavedDataView extends Component{
	constructor(props){
		super(props);
		const categories = props.categories;
		this.state = {
			categories: categories,
			current: categories[0]
		};
	}

	createOptions = () => {
		return this.state.categories.map((category) => {
			return(<option key={category} value={category}>{category}</option>);
		});
	}

	setCategory = (e) => {
		this.setState({
			current: e.target.value
		});
	}

	deleteData = (data) => {
		deleteSavedData(this.state.current, data);
	}

	displayInfo = () => {
		if(this.props.data[this.state.current]){
			return this.props.data[this.state.current].map((info) => {
				return(
					<div key={info} className='savedDataDiv'>
						<p>{info}</p>
						<img src={deleteImg} alt='delete' onClick={() => {this.deleteData(info)}}/>
					</div>
				);
			});
		}
	}

	addData = () => {
		let data = prompt(`Add ${this.state.current}`);
		if(data){
			commitSavedData(this.state.current, data);
		}
	}

	render(){
		return(
			<div>
				<select className='savedDataSelect' value={this.state.current} onChange={this.setCategory}>{this.createOptions()}</select>
				<button className='savedDataButton' onClick={this.addData}>Add {this.state.current}</button>
				{this.displayInfo()}
			</div>
		);
	}
}
