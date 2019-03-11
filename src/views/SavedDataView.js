import React, { Component } from 'react';
import { commitPhrase, deletePhrase, commitLocation, deleteLocation } from '../lib/ItemRoutes';
import deleteImg from '../images/DeleteButton.png';

import './SavedDataView.css';

export default class SavedDataView extends Component{
	constructor(props){
		super(props);
		const categories = ['phrases', 'locations'];
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
		if(this.state.current === 'phrases'){
			deletePhrase(data);
		}else if(this.state.current === 'locations'){
			deleteLocation(data);
		}
		this.props.deleteData(data, this.state.current);
	}

	displayInfo = () => {
		if(this.props[this.state.current]){
			return this.props[this.state.current].map((info) => {
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
			if(this.state.current === 'phrases'){
				commitPhrase(data);
			}else if(this.state.current === 'locations'){
				commitLocation(data);
			}
			this.props.saveData(data, this.state.current);
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
