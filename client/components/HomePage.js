import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import NavBar from './NavBar'
import Welcome from './Welcome'
import StudentsDirectory from './StudentsDirectory'
// import TeachersDirectory from './TeachersDirectory'
// import SchoolsDirectory from './SchoolsDirectory'

export default class HomePage extends Component {
  
  render() {

  	return (
  	  <div>
  	   <header style={{ display: 'flex', justifyContent: 'center' }}>
  	    <h1>SHAZAM</h1>
  	   </header>
  	    <hr />
  	    <NavBar />
  	    <hr />
  	    <div>
  	      <Route path='/welcome' component={Welcome} />
  	      <Route path='/students' component={StudentsDirectory} />
  	      {/*<Route path='/api/shazam/teachers' component={TeachersDirectory}/>
  	      <Route path='/api/shazam/schools' component={SchoolsDirectory}/>*/}
  	      <Route path='/students/:id' />
  	      <Route path='/teachers/:id' />
  	      <Route path='/schools/:id' />
  	    </div>
  	  </div>
  	)
  }
}