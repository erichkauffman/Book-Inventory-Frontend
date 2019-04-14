import React, { Component } from 'react';

import Options from '../../components/Options';
import './IssueView.css';

export default class IssueView extends Component{
	render(){
		return(
			<div>
				<form>
					<select className='issueType'>
						<Options options={['Feature Request', 'Bug Report']}/>
					</select>
					<br/>
					<label>Title:</label>
					<input type='text' className='issueTitle'/>
					<br/>
					<label>Description:</label>
					<textarea className='issueDescription'/>
				</form>
			</div>
		);
	}
}
