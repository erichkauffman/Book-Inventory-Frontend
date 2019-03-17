import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import ListView from './views/ListView';
import FormView from './views/FormView';
import SavedDataView from './views/SavedDataView';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { getSellableInventory, getLocations, getPhrases } from './lib/ItemRoutes';
import { apiPath } from './config';

import './App.css';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			items: [],
			books: [],
			locations: [],
			phrases: [],
			socket: io.connect(apiPath)
		}
	}

	setStatePromise = (key, promise) => {
		promise.then((data) => {
			this.setState({[key]:data});
		});
	}

	removeItem = (itemId, type='books') => {
		let items = this.state[type].filter((item) => {
			return item.itemId !== itemId;
		});
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
		data.push(dataObject);
		this.setState({[type]:data});
		if(type === 'books'){
			let itemObject = {...dataObject};
			delete itemObject.author;
			this.saveData(itemObject, 'items');
		}
	}

	deleteData = (dataString, type) => {
		let data = this.state[type].filter((data) => {
			return dataString !== data;
		});
		this.setState({[type]:data});
	}

	connectionError = () => {
		if(this.state.connectionError){
			return(<h3 className='serverError'>Oh no! No connection to server! Changes cannot be saved!</h3>)
		}
	}

	setSocketConnections = () => {
		let socket = this.state.socket;
		socket.on('new_item', (item)=>{(this.saveData(JSON.parse(item), 'items'))});
		socket.on('new_book', (book)=>{(this.saveData(JSON.parse(book), 'books'))});
		socket.on('delete_item', (itemId)=>{this.removeItem(parseInt(itemId))});
		socket.on('update_item', (item)=>{this.updateItem(JSON.parse(item), 'items')})
		socket.on('update_book', (book)=>{this.updateItem(JSON.parse(book), 'books')})
		socket.on('new_location', (location)=>{(this.saveData(location, 'locations'))});
		socket.on('new_phrase', (phrase)=>{(this.saveData(phrase, 'phrases'))});
		socket.on('delete_location', (location)=>{this.deleteData(location, 'locations')});
		socket.on('delete_phrase', (phrase)=>{(this.deleteData(phrase, 'phrases'))});
		socket.on('connect', ()=>{this.setState({connectionError: false})});
		socket.on('connect_error', ()=>{this.setState({connectionError: true})});
		this.setState({socket:socket});
	}

	componentDidMount(){
		let itemPromise = getSellableInventory('items');
		let bookPromise = getSellableInventory('books');
		let locationPromise = getLocations();
		let phrasePromise  = getPhrases();
		this.setStatePromise('locations', locationPromise);
		this.setStatePromise('phrases', phrasePromise);
		this.setStatePromise('books', bookPromise);
		this.setStatePromise('items', itemPromise);
		this.setSocketConnections();
	}

	render() {
		return (
			<div className="App">
				<Header/>
				{this.connectionError()}
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
							   />
						   }}/>
					<Route path='/data/'
						   render={()=>{
							   return <SavedDataView phrases={this.state.phrases}
							   						 locations={this.state.locations}
									  />
						   }}/>
					<Route component={NotFound}/>
				</Switch>
	   		</div>
    );
  }
}
