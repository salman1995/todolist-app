import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter as Router, Route, IndexRoute, hashHistory,Switch,HashRouter  } from "react-router-dom";

import Home from "./pages/Home";
import App from "./components/App";

import { Provider } from "react-redux"
import store from "./store"
const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
		<HashRouter  >
			<App>
				<Route name="home" history={hashHistory} path='/' exact component={Home}/>
			</App>
		</HashRouter >
	</Provider>
	,
app);