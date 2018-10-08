import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
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
import StudentCreate from './StudentCreate'
import TeacherCreate from './TeacherCreate'
import SchoolCreate from './SchoolCreate'
import { AppBar, Paper, Toolbar, Tabs, Tab, Typography } from '@material-ui/core'
import orange from '@material-ui/core/colors/orange'


export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      anchorEl: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt, value) {
    this.setState({ value })
  }

  render() {
  	return (
  	  <Paper >
  	   <AppBar style={{ padding: '15px', display:'inline-flex' }} position='static' color='primary'>
  	    <Typography variant='display2' color='inherit' display='flex'>
          SHAZAM
        </Typography>
        </AppBar>
          <Paper>
          <Tabs
              style={{ flexGrow: 5 }}
              value={this.state.value}
              onChange={this.handleChange}
              textColor="inherit"
              indicatorColor='secondary'
              centered
              >
            <Tab component={Link} to='/welcome' label='Welcome'></Tab>
            <Tab component={Link} to='/students' label='Students'></Tab>
            <Tab component={Link} to='/schools' label='Schools'></Tab>
            <Tab component={Link} to='/teachers' label='Teachers'></Tab>
          </Tabs>
          </Paper>

  	    <div>
  	      <Route path='/welcome' component={Welcome} />
          <Route exact path='/search' component={SearchForm} />
          <Route path='/search/:filter' component={SearchInformation} />
          <Route path='/create' component={CreateForm} />
          <Route path='/edit/students/:id' component={StudentCreate} />
          <Route path='/edit/teachers/:id' component={TeacherCreate} />        
          <Route path='/edit/schools/:id' component={SchoolCreate} />   	      
          <Route exact path='/students' component={StudentsDirectory} />
  	      <Route exact path='/teachers' component={TeachersDirectory}/>
  	      <Route exact path='/schools' component={SchoolsDirectory}/>
  	      <Route exact path='/students/:id' component={SingleProfile} />
  	      <Route exact path='/teachers/:id' component={SingleProfile}/>
  	      <Route exact path='/schools/:id' component={SingleProfile}/>
  	    </div>
  	  </Paper>
  	)
  }
}
