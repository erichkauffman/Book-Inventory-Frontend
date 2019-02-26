import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { commitNewInventory, getItemById, updateInventory } from '../lib/ItemRoutes';
import './FormView.css';

const itemFields = ['title', 'upc', 'year', 'description', 'condition', 'datePurchased',
				'locationPurchased', 'consignment', 'amountPaid', 'sellPrice',
				'shelfLocation'];
const bookFields = ['author', 'edition', 'printing', 'cover'];
const sites = ['Amazon', 'EBay'];

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
					<input type='radio' name={name} value={index} onChange={this.onChange} checked={this.state.item[name]==index}/>
				</label>
			);
		});
	}

	createSitesButtons = () => {
		return sites.map((site, index) => {
			return(
				<label key={index}>{site}
					<input type='checkbox' name='siteListed' value={index} onChange={this.onChangeCheckbox} checked={this.state.item.siteListed[index]}/>
				</label>
			);
		});
	}

	checkFields = () => {
		console.log(this.state);
		let fields = itemFields;
		if(this.props.type === 'book'){
			fields = fields.concat(bookFields);
		}
		let fieldsStatus = fields.reduce((status, field) => {
			return status && (this.state.item[field] || this.state.item[field] === 0);
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
		if(!this.props.id){
			item.itemId = null;
		}
		item.removalAction = null;
		item.dateRemoved = null;
		item.amountPaid = item.amountPaid * 100;
		item.sellPrice = item.sellPrice * 100;
		let promise;
		if(this.props.id){
			promise = updateInventory(`${this.props.type}s`, item);
		}else{
			promise = commitNewInventory(`${this.props.type}s`, item);
		}
		promise.then(() => {
			this.setState({
				finish: true
			});
		});
	}

	renderBookFields = () => {
		if(this.props.type === 'book'){
			return(
				<div>
					<label>Author:</label>
					<input type='text' name='author' value={this.state.item.author} onChange={this.onChange}/>
					<br/>
					<label>Edition:</label>
					<input type='number' name='edition' value={this.state.item.edition} onChange={this.onChange}/>
					<br/>
					<label>Printing:</label>
					<input type='number' name='printing' value={this.state.item.printing} onChange={this.onChange}/>
					<br/>
					<p>Cover:</p>
					{this.createRadioButtons(['Hard', 'Soft'], 'cover')}
				</div>
			);
		}
	}

	componentDidMount(){
		if(this.props.id){
			let itemPromise = getItemById(this.props.id, `${this.props.type}s`);
			itemPromise.then((res) => {
				if(res.item){
					let item = {...res, ...res.item};
					delete item.item;
					console.log(item);
					return item;
				}
				console.log(res);
				return res;
			})
			.then((recItem) => {
				let item = recItem;
				item.sellPrice = item.sellPrice / 100;
				item.amountPaid = item.amountPaid / 100;
				let sitesListed = Array(sites.length).fill(false);
				item.siteListed.forEach((siteVal) => {
					sitesListed[siteVal] = true;
				});
				item.siteListed = sitesListed;
				this.setState({item: item});
			});
		}
	}

	render(){
		if(this.state.finish){
			return(<Redirect to={`/list/${this.props.type}`}/>);
		}
		return(
			<div>
				<input type='text'/>
				<form>
					<label>Title:</label>
					<input type='text' name='title' value={this.state.item.title} onChange={this.onChange}/>
					<br/>
					{this.renderBookFields()}
					<label>{this.props.type==='book'?'ISBN':'UPC'}:</label>
					<input type='text' name='upc' value={this.state.item.upc} onChange={this.onChange}/>
					<br/>
					<label>Year:</label>
					<input type='number' name='year' value={this.state.item.year} onChange={this.onChange}/>
					<br/>
					<label>Description:</label>
					<textarea name='description' value={this.state.item.description} onChange={this.onChange}/>
					<br/>
					<p>Condition:</p>
					{this.createRadioButtons(['New', 'Like New', 'Very Good', 'Good', 'Acceptable'], 'condition')}
					<br/>
					<label>Date Purchased:</label>
					<input type='text' name='datePurchased' value={this.state.item.datePurchased} onChange={this.onChange}/>
					<br/>
					<label>Location Purchased:</label>
					<input type='text' name='locationPurchased' value={this.state.item.locationPurchased} onChange={this.onChange}/>
					<br/>
					<p>Consignment:</p>
					{this.createRadioButtons(['no', 'yes'], 'consignment')}
					<br/>
					<label>Amount Paid:</label>
					<input type='number' step='0.01' name='amountPaid' value={this.state.item.amountPaid} onChange={this.onChange}/>
					<br/>
					<label>Sell Price:</label>
					<input type='number' step='0.01' name='sellPrice' value={this.state.item.sellPrice} onChange={this.onChange}/>
					<br/>
					<p>Site Listed:</p>
					{this.createSitesButtons()}
					<br/>
					<label>Shelf Location:</label>
					<input type='text' name='shelfLocation' value={this.state.item.shelfLocation} onChange={this.onChange}/>
				</form>
				<Link className='cancelLink' to={`/list/${this.props.type}`}>
					<div className='cancel'>
						<p>Cancel</p>
					</div>
				</Link>
				<div className={this.checkFields()?'submit':'submitDisabled'} onClick={this.handleSubmit}>
					<p>Submit</p>
				</div>
			</div>
		);
	}
}
