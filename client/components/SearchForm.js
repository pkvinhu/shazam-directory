import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeSearch, currentSearch } from '../store'
import { _searchStudents } from '../store/students'
import { _searchTeachers } from '../store/teachers'
import { _searchSchools } from '../store/schools'
import SearchInformation from './SearchInformation'

class SearchForm extends Component {
  constructor() {
  	super()
  	this.state = {
  	  queryData: []
  	}
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
  	const { writeSearch } = this.props;
  	writeSearch(e.target.value);
  }

  handleSubmit(e) {
  	e.preventDefault()
    const { search, input, _searchStudents, _searchTeachers, _searchSchools, currentSearch, writeSearch, students, teachers, schools } = this.props;
    if(search === 'students') { 
      _searchStudents(search, {name: input})
      .then(() => this.setState({ queryData: students }))
    }

    else if (search === 'teachers') { 
      _searchTeachers(search, {name: input})
      .then(() => this.setState({ queryData: teachers }))
    }

    else if (search === 'schools') { 
      _searchSchools(search, {name: input})
      .then(() => this.setState({ queryData: schools }))
    }

    currentSearch('');
	writeSearch('');
  }
  
  render() {
    const { input, search } = this.props
    const { handleChange, handleSubmit } = this;
    const clicked = false;
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center'}}>
  	  {clicked === false ?
  	  	
  	    <form onSubmit={handleSubmit}>
  	      <input placeholder={`Search ${search}...`} 
  	             name={input}
  	             type='text' 
  	             onChange={handleChange} 
  	             value={input}></input>
  	      <button onClick={!clicked}>Search</button>
  	    </form> :
  	    <SearchInformation info={this.state.queryData}/>
  	  }
  	  </div>
  	)
  }
}

const mapStateToProps = state => {
  const { search, input } = state.search
  return { 
  	search: search,
  	input: input,
  	students: state.students.directory,
  	teachers: state.teachers.directory,
  	schools: state.schools.directory
  }
}

const mapDispatchToProps = dispatch => ({
  writeSearch: (content) => dispatch(writeSearch(content)),
  _searchStudents: (search, input) => dispatch(_searchStudents(search, input)),
  _searchTeachers: (search, input) => dispatch(_searchTeachers(search, input)),
  _searchSchools: (search, input) => dispatch(_searchSchools(search, input)),
  currentSearch: (s) => dispatch(currentSearch(s))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)