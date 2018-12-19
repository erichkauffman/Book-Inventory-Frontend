import React, { Component } from 'react';
import './FormView.css';

export default class FormView extends Component{

	createConditionButtons = () => {
		let conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
		return conditions.map((condition, index) => {
			return(
				<label>{condition}
					<input type='radio' key={index} name='condition' value={index} onChange={console.log('dur')}/>
				</label>
			);
		});
	}

	createSitesButtons = () => {
		let sites = ['Amazon', 'EBay'];
		return sites.map((site, index) => {
			return(
				<label>{site}
					<input type='radio' key={index} name='site' value={index} onChange={console.log('hur')}/>
				</label>
			);
		});
	}

	render(){
		return(
			<div>
				<input type='text'/>
				<form>
					<label>Title</label>
					<input type='text'/>
					<br/>
					<label>UPC:</label>
					<input type='text'/>
					<br/>
					<label>Year:</label>
					<input type='number'/>
					<br/>
					<label>Description:</label>
					<textarea/>
					<br/>
					<p>Condition:</p>
					{this.createConditionButtons()}
					<br/>
					<label>Date Purchased:</label>
					<input type='number'/>
					<br/>
					<label>Location Purchased:</label>
					<input type='text'/>
					<br/>
					<label>Amount Paid:</label>
					<input type='number'/>
					<br/>
					<label>Sell Price:</label>
					<input type='number'/>
					<br/>
					<p>Site Listed:</p>
					{this.createSitesButtons()}
				</form>
			</div>
		);
	}
}
