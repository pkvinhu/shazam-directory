import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { currentSearchStudents } from '../store/students'
import { currentSearchTeachers } from '../store/teachers'
import { currentSearchSchools } from '../store/schools'

class SelectForm extends Component {
	constructor() {
	  super()
	  this.state={
	  	searchOption: ''
	  }
	  this.handleChange = this.handleChange.bind(this)
	  this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
	  this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e) {
	  e.preventDefault();
	  const { students, schools, teachers } = this.props;
	  this.state[searchOption]();
	}

	render() {
	  const categories = [ '--', 'student', 'teacher', 'school' ];
	  const { handleChange, handleSubmit } = this;
	  return (
	  	<div>
	  	  <form onChange={handleChange} onSubmit={handleSubmit}>
	  	  <label>Who are you search for?</label>
	  	  <select name='searchOption'>
	  	  {categories.map(category => {
	  	  	return (<option value={category}>{category}</option>)
	  	  })}
	  	  </select>
	  	  <button><Link to={`/${this.state.searchOption}/search`}>Select</Link></button>
	  	  </form>
	  	</div>
	  )
	}
}


const mapDispatchToProps = dispatch => ({
  students: () => dispatch(currentSearchStudents()),
  teachers: () => dispatch(currentSearchTeachers()),
  schools: () => dispatch(currentSearchSchools())
})

export default connect(null, mapDispatchToProps)(SelectForm)