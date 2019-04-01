import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import { commitNewInventory, getItemById, updateInventory,
		 searchBookByIsbn, commitSavedData } from '../lib/ItemRoutes';
import './FormView.css';

const itemFields = ['title', 'upc', 'year', 'description', 'condition', 'datePurchased',
				'locationPurchased', 'consignment', 'amountPaid', 'sellPrice',
				'shelfLocation'];
const bookFields = ['author', 'edition', 'printing', 'cover'];
const sites = ['Amazon', 'EBay'];

export default class FormView extends Component{

	constructor(props){
		super(props);
		let today = moment();
		let item = {};
		itemFields.forEach((field) => {
			item[field] = '';
		});
		if(props.type === 'book'){
			bookFields.forEach((field) => {
				item[field] = '';
			})
		}
		item.datePurchased = today;
		item.siteListed = [true, false];
		this.state = {
			today: today,
			item: item,
			search: ''
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

	dateChange = (value) => {
		let item = this.state.item;
		item.datePurchased = value;
		this.setState({
			item: item
		});
	}

	createRadioButtons = (labels, name) => {
		return labels.map((label, index) => {
			return(
				<label key={index}>{label}
					<input type='radio' name={name} value={index} onChange={this.onChange} checked={parseInt(this.state.item[name])===index}/>
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

	createOptions = (options, placeholder=false) => {
		let ops = options.map((option) => {
			return <option key={option} value={option}>{option}</option>
		});
		if(placeholder){
			ops.push(<option key='empty' value='' disabled>Select</option>);
		}
		return ops;
	}

	checkFields = () => {
		let fields = itemFields;
		if(this.props.type === 'book'){
			fields = fields.concat(bookFields);
		}
		return fields.reduce((status, field) => {
			return status && (this.state.item[field] || this.state.item[field] === 0);
		}, true);
	}

	handleSubmit = () => {
		let item = {...this.state.item};
		let sites = [];
		item.siteListed.forEach((element, index) => {
			if(element){
				sites.push(index);
			}
		});
		item.siteListed = sites;
		if(this.props.mode !== 'edit'){
			item.itemId = null;
		}
		item.removalAction = null;
		item.dateRemoved = null;
		item.amountPaid = item.amountPaid * 100;
		item.sellPrice = item.sellPrice * 100;
		item.datePurchased = item.datePurchased.format('YYYY-MM-DD');
		if(this.props.mode === 'edit'){
			updateInventory(`${this.props.type}s`, item);
		}else{
			commitNewInventory(`${this.props.type}s`, item);
		}
	}

	submitAndContinue = () => {
		this.handleSubmit();
		this.resetFields();
	}

	submitAndFinish = () => {
		this.handleSubmit();
		this.setState({
			finish: true
		});

	}

	getInventoryItem = () => {
		let itemPromise = getItemById(this.props.id, `${this.props.type}s`);
		itemPromise.then((res) => {
			if(res.item){
				let item = {...res, ...res.item};
				delete item.item;
				return item;
			}
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
			item.datePurchased = moment(item.datePurchased, 'YYYY-MM-DD');
			this.setState({item: item});
		});
	}

	bookSearch = () => {
		let searchPromise = searchBookByIsbn(this.state.search);
		let item = this.state.item;
		item.upc = this.state.search;
		this.setState({item:item});
		searchPromise.then((res) => {
			if(res.totalItems){
				let book = res.items[0].volumeInfo;
				let item = this.state.item;
				item.title = book.title;
				item.author = book.authors.join(', ');
				item.year = book.publishedDate.substring(0, 4);
				this.setState({item:item});
			}
		});
	}

	enterPress = (e) => {
		let keyCode = e.keyCode || e.which;
		if(keyCode === 13){
			this.bookSearch(e);
		}
	}

	newLocation = () => {
		let location = prompt('Add location');
		if(location){
			commitSavedData('locations', location);
		}
	}

	newPhrase = () => {
		let phrase = prompt('Add phrase');
		if(phrase){
			commitSavedData('phrases', phrase);
		}
	}

	selectPhrase = (e) => {
		let selectString = this.state.item.description;
		if(this.state.item.description){
			selectString = `${selectString}, `;
		}
		selectString = `${selectString}${e.target.value}`;
		let item = this.state.item;
		item.description = selectString;
		this.setState({item:item});
	}

	resetFields = () => {
		if(this.props.id){
			this.getInventoryItem();
		}else{
			let item = {};
			itemFields.forEach((field) => {
				item[field] = '';
			});
			if(this.props.type === 'book'){
				bookFields.forEach((field) => {
					item[field] = '';
				})
			}
			item.datePurchased = this.state.today;
			item.siteListed = [true, false];
			this.setState({item: item, search:''});
		}
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

	renderSearchOption = () => {
		if(this.props.type === 'book' && !this.props.id){
			return(
				<div className='search'>
					<input type='text'
						   placeholder='Enter ISBN'
						   value={this.state.search}
						   onChange={(e)=>{this.setState({search:e.target.value})}}
						   onKeyPress={this.enterPress}/>
					<button type='button' onClick={this.bookSearch}>Search</button>
				</div>);
		}
	}

	renderSaveAndNew = () => {
		if(this.props.mode !== 'edit'){
			return(
				<div className={this.checkFields()?'submit':'submitDisabled'} onClick={this.submitAndContinue}>
					<p>Save and new {this.props.type}</p>
				</div>
			);
		}
	}

	componentDidMount(){
		if(this.props.id){
			this.getInventoryItem();
		}
	}

	render(){
		if(this.state.finish){
			return(<Redirect to={`/list/${this.props.type}`}/>);
		}
		return(
			<div>
				{this.renderSearchOption()}
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
					<select value='' onChange={this.selectPhrase}>{this.createOptions(this.props.phrases, true)}</select>
					<button type='button' onClick={this.newPhrase}>Add Phrase</button>
					<p>Condition:</p>
					{this.createRadioButtons(['New', 'Like New', 'Very Good', 'Good', 'Acceptable'], 'condition')}
					<br/>
					<label>Date Purchased:</label>
					<SingleDatePicker date={this.state.item.datePurchased}
									  onDateChange={(date) => {this.dateChange(date)}}
									  focused={this.state.focused}
									  onFocusChange={(focus) => {this.setState({focused:focus.focused})}}
									  id='datePurchased'
									  transitionDuration={0}
									  numberOfMonths={1}
									  isOutsideRange={(day) => {return this.state.today.diff(day) <= 0}}
									  />
					<br/>
					<label>Location Purchased:</label>
					<input type='text' list='locations' name='locationPurchased' value={this.state.item.locationPurchased} onChange={this.onChange}/>
					<datalist id='locations'>{this.createOptions(this.props.locations)}</datalist>
					<button type='button' onClick={this.newLocation}>Add location</button>
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
				<div className='buttonHolder'>
					<Link className='cancelLink' to={`/list/${this.props.type}`}>
						<div className='divButton'>
							<p>Cancel</p>
						</div>
					</Link>
					<div className='divButton' onClick={this.resetFields}>
						<p>{this.props.id?'Reset':'Clear'}</p>
					</div>
					<div className={this.checkFields()?'submit':'submitDisabled'} onClick={this.submitAndFinish}>
						<p>Save</p>
					</div>
					{this.renderSaveAndNew()}
				</div>
			</div>
		);
	}
}
