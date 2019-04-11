import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import BookSearch from './components/BookSearch';
import RadioButtons from './components/RadioButtons';
import CheckBoxes from './components/CheckBoxes';
import Options from '../../components/Options';
import Conditional from '../../components/Conditional';
import { commitNewInventory, getItemById, updateInventory,
		 searchBookByIsbn, commitSavedData } from '../../lib/ItemRoutes';
import { checkFields } from './lib/checkFields';
import { keyPress } from './lib/keyPress';
import { trueIndecies } from './lib/trueIndecies';
import './FormView.css';

const sites = ['Amazon', 'EBay'];

export default class FormView extends Component{

	constructor(props){
		super(props);
		let item = {};
		let itemFields = ['title', 'upc', 'year', 'description', 'condition', 'datePurchased',
				'locationPurchased', 'consignment', 'amountPaid', 'sellPrice',
				'shelfLocation'];
		if(props.type === 'book'){
			itemFields = itemFields.concat(['author', 'edition', 'printing', 'cover']);
		}
		itemFields.forEach((field) => {
			item[field] = '';
		});
		let today = moment();
		item.datePurchased = today;
		item.consignment = 0;
		item.siteListed = [true, false];
		this.state = {
			today: today,
			item: item,
			search: '',
			fields: itemFields
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

	handleSubmit = (item, type, mode) => {
		item.siteListed = trueIndecies(item.siteListed);
		if(mode !== 'edit'){
			item.itemId = null;
		}
		item.removalAction = null;
		item.siteSold = null;
		item.dateRemoved = null;
		item.amountPaid = item.amountPaid * 100;
		item.sellPrice = item.sellPrice * 100;
		item.datePurchased = item.datePurchased.format('YYYY-MM-DD');
		if(mode === 'edit'){
			updateInventory(`${type}s`, item);
		}else{
			commitNewInventory(`${type}s`, item);
		}
	}

	submitAndContinue = () => {
		this.handleSubmit({...this.state.item}, this.props.type, this.props.mode);
		this.resetFields();
	}

	submitAndFinish = () => {
		this.handleSubmit({...this.state.item}, this.props.type, this.props.mode);
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

	newSavedData = (dataType) => {
		let data = prompt(`Add ${dataType}`);
		if(data){
			commitSavedData(dataType, data);
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
			this.state.fields.forEach((field) => {
				item[field] = '';
			});
			item.datePurchased = this.state.today;
			item.consignment = 0;
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
					<RadioButtons name='cover'
								  labels={['Hard', 'Soft']}
								  onChange={this.onChange}
								  checkedValue={this.state.item.cover}/>
					<br/>
				</div>
			);
		}
	}

	renderSaveAndNew = () => {
		if(this.props.mode !== 'edit'){
			return(
				<div className={checkFields(this.state.item, this.state.fields)?'submit':'submitDisabled'} onClick={this.submitAndContinue}>
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
				<Conditional render={this.props.type==='book'&&!this.props.id}>
					<BookSearch value={this.state.search}
								onChange={(e)=>{this.setState({search:e.target.value})}}
								onKeyPress={(e)=>{keyPress(e, 13, this.bookSearch)}}
								onClick={this.bookSearch}
					/>
				</Conditional>
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
					<select value='' onChange={this.selectPhrase}>
						<Conditional render={this.props.phrases}>
							<Options options={this.props.phrases} placeholder={true}/>
						</Conditional>
					</select>
					<button type='button' onClick={(e)=>{this.newSavedData('phrases')}}>Add Phrase</button>
					<p>Condition:</p>
					<RadioButtons name='condition'
								  labels={['New', 'Like New', 'Very Good', 'Good', 'Acceptable']}
								  onChange={this.onChange}
								  checkedValue={this.state.item.condition}/>
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
					<datalist id='locations'>
						<Conditional render={this.props.locations}>
							<Options options={this.props.locations}/>
						</Conditional>
					</datalist>
					<button type='button' onClick={(e)=>{this.newSavedData('locations')}}>Add location</button>
					<br/>
					<p>Consignment:</p>
					<RadioButtons name='consignment'
								  labels={['no', 'yes']}
								  onChange={this.onChange}
								  checkedValue={this.state.item.consignment}/>
					<br/>
					<label>Amount Paid:</label>
					<input type='number' step='0.01' name='amountPaid' value={this.state.item.amountPaid} onChange={this.onChange}/>
					<br/>
					<label>Sell Price:</label>
					<input type='number' step='0.01' name='sellPrice' value={this.state.item.sellPrice} onChange={this.onChange}/>
					<br/>
					<p>Site Listed:</p>
					<CheckBoxes name='siteListed'
								labels={sites}
								onChange={this.onChangeCheckbox}
								checkedValues={this.state.item.siteListed}
					/>
					<br/>
					<label>Shelf Location:</label>
					<input type='text' list='shelves' name='shelfLocation' value={this.state.item.shelfLocation} onChange={this.onChange}/>
					<datalist id='shelves'>
						<Conditional render={this.props.shelves}>
							<Options options={this.props.shelves}/>
						</Conditional>
					</datalist>
					<button type='button' onClick={(e)=>{this.newSavedData('shelves')}}>Add Shelf</button>
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
					<div className={checkFields(this.state.item, this.state.fields)?'submit':'submitDisabled'} onClick={this.submitAndFinish}>
						<p>Save</p>
					</div>
					{this.renderSaveAndNew()}
				</div>
			</div>
		);
	}
}
