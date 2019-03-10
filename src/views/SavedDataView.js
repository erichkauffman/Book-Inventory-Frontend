import React, { Component } from 'react';
import { commitPhrase, getPhrases, commitLocation, getLocations} from '../lib/ItemRoutes';

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

	displayInfo = () => {
		if(this.state[this.state.current]){
			return this.state[this.state.current].map((info) => {
				return(
					<div key={info}>
						<p>{info}</p>
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
			let dataList = this.state[this.state.current];
			dataList.push(data);
			this.setState({
				[this.state.current]: dataList
			});
		}
	}

	componentWillMount(){
		let locationPromise = getLocations();
		let phrasePromise = getPhrases();
		locationPromise.then((locations) => {
			this.setState({
				locations: locations
			});
		});
		phrasePromise.then((phrases) => {
			this.setState({
				phrases: phrases
			});
		});
	}

	render(){
		return(
			<div>
				<select value={this.state.current} onChange={this.setCategory}>{this.createOptions()}</select>
				<button onClick={this.addData}>Add {this.state.current}</button>
				{this.displayInfo()}
			</div>
		);
	}
}
