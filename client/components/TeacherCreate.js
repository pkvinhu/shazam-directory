import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeName, 
	     writeGender, 
	     writeSubjects } from '../store/create'

class TeacherCreate extends Component {

  render(){

  	return (
  	<div>
  	<hr />
  	</div>
  	)
  }
}

const mapStateToProps = state => {
  const { create, subjects, gender } = state.creating
  return {
  	create: create,
  	subjects: subjects,
  	gender: gender
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeGender: (gender) => dispatch(writeGender(gender)),
  writeSubjects: (subjects) => dispatch(writeSubjects(subjects))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreate)