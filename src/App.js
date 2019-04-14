import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import ListView from './views/ListView/ListView';
import FormView from './views/FormView/FormView';
import SavedDataView from './views/SavedDataView/SavedDataView';
import Header from './components/Header';
import NotFound from './components/NotFound';
import EnvironmentWarning from './components/EnvironmentWarning';
import Error from './components/Error';
import { getSellableInventory, getSavedData } from './lib/ItemRoutes';
import { filterOutId, filterOutExactData } from './lib/filters';
import { apiPath } from './config';

import './App.css';

const savedDataCategories = ['phrases', 'locations', 'shelves'];

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			items: [],
			books: [],
			socket: io.connect(apiPath)
		}
	}

	setStatePromise = (key, promise) => {
		promise.then((data) => {
			this.setState({[key]:data});
		});
	}

	removeItem = (itemId, type='books') => {
		let items = filterOutId(itemId, this.state[type]);
		this.setState({
			[type]: items
		});
		if(type === 'books'){
			this.removeItem(itemId, 'items');
		}
	}

	updateItem = (dataObject, type) => {
		this.removeItem(dataObject.itemId);
		this.saveData(dataObject, type);
	}

	saveData = (dataObject, type) => {
		let data = this.state[type];
		if(type === 'items' || type === 'books'){
			data.splice(data.findIndex((element)=>{return element.itemId > dataObject.itemId}), 0, dataObject);
		}else{
			data.push(dataObject);
		}
		this.setState({[type]:data});
		if(type === 'books'){
			let itemObject = {...dataObject};
			delete itemObject.author;
			this.saveData(itemObject, 'items');
		}
	}

	deleteData = (dataString, type) => {
		let data = filterOutExactData(dataString, this.state[type]);
		this.setState({[type]:data});
	}

	gatherData = (dataTypeList) => {
		let data = {};
		dataTypeList.forEach((dataType) => {
			data[dataType] = this.state[dataType];
		});
		return data;
	}

	setSocketConnections = () => {
		let socket = this.state.socket;
		socket.on('new_item', (item)=>{(this.saveData(JSON.parse(item), 'items'))});
		socket.on('new_book', (book)=>{(this.saveData(JSON.parse(book), 'books'))});
		socket.on('delete_item', (itemId)=>{this.removeItem(parseInt(itemId))});
		socket.on('update_item', (item)=>{this.updateItem(JSON.parse(item), 'items')})
		socket.on('update_book', (book)=>{this.updateItem(JSON.parse(book), 'books')})
		socket.on('new_data', (jsonData) => {
			let data = JSON.parse(jsonData);
			this.saveData(data.data, data.type);
		});
		socket.on('delete_data', (jsonData) => {
			let data = JSON.parse(jsonData);
			this.deleteData(data.data, data.type);
		});
		socket.on('connect', ()=>{this.setState({connectionError: false})});
		socket.on('connect_error', ()=>{this.setState({connectionError: true})});
		this.setState({socket:socket});
	}

	componentDidMount(){
		let itemPromise = getSellableInventory('items');
		let bookPromise = getSellableInventory('books');
		savedDataCategories.forEach((dataType) => {
			let dataPromise = getSavedData(dataType);
			this.setStatePromise(dataType, dataPromise);
		});
		this.setStatePromise('books', bookPromise);
		this.setStatePromise('items', itemPromise);
		this.setSocketConnections();
	}

	render() {
		return (
			<div className="App">
				<EnvironmentWarning envType={process.env.REACT_APP_ENV}/>
				<Route path='/:view/:type'
					   render={({match}) => {
							return <Header view={match.params.view} type={match.params.type}/>
					   }}/>
				<Route exact path='/:view'
					   render={({match}) => {
							return <Header view={match.params.view}/>
					   }}/>
				<Error err={this.state.connectionError}>No connection to server! Changes cannot be saved!</Error>
				<Switch>
					<Redirect exact from='/' to='/list/items'/>
					<Redirect from='/list/item' to='/list/items'/>
					<Redirect from='/list/book' to='/list/books'/>
					<Route path='/list/:type'
					       render={({match}) => {
							   return <ListView key={match.params.type}
							   					type={match.params.type}
							   					items={this.state[match.params.type]}/>
						   }} />

					<Redirect from='/form/items/:mode/:id' to='/form/item/:mode/:id'/>
					<Redirect from='/form/books/:mode/:id' to='/form/book/:mode/:id'/>
					<Route path='/form/:type/:mode/:id'
						   render={({match}) => {
							   return <FormView key={match.params.type}
							   					type={match.params.type}
												mode={match.params.mode}
												id={match.params.id}
												phrases={this.state.phrases}
												locations={this.state.locations}
												shelves={this.state.shelves}
												/>
						   }}/>

					<Redirect from='/form/items' to='/form/item'/>
					<Redirect from='/form/books' to='/form/book'/>
					<Route path='/form/:type/'
						   render={({match}) => {
							   return <FormView key={match.params.type}
												type={match.params.type}
												phrases={this.state.phrases}
												locations={this.state.locations}
												shelves={this.state.shelves}
							   />
						   }}/>
					<Route path='/data/'
						   render={()=>{
							   return <SavedDataView categories={savedDataCategories}
													 data={this.gatherData(savedDataCategories)}
									  />
						   }}/>
					<Route component={NotFound}/>
				</Switch>
	   		</div>
    );
  }
}
