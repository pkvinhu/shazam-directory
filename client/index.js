import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import HomePage from './components/HomePage'
import {HashRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

render(
	<Provider store = { store }>
		<Router>
		  <HomePage />
		</Router>
	</Provider>, 
	document.getElementById('main')
)