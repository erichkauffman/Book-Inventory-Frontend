import React, { Component } from 'react';
import './FormView.css';

export default class FormView extends Component{

	constructor(props){
		super(props);
		this.state = {
			siteListed: [false, false],
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onChangeCheckbox = (e) => {
		let sites = this.state.siteListed;
		sites[e.target.value] = e.target.checked;
		this.setState({
			siteListed: sites,
		});
	}

	createRadioButtons = (labels, name) => {
		return labels.map((label, index) => {
			return(
				<label>{label}
					<input type='radio' key={index} name={name} value={index} onChange={this.onChange}/>
				</label>
			);
		});
	}

	createSitesButtons = () => {
		let sites = ['Amazon', 'EBay'];
		return sites.map((site, index) => {
			return(
				<label>{site}
					<input type='checkbox' key={index} name='siteListed' value={index} onChange={this.onChangeCheckbox}/>
				</label>
			);
		});
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
					{this.createRadioButtons(['Hard', 'Soft'], 'cover')}
				</div>
			);
		}
	}

	createRadioButtons = (labels, name) => {
		return labels.map((label, index) => {
			return(
				<label>{label}
					<input type='radio' key={index} name={name} value={index} onChange={this.onChange}/>
				</label>
			);
		});
	}

	createSitesButtons = () => {
		let sites = ['Amazon', 'EBay'];
		return sites.map((site, index) => {
			return(
				<label>{site}
					<input type='checkbox' key={index} name='siteListed' value={index} onChange={this.onChangeCheckbox}/>
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
					{this.createRadioButtons(['New', 'Like New', 'Very Good', 'Good', 'Acceptable'], 'condition')}
					<br/>
					<label>Date Purchased:</label>
					<input type='number' name='datePurchased' onChange={this.onChange}/>
					<br/>
					<label>Location Purchased:</label>
					<input type='text' name='locationPurchased' onChange={this.onChange}/>
					<br/>
					<p>Consignment:</p>
					{this.createRadioButtons(['yes', 'no'], 'consignment')}
					<br/>
					<label>Amount Paid:</label>
					<input type='number' name='amountPaid' onChange={this.onChange}/>
					<br/>
					<label>Sell Price:</label>
					<input type='number' name='sellPrice' onChange={this.onChange}/>
					<br/>
					<p>Site Listed:</p>
					{this.createSitesButtons()}
					<br/>
					<label>Shelf Location:</label>
					<input type='text' name='shelfLocation' onChange={this.onChange}/>
				</form>
			</div>
		);
	}
}
