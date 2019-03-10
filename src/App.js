import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ListView from './views/ListView';
import FormView from './views/FormView';
import SavedDataView from './views/SavedDataView';
import Header from './components/Header';

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

	render() {
		return (
			<div className="App">
				<Header/>
				<Switch>
					<Redirect from='/list/item' to='/list/items'/>
					<Redirect from='/list/book' to='/list/books'/>
					<Route path='/list/:type'
					       render={({match}) => {
							   return <ListView type={match.params.type}/>
						   }} />

					<Redirect from='/form/items/:id' to='/form/item/:id'/>
					<Redirect from='/form/books/:id' to='/form/book/:id'/>
					<Route path='/form/:type/:id'
						   render={({match}) => {
							   return <FormView type={match.params.type} id={match.params.id}/>
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
