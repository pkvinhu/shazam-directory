import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import Welcome from './Welcome'
import StudentsDirectory from './StudentsDirectory'
import TeachersDirectory from './TeachersDirectory'
import SchoolsDirectory from './SchoolsDirectory'
import SearchForm from './SearchForm'
import SearchInformation from './SearchInformation'
import CreateForm from './CreateForm'
import SingleProfile from './SingleProfile'


export default class HomePage extends Component {

  render() {
    // const { submitted, search } = this.props;
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
          <Route path='/search/:filter' component={SearchInformation} />
          <Route path='/create' component={CreateForm} />
          <Route path='/edit/:filter/:id' component={CreateForm} />       
  	      <Route exact path='/students' component={StudentsDirectory} />
  	      <Route exact path='/teachers' component={TeachersDirectory}/>
  	      <Route exact path='/schools' component={SchoolsDirectory}/>
  	      <Route exact path='/students/:id' component={SingleProfile} />
  	      <Route exact path='/teachers/:id' component={SingleProfile}/>
  	      <Route exact path='/schools/:id' component={SingleProfile}/>
  	    </div>
  	  </div>
  	)
  }
}
