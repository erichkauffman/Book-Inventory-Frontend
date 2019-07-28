import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import ListView from './views/ListView/ListView';
import FormView from './views/FormView/FormView';
import SavedDataView from './views/SavedDataView/SavedDataView';
import IssueView from './views/IssueView/IssueView';
import Header from './components/Header';
import NotFound from './components/NotFound';
import EnvironmentWarning from './components/EnvironmentWarning';
import Error from './components/Error';
import { getSellableInventory, getSavedData } from './lib/ItemRoutes';
import { filterOutId, filterOutExact } from './lib/filters';
import { isItem, isBook } from './lib/guards';
import { IItem, IBook } from './data/types';
import { apiPath } from './config';

import './App.css';

type ApiData = IItem|string
type ApiArray = IItem[]|string[]

type State = {
	items: IItem[],
	books: IBook[],
	phrases: string[],
	locations: string[],
	shelves: string[],
	socket: SocketIOClient.Socket,
	connectionError: boolean,
	[other: string]: ApiArray|SocketIOClient.Socket|boolean
}

const savedDataCategories = ['phrases', 'locations', 'shelves'];

export default class App extends Component<{},State> {
	constructor(){
		super({});
		this.state = {
			items: [],
			books: [],
			phrases: [],
			locations: [],
			shelves: [],
			socket: io.connect(apiPath),
			connectionError: false
		}
	}

	setStatePromise = (key: string, promise: Promise<ApiArray>) => {
		promise.then((data) => {
			this.setState({[key]:data});
		});
	}

	removeItem = (itemId: number, type: string='books') => {
		let items = filterOutId(itemId, (this.state[type] as IItem[]));
		this.setState({
			[type]: items
		});
		if(type === 'books'){
			this.removeItem(itemId, 'items');
		}
	}

	updateItem = (dataObject: IItem, type: string) => {
		this.removeItem(dataObject.itemId);
		this.saveData(dataObject, type);
	}

	saveData = (dataObject: ApiData, type: string) => {
		let data = this.state[type];
		if(isItem(dataObject) && data as IItem[]){
			let dataIndex = (data as IItem[]).findIndex((element)=>{return element.itemId > dataObject.itemId});
			if(dataIndex >= 0){
				(data as IItem[]).splice(dataIndex, 0, dataObject);
			}else{
				(data as IItem[]).push(dataObject);
			}
		}else if(data as string[] && typeof dataObject === "string"){
			(data as string[]).push(dataObject);
		}
		this.setState({[type]:data});
		if(isBook(dataObject)){
			let itemObject = {...dataObject};
			delete itemObject.author;
			this.saveData(itemObject, 'items');
		}
	}

	deleteData = (dataString: string, type: string) => {
		let data = filterOutExact(dataString, (this.state[type] as string[]));
		this.setState({[type]:data});
	}

	gatherData = (dataTypeList: string[]): {[savedData: string]: string[]} => {
		let data: {[dataType: string]: string[]} = {};
		dataTypeList.forEach((dataType) => {
			data[dataType] = this.state[dataType] as string[];
		});
		return data;
	}

	setSocketConnections = () => {
		let socket = this.state.socket;
		socket.on('new_item', (item: any)=>{(this.saveData(JSON.parse(item), 'items'))});
		socket.on('new_book', (book: any)=>{(this.saveData(JSON.parse(book), 'books'))});
		socket.on('delete_item', (itemId: string)=>{this.removeItem(parseInt(itemId))});
		socket.on('update_item', (item: any)=>{this.updateItem(JSON.parse(item), 'items')})
		socket.on('update_book', (book: any)=>{this.updateItem(JSON.parse(book), 'books')})
		socket.on('new_data', (jsonData: any) => {
			let data = JSON.parse(jsonData);
			this.saveData(data.data, data.type);
		});
		socket.on('delete_data', (jsonData: any) => {
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
					<Route path='/support/'
						   component={IssueView}/>
					<Route component={NotFound}/>
				</Switch>
	   		</div>
    );
  }
}
