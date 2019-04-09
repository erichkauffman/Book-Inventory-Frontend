import React, { Component } from 'react';

import Options from '../../components/Options';
import { commitSavedData, deleteSavedData } from '../../lib/ItemRoutes';
import deleteImg from '../../images/DeleteButton.png';
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

	addData = (current) => {
		let data = prompt(`Add ${current}`);
		if(data){
			commitSavedData(current, data);
		}
	}

	render(){
		return(
			<div>
				<select className='savedDataSelect' value={this.state.current} onChange={this.setCategory}>
					<Options options={this.state.categories}/>
				</select>
				<button className='savedDataButton' onClick={() => {this.addData(this.state.current)}}>
					Add {this.state.current}
				</button>
				{this.displayInfo()}
			</div>
		);
	}
}
