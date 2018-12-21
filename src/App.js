import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ListView from './views/ListView';
import FormView from './views/FormView';

import './App.css';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route path="/list/:type"
					       render={({match}) => {
							   return <ListView type={match.params.type}/>
						   }} />
					<Route path="/form/:type"
						   render={({match}) => {
							   return <FormView type={match.params.type}/>
						   }}/>
				</Switch>
      		</div>
    );
  }
}
