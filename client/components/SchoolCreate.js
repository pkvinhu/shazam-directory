import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeAddress, 
	     writeDescription } from '../store/create'

class SchoolCreate extends Component {

  render(){

  	return (
  	<div>
  	<hr />
  	</div>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { create, address, description } = state.creating
  return { 
  	create: create,
  	address: address,
  	description: description
  }
}

const mapDispatchToProps = dispatch => ({
  writeAddress: (address) => dispatch(writeAddress(address)),
  writeDescription: (description) => dispatch(writeDescription(description)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreate);
