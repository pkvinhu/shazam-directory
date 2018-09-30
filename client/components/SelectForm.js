import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { currentSearch } from '../store/search'

class SelectForm extends Component {
	constructor() {
	  super()
	  this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
	  this.props.search(e.target.value)
	}

	render() {
	  const categories = [ '--', 'students', 'teachers', 'schools' ];
	  const { handleChange } = this;
	  const { search } = this.props;
	  return (
	  	<div>
	  	  <form onChange={handleChange} >
	  	  <label>Who are you searching for?</label>
	  	  <select name='input'>
	  	  {categories.map(category => {
	  	  	return (<option value={category}>{category}</option>)
	  	  })}
	  	  </select>
	  	  <button><Link to='/search'>Select</Link></button>
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