import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { currentSearch, flipSubmit } from '../store/search'
import { currentType } from '../store/create'
import SearchForm from './SearchForm'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'

class SelectForm extends Component {
	constructor() {
	  super()
	  this.handleChange = this.handleChange.bind(this)
	  this.handleClick = this.handleClick.bind(this)
	}

	handleChange(e) {
	  const { search, create, navigation } = this.props;
	  if(navigation === 'search') {search(e.target.value)}
	  else if(navigation === 'create') {create(e.target.value)}
	}

	handleClick(e){
	  this.props.flipSubmit()
	}

	componentWillUnmount(){
	  this.props.reset();
	}

	render() {
	  const categories = [ '--', 'students', 'teachers', 'schools' ];
	  const { handleChange, handleClick } = this;
	  const { searchVal, submitted, navigation, input } = this.props;
	  console.log(navigation)
	  return (
	  	<div>
	  	  <form >
	  	  <div>
	  	  {navigation === 'search' ?
	  	  <InputLabel>Who are you searching for?</InputLabel> :
	  	  <InputLabel>Who would you like to create?</InputLabel>}
	  	  </div>
	  	  <Select onChange={handleChange} name='input' value={searchVal}>
	  	  {categories.map((category, idx) => {
	  	  	return (<MenuItem key={idx} value={category}>{category}</MenuItem>)
	  	  })}
	  	  </Select>
	  	  {navigation === 'search' &&
	  	  <Button onClick={handleClick} component={Link} to='/search'>Select</Button>}
	  	  {navigation === 'create' &&
	  	  <Button onClick={handleClick} component={Link} to='/create'>Select</Button>}
	  	  </form>
	  	</div>
	  )

	}
}

const mapStateToProps = (state, ownProps) => {
  const { search, submitted, input } = state.search
  const { create } = state.creating
  const { navigation, reset } = ownProps
  return { 
  	searchVal: search,
  	submitted: submitted,
  	create: create,
  	navigation: navigation,
  	reset: reset,
  	input: input
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (s) => dispatch(currentSearch(s)),
  create: (t) => dispatch(currentType(t)),
  flipSubmit: () => dispatch(flipSubmit())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm)