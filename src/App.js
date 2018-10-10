import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ListView from './views/ListView';

import './App.css';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route path="/list" component={ListView} />
				</Switch>
      </div>
    );
  }
}
