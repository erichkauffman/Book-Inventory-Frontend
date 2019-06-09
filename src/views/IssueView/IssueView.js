import React, { Component } from 'react';

import Options from '../../components/Options';
import { checkFields } from '../../lib/checkFields';
import { sendIssue } from '../../lib/ItemRoutes';
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

	handleSubmit = () => {
		sendIssue({type: this.state.type, title: this.state.title, message: this.state.message});
		this.setState({endScreen: true});
	}

	render(){
		if(this.state.endScreen){
			return(
				<div>
					<p>Thank you for sending your issue. We will look into it shortly.</p>
					<div className='newIssue' onClick={()=>{this.setState({type:0, title:'', message:'', endScreen:false})}}>
						<p>New Issue</p>
					</div>
				</div>
			);
		}else{
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
					<div className={checkFields(this.state, ['title', 'message'])?'submitIssue':'issueDisabled'} onClick={this.handleSubmit}>
						<p>Submit</p>
					</div>
				</div>
			);
		}
	}
}
