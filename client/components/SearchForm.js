import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeSearch, currentSearch, _searchStudents, _searchTeachers, _searchSchools } from '../store/search'
import SearchInformation from './SearchInformation'
import HomePage from './HomePage'
import NavBar from './NavBar'

class SearchForm extends Component {
  constructor() {
  	super()
  	this.state = { submitted: false }
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
  	const { writeSearch } = this.props;
  	writeSearch(e.target.value);
  }

  handleSubmit(e) {
  	e.preventDefault()
    const { search, input, _searchStudents, _searchTeachers, _searchSchools } = this.props;
    
    this.setState({ submitted: true })
    
    if(search === 'students') { 
      _searchStudents(search, {name: input})
    }

    else if (search === 'teachers') { 
      _searchTeachers(search, {name: input})
    }

    else if (search === 'schools') { 
      _searchSchools(search, {name: input})
    }
  }

  componentWillUnmount(){
  	this.setState({ submitted: false })
  }
  
  render() {
    const { input, search } = this.props
    const { handleChange, handleSubmit, renderSearchInfo } = this;
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center'}}>
  	  {this.state.submitted === false ?
  	    <form onSubmit={handleSubmit}>
  	      <input placeholder={`Search ${search}...`} 
  	             name={input}
  	             type='text' 
  	             onChange={handleChange} 
  	             value={input}></input>
  	      <button>Search</button>
  	    </form> :
  	    <SearchInformation />
  	}
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
  _searchStudents: (search, input) => dispatch(_searchStudents(search, input)),
  _searchTeachers: (search, input) => dispatch(_searchTeachers(search, input)),
  _searchSchools: (search, input) => dispatch(_searchSchools(search, input))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)