import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { currentSearch, flipSubmit } from '../store/search'
import { currentType } from '../store/create'
import SearchForm from './SearchForm'

class SelectForm extends Component {
	constructor() {
	  super()
	  this.handleChange = this.handleChange.bind(this)
	  this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
	  const { search, create, navigation } = this.props;
	  if(navigation === 'search') {search(e.target.value)}
	  else if(navigation === 'create') {create(e.target.value)}
	}

	handleSubmit(e){
	  e.preventDefault();
	  this.props.flipSubmit()
	}

	componentWillUnmount(){
	  this.props.reset();
	}

	render() {
	  const categories = [ '--', 'students', 'teachers', 'schools' ];
	  const { handleChange, handleSubmit } = this;
	  const { search, submitted, navigation } = this.props;
	  console.log(navigation)
	  if(submitted && navigation === 'search') {
	  	return <Redirect from= '/welcome' to='/search'/>
	  } else if (submitted && navigation === 'create') {
	  	return <Redirect from='/welcome' to='/create' />
	  } else {
	  return (
	  	<div>
	  	  <form onChange={handleChange} onSubmit={handleSubmit}>
	  	  {navigation === 'search' ?
	  	  <label>Who are you searching for?</label> :
	  	  <label>Who would you like to create?</label>}
	  	  <select name='input'>
	  	  {categories.map(category => {
	  	  	return (<option value={category}>{category}</option>)
	  	  })}
	  	  </select>
	  	  <button>Select</button>
	  	  </form>
	  	</div>
	  )
	  }
	}
}

const mapStateToProps = (state, ownProps) => {
  const { search, submitted } = state.search
  const { create } = state.creating
  const { navigation, reset } = ownProps
  return { 
  	search: search,
  	submitted: submitted,
  	create: create,
  	navigation: navigation,
  	reset: reset
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (s) => dispatch(currentSearch(s)),
  create: (t) => dispatch(currentType(t)),
  flipSubmit: () => dispatch(flipSubmit())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm)