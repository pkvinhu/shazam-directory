import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
  	
  	return(
  	  <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
  	    <ul style={{ listStyle: 'none' }}>
  	      <li><Link to='/welcome'>Welcome</Link></li>
  	      <li><Link to='/students'>Student Directory</Link></li>
  	      <li><Link to='/teachers'>Teacher Directory</Link></li>
  	      <li><Link to='/schools'>School Directory</Link></li>
  	    </ul>
  	  </div>
  	)
  }
}