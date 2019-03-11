import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ListView from './views/ListView';
import FormView from './views/FormView';
import SavedDataView from './views/SavedDataView';
import Header from './components/Header';
import { getSellableInventory, getLocations, getPhrases } from './lib/ItemRoutes';

import './App.css';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			items: [],
			books: [],
			locations: [],
			phrases: []
		}
	}

	setStatePromise = (key, promise) => {
		promise.then((data) => {
			this.setState({[key]:data});
		});
	}

	removeItem = (itemId, type) => {
		let items = this.state[type].filter((item) => {
			return item.itemId !== itemId;
		});
		this.setState({
			[type]: items
		});
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
	}

	render() {
		return (
			<div className="App">
				<Header/>
				<Switch>
					<Redirect from='/list/item' to='/list/items'/>
					<Redirect from='/list/book' to='/list/books'/>
					<Route path='/list/:type'
					       render={({match}) => {
							   return <ListView type={match.params.type}
							   					items={this.state[match.params.type]}
												removeItem={this.removeItem}/>
						   }} />

					<Redirect from='/form/items/:mode/:id' to='/form/item/:mode/:id'/>
					<Redirect from='/form/books/:mode/:id' to='/form/book/:mode/:id'/>
					<Route path='/form/:type/:mode/:id'
						   render={({match}) => {
							   return <FormView type={match.params.type}
							   					mode={match.params.mode}
												id={match.params.id}/>
						   }}/>

					<Redirect from='/form/items' to='/form/item'/>
					<Redirect from='/form/books' to='/form/book'/>
					<Route path='/form/:type/'
						   render={({match}) => {
							   return <FormView type={match.params.type}/>
						   }}/>
					<Route path='/data/'
						   component={SavedDataView}/>
				</Switch>
	   		</div>
    );
  }
}
