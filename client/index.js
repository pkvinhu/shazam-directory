import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import HomePage from './components/HomePage'
import {HashRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Paper } from '@material-ui/core'

render(
	<div>
	<Provider store = { store }>
		<Router>
		  <HomePage />
		</Router>
	</Provider>
	</div>, 
	document.getElementById('main')
)