import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import StudentCreate from './StudentCreate'
import TeacherCreate from './TeacherCreate'
import SchoolCreate from './SchoolCreate'
import {  } from '../store/create'

class CreateForm extends Component {

	render() {
	  const { create, submitted } = this.props;

	  if(submitted && create === 'students') {
	  	return <Redirect to='/students' />
	  } 
	  else if(submitted && create === 'teachers') {
	  	return <Redirect to='/teachers' />
	  }
	  else if(submitted && create === 'schools') {
	  	return <Redirect to='/schools' />
	  }
	  else if(!submitted) {
	  return (
	  	<div style={{display: 'flex', 
	  	             justifyContent: 'center', 
	  	             flexDirection: 'column' }}>
	  	  <h2>Basic Information</h2>
	  	  {create === 'students' &&
	  	  <StudentCreate />}

	  	</div>
	  )
	}
	}
}


const mapStateToProps = (state, ownProps) => {
  const { create, submitted } = state.creating
  return { 
  	create: create,
  	submitted: submitted
  }
}

// const mapDispatchToProps = dispatch => ({
//   writeAddress: (address) => dispatch(writeAddress(address)),
//   writeDescription: (description) => dispatch(writeDescription(description)),
// })


export default connect(mapStateToProps)(CreateForm)