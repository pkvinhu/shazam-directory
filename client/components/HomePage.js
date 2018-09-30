import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import NavBar from './NavBar'
import Welcome from './Welcome'
import StudentsDirectory from './StudentsDirectory'
import TeachersDirectory from './TeachersDirectory'
import SchoolsDirectory from './SchoolsDirectory'
import SearchForm from './SearchForm'

export default class HomePage extends Component {
  
  render() {

  	return (
  	  <div>
  	   <header style={{ backgroundColor: '#ff9933', display: 'flex', justifyContent: 'center' }}>
  	    <h1>SHAZAM</h1>
  	   </header>
  	    <hr />
  	    <NavBar />
  	    <hr />
  	    <div>
  	      <Route path='/welcome' component={Welcome} />
          <Route exact path='/search' component={SearchForm} />         
  	      <Route exact path='/students' component={StudentsDirectory} />
  	      <Route exact path='/teachers' component={TeachersDirectory}/>
  	      <Route exact path='/schools' component={SchoolsDirectory}/>
  	      <Route path='/students/:id' />
  	      <Route path='/teachers/:id' />
  	      <Route path='/schools/:id' />
  	    </div>
  	  </div>
  	)
  }
}