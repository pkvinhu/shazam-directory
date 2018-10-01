import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeSearch, currentSearch, _searchData } from '../store/search'
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
    const { search, input, _searchData } = this.props;
    
    _searchData(search, {name: input})
	  
  }
  
  render() {
    const { input, search } = this.props
    const { handleChange, handleSubmit, renderSearchInfo } = this;
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

const mapStateToProps = (state, ownProps) => {
  const { search, input } = state.search
  const { history } = ownProps
  console.log(history)
  return { 
  	search: search,
  	input: input
  }
}

const mapDispatchToProps = dispatch => ({
  writeSearch: (content) => dispatch(writeSearch(content)),
  _searchData: (search, input) => dispatch(_searchData(search, input))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)