import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeName,
		 writeAddress, 
	     writeDes,
	     flipSubmitted,
	     _createSchool,
	     reset } from '../store/create'

class SchoolCreate extends Component {

constructor(){
  	super()
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
  	const { writeName, writeAddress, writeDes } = this.props;
  	if (e.target.name === 'name') {writeName(e.target.value)}
  	else if (e.target.name === 'address') {writeAddress(e.target.value)}
  	else if (e.target.name === 'description') {writeDes(e.target.value)}
  }

  handleSubmit(e){
  	e.preventDefault()
  	const { create, name, address, description, _createSchool, flipSubmitted } = this.props
  	_createSchool( create, {name, address, description})
  	.then(()=>flipSubmitted());
  }

  componentWillUnmount(){
  	this.props.flipSubmitted()
  	this.props.reset()
  }

  render() {
  	const { name, address, description } = this.props;
  	const { handleChange, handleSubmit } = this;
  	return (
  	    <form style={{display: 'flex', 
	  	             justifyContent: 'center', 
	  	             flexDirection: 'column',
	  	             width: '50%' }} onChange={handleChange} onSubmit={handleSubmit}>
	  	  <label>Name</label>
	  	  <input type='text'
	  	  		 name='name'
	  	         value={name}></input>
  	      <label>Address</label>
  	      <input type='text'
  	             name='address'
  	    	     value={address}></input>
  	      <label>Description</label>
  	      <input type='text'
  	             name='description'
  	             value={description}
  	             style={{ height: '40px', padding: '5px'}}></input>
  	      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
  	      <button style={{ width: '15%' }}>Submit</button>
  	      </div>
	  	</form>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name, create, address, description } = state.creating
  return { 
  	name: name,
  	create: create,
  	address: address,
  	description: description
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeAddress: (address) => dispatch(writeAddress(address)),
  writeDes: (description) => dispatch(writeDes(description)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createSchool: (search, input) => dispatch(_createSchool(search, input)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreate);
