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


class HomePage extends Component {
  

  render() {
    const { submitted, search } = this.props;
    console.log(submitted)
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

const mapStateToProps = state => {
  const { submitted, search } = state.search 
  return { 
    submitted: submitted,
    search: search
  }
}

export default connect(mapStateToProps)(HomePage)