import React, { Component, ChangeEvent } from 'react';

import DisplaySavedData from './components/DisplaySavedData';
import Options from '../../components/Options';
import { commitSavedData, deleteSavedData } from '../../lib/ItemRoutes';
import './SavedDataView.css';

type Props = {
	categories: string[],
	data: {[savedData: string]: string[]}
}

type State = {
	categories: string[],
	current: string
}

export default class SavedDataView extends Component<Props,State>{
	constructor(props: Props){
		super(props);
		const categories = props.categories;
		this.state = {
			categories: categories,
			current: categories[0]
		};
	}

	setCategory = (e: ChangeEvent<HTMLSelectElement>): void => {
		this.setState({
			current: e.target.value
		});
	}

	addData = (current: string): void => {
		let data = prompt(`Add ${current}`);
		if(data){
			commitSavedData(current, data);
		}
	}

	deleteData = (info: string): void => {
		deleteSavedData(this.state.current, info);
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
				<DisplaySavedData
					data={this.props.data[this.state.current]}
					deleteData={this.deleteData}
				/>
			</div>
		);
	}
}
