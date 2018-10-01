import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { writeSearch, currentSearch, _searchData, flipSubmit } from '../store/search'
import SearchInformation from './SearchInformation'
import HomePage from './HomePage'
import NavBar from './NavBar'

class SearchForm extends Component {
  constructor() {
  	super()
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
  	const { writeSearch } = this.props;
  	writeSearch(e.target.value);
  }

  handleSubmit(e) {
  	e.preventDefault()
    const { search, input, _searchData, flipSubmit } = this.props;
    _searchData(search, {name: input})
	flipSubmit()
  }
  
  render() {
    const { input, search, submitted } = this.props
    const { handleChange, handleSubmit } = this;
  	
  	if (!submitted) {
  	  return <Redirect to={`/search/${search}`} />
  	} else {
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center'}}>

  	    <form onSubmit={handleSubmit}>
  	      <input placeholder={`Search ${search}...`} 
  	             name={input}
  	             type='text' 
  	             onChange={handleChange} 
  	             value={input}></input>
  	      <button>Search</button>
  	    </form> 
  	  </div>
  	)
  }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { search, input, submitted } = state.search
  console.log(history)
  return { 
  	search: search,
  	input: input,
  	submitted: submitted
  }
}

const mapDispatchToProps = dispatch => ({
  writeSearch: (content) => dispatch(writeSearch(content)),
  _searchData: (search, input) => dispatch(_searchData(search, input)),
  flipSubmit: () => dispatch(flipSubmit())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)