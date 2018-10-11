import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { writeSearch, currentSearch, _searchData, flipSubmit } from '../store/search'
import SearchInformation from './SearchInformation'
import HomePage from './HomePage'
import NavBar from './NavBar'
import { FormControl, InputLabel, Input, Button, Icon } from '@material-ui/core'

class SearchForm extends Component {
  constructor() {
  	super()
  	this.handleChange = this.handleChange.bind(this);
  	/*this.handleSubmit = this.handleSubmit.bind(this);*/
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
  	e.preventDefault();
  	const { writeSearch } = this.props;
  	writeSearch(e.target.value);
  }

  /*handleSubmit(e) {
  	e.preventDefault()
    const { search, input, _searchData, flipSubmit } = this.props;
    _searchData(search, {name: input})
	.then(()=>flipSubmit())
  }*/

  handleSubmit(e) {
  	
  	const { search, input, _searchData, flipSubmit } = this.props;
    _searchData(search, {name: input})
	.then(()=>flipSubmit())
  }
  
  render() {
    const { input, search, submitted } = this.props
    const { handleChange, handleSubmit } = this;
  	
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center'}}>

  	    <form onSubmit={handleSubmit}>

  	      <Input placeholder={`Search ${search}...`} 
  	             name={input}
  	             type='text' 
  	             onChange={handleChange} 
  	             value={input}></Input>
  	      <Button onClick={handleSubmit} component={Link} to={`/search/${search}`}>
	  	      <Icon>
	  	      search_icon
	  	      </Icon>
  	      </Button>

  	    </form> 
  	  </div>
  	)
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