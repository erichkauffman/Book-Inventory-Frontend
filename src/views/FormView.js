import React, { Component } from 'react';
import './FormView.css';

export default class FormView extends Component{

	onChange = (e) => {
		console.log(e.target.value);
	}

	renderBookFields = () => {
		if(this.props.type === 'book'){
			return(
				<div>
					<label>Author:</label>
					<input type='text' name='author' onChange={this.onChange}/>
					<br/>
					<label>Edition:</label>
					<input type='number' name='edition' onChange={this.onChange}/>
					<br/>
					<label>Printing:</label>
					<input type='number' name='printing' onChange={this.onChange}/>
					<br/>
					<p>Cover:</p>
					<label>Hard</label>
					<input type='radio' name='cover' value={0} onChange={this.onChange}/>
					<label>Soft</label>
					<input type='radio' name='cover' value={1} onChange={this.onChange}/>
				</div>
			);
		}
	}

	createConditionButtons = () => {
		let conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
		return conditions.map((condition, index) => {
			return(
				<label>{condition}
					<input type='radio' key={index} name='condition' value={index} onChange={this.onChange}/>
				</label>
			);
		});
	}

	createSitesButtons = () => {
		let sites = ['Amazon', 'EBay'];
		return sites.map((site, index) => {
			return(
				<label>{site}
					<input type='checkbox' key={index} name='site' value={index} onChange={this.onChange}/>
				</label>
			);
		});
	}

	render(){
		return(
			<div>
				<input type='text'/>
				<form>
					<label>Title:</label>
					<input type='text' name='title' onChange={this.onChange}/>
					<br/>
					{this.renderBookFields()}
					<label>{this.props.type==='book'?'ISBN':'UPC'}:</label>
					<input type='text' name='upc' onChange={this.onChange}/>
					<br/>
					<label>Year:</label>
					<input type='number' name='year' onChange={this.onChange}/>
					<br/>
					<label>Description:</label>
					<textarea name='description' onChange={this.onChange}/>
					<br/>
					<p>Condition:</p>
					{this.createConditionButtons()}
					<br/>
					<label>Date Purchased:</label>
					<input type='number' name='datePurchased' onChange={this.onChange}/>
					<br/>
					<label>Location Purchased:</label>
					<input type='text' name='locationPurchased' onChange={this.onChange}/>
					<br/>
					<label>Amount Paid:</label>
					<input type='number' name='amountPaid' onChange={this.onChange}/>
					<br/>
					<label>Sell Price:</label>
					<input type='number' name='sellPrice' onChange={this.onChange}/>
					<br/>
					<p>Site Listed:</p>
					{this.createSitesButtons()}
				</form>
			</div>
		);
	}
}
