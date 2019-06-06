import React, { Component } from 'react';

import Options from '../../components/Options';
import './IssueView.css';

export default class IssueView extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			type: 0,
			title: '',
			message: ''
		};
	}

	render(){
		return(
			<div>
				<form>
					<select className='issueType' onChange={(e)=>{this.setState({type:e.target.options.selectedIndex})}}>
						<Options options={['Feature Request', 'Bug Report']}/>
					</select>
					<br/>
					<label>Title:</label>
					<input type='text' className='issueTitle' onChange={(e)=>{this.setState({title:e.target.value})}}/>
					<br/>
					<label>Description:</label>
					<textarea className='issueDescription' onChange={(e)=>{this.setState({message:e.target.value})}}/>
				</form>
			</div>
		);
	}
}
