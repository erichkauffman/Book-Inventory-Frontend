import React, { Component } from 'react';

import DisplaySavedData from './components/DisplaySavedData';
import Options from '../../components/Options';
import Conditonal from '../../components/Conditional';
import { commitSavedData, deleteSavedData } from '../../lib/ItemRoutes';
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
				<Conditonal render={this.props.data[this.state.current]}>
					<DisplaySavedData
						data={this.props.data}
						type={this.state.current}
						deleteData={deleteSavedData}
					/>
				</Conditonal>

			</div>
		);
	}
}
