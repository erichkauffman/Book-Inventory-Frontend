import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { commitNewInventory } from '../lib/ItemRoutes';
import './FormView.css';

export default class FormView extends Component{

	constructor(props){
		super(props);
		this.state = {
			item: {
				siteListed: [false, false],
			}
		}
	}

	onChange = (e) => {
		let item = this.state.item;
		item[e.target.name] = e.target.value;
		console.log(item);
		this.setState({
			item: item
		});
	}

	onChangeCheckbox = (e) => {
		let sites = this.state.item.siteListed;
		sites[e.target.value] = e.target.checked;
		let item = this.state.item;
		item.siteListed = sites;
		this.setState({
			item: item
		});
	}

	createRadioButtons = (labels, name) => {
		return labels.map((label, index) => {
			return(
				<label key={index}>{label}
					<input type='radio' name={name} value={index} onChange={this.onChange}/>
				</label>
			);
		});
	}

	createSitesButtons = () => {
		let sites = ['Amazon', 'EBay'];
		return sites.map((site, index) => {
			return(
				<label key={index}>{site}
					<input type='checkbox' name='siteListed' value={index} onChange={this.onChangeCheckbox}/>
				</label>
			);
		});
	}

	checkFields = () => {
		let fields = ['title', 'upc', 'year', 'description', 'condition', 'datePurchased',
					  'locationPurchased', 'consignment', 'amountPaid', 'sellPrice',
					  'shelfLocation'];
		if(this.props.type === 'book'){
			fields = fields.concat(['author', 'edition', 'printing', 'cover']);
		}
		let fieldsStatus = fields.reduce((status, field) => {
			return status && this.state.item[field];
		}, true);
		let sitesStatus = this.state.item.siteListed.reduce((status, site) => {
			return status || site;
		}, false);
		return fieldsStatus && sitesStatus;
	}

	handleSubmit = (e) => {
		let item = this.state.item;
		let sites = [];
		item.siteListed.forEach((element, index) => {
			if(element){
				sites.push(index);
			}
		});
		item.siteListed = sites;
		item.itemId = null;
		item.removalAction = null;
		item.dateRemoved = null;
		console.log(item);
		commitNewInventory(`${this.props.type}s`, item);
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
					<input type='text' name='datePurchased' onChange={this.onChange}/>
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
				<Link className={this.checkFields()?'submit':'submitDisabled'} to={`/list/${this.props.type}s`} onClick={this.handleSubmit}>
					<div className='submitDiv'>
						<p>Submit</p>
					</div>
				</Link>
			</div>
		);
	}
}
