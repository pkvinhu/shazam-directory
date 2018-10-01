import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { currentSearch, flipSubmit } from '../store/search'
import SearchForm from './SearchForm'

class SelectForm extends Component {
	constructor() {
	  super()
	  this.handleChange = this.handleChange.bind(this)
	  this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
	  this.props.search(e.target.value)
	}

	handleSubmit(e){
	  e.preventDefault();
	  this.props.flipSubmit()
	  // .then(() => this.props.history.push(`/search/${this.props.search}`))
	}

	render() {
	  const categories = [ '--', 'students', 'teachers', 'schools' ];
	  const { handleChange, handleSubmit } = this;
	  const { search, submitted } = this.props;
	  if(submitted) {
	  	return <Redirect to='/search'/>
	  } else {
	  return (
	  	<div>
	  	  <form onChange={handleChange} onSubmit={handleSubmit}>
	  	  <label>Who are you searching for?</label>
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

const mapStateToProps = (state) => {
  const { search, submitted } = state.search
  return { 
  	search: search,
  	submitted: submitted
  }
}


const mapDispatchToProps = dispatch => ({
  search: (s) => dispatch(currentSearch(s)),
  flipSubmit: () => dispatch(flipSubmit())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm)