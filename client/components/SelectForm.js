import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { currentSearch } from '../store'
// import { currentSearchStudents } from '../store/students'
// import { currentSearchTeachers } from '../store/teachers'
// import { currentSearchSchools } from '../store/schools'

class SelectForm extends Component {
	constructor() {
	  super()
	  // this.state={
	  // 	searchOption: ''
	  // }
	  this.handleChange = this.handleChange.bind(this)
	  // this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		console.log(e.target.value)
	  this.props.search(e.target.value)
	}

	// handleSubmit(e){
	//   e.preventDefault()
	//   const { searchOption } = this.state;
	//   const { search } = this.props;
	//   search(searchOption);
	// }

	render() {
	  const categories = [ '--', 'students', 'teachers', 'schools' ];
	  const { handleChange } = this;
	  const { search } = this.props;
	  return (
	  	<div>
	  	  <form onChange={handleChange} >
	  	  <label>Who are you search for?</label>
	  	  <select name='input'>
	  	  {categories.map(category => {
	  	  	return (<option value={category}>{category}</option>)
	  	  })}
	  	  </select>
	  	  <button><Link to={`/${this.props.search}/search`}>Select</Link></button>
	  	  </form>
	  	</div>
	  )
	}
}

const mapStateToProps = state => ({
  search: state.search.search
})

const mapDispatchToProps = dispatch => ({
  search: (s) => dispatch(currentSearch(s))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm)