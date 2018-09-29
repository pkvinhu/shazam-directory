import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeSearch } from '../store'
import { _searchStudents } from '../store/students'
import { _searchTeachers } from '../store/teachers'
import { _searchSchools } from '../store/schools'

class SearchForm extends Component {
  constructor() {
  	super()
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
  	const { writeSearch, input } = this.props;
  	writeSearch(e.target.value);
  }

  handleSubmit(e) {
  	e.preventDefault()
    const { search, input, _searchStudents, _searchTeachers, _searchSchools } = this.props;
    if(search === 'students') { _searchStudents(search)}
    else if (search === 'teachers') { _searchTeachers(search)}
    else if (search === 'schools') { _searchSchools(search)}
  }
  
  render() {
    const { input, search } = this.props
    const { handleChange, handleSubmit } = this;
    console.log(search)
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center'}}>
  	    <form onSubmit={handleSubmit}>
  	      <input placeholder={`Search ${search}...`} 
  	             type='text' 
  	             onChange={handleChange} 
  	             value={input}></input>
  	      <button>Search</button>
  	    </form>
  	  </div>
  	)
  }
}

const mapStateToProps = state => {
  const { search, input } = state.search
  return { 
  	search: search,
  	input: input 
  }
}

const mapDispatchToProps = dispatch => ({
  writeSearch: (content) => dispatch(writeSearch(content)),
  _searchStudents: (input) => dispatch(_searchStudents(input)),
  _searchTeachers: (input) => dispatch(_searchTeachers(input)),
  _searchSchools: (input) => dispatch(_searchSchools(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)