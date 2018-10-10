import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { _fetchSchProfile } from '../store/schools'
import { writeName,
		     writeAddress, 
	       writeDes,
	       flipSubmitted,
	       _createSchool,
	       reset } from '../store/create'
import { _editSchool, resetEditing } from '../store/profile'
import { Input, InputLabel, Button, Paper } from '@material-ui/core'

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
  	const { create, 
            name, 
            address, 
            description, 
            _createSchool, 
            flipSubmitted,
            resetEditing, 
            submitted,
            editing,
            _editSchool,
            school,
            _fetchSchProfile } = this.props

    if(editing){
      const id = school.id
      _editSchool({name, address, description, id})
      .then(()=> {
        _fetchSchProfile(id)
        flipSubmitted()
        resetEditing()
      })
    } 
    else{
  	  _createSchool( create, {name, address, description})
  	  .then(()=>flipSubmitted())
    }
  }

  componentWillUnmount(){
  	this.props.flipSubmitted()
  	this.props.reset()
  }

  render() {
  	const { name, address, description, school, editing, create } = this.props;
  	const { handleChange, handleSubmit } = this;

    if(!editing && !create) {
      return (<Redirect to={`/schools/${school.id}`} />)
    }
    else if(editing || create) {
  	return (
      <Paper style={{ display: 'flex', justifyContent: 'center', width:'70%', padding: '40px' }}>
  	    <form style={{display: 'flex', 
	  	             justifyContent: 'center', 
	  	             flexDirection: 'column',
	  	             width: '50%' }} 
                   onChange={handleChange}>
	  	  <InputLabel>Name</InputLabel>
	  	  <Input type='text'
	  	  		 name='name'
	  	         value={name}></Input>
  	      <InputLabel>Address</InputLabel>
  	      <Input type='text'
  	             name='address'
  	    	     value={address}></Input>
  	      <InputLabel>Description</InputLabel>
  	      <Input type='text'
  	             name='description'
  	             value={description}
  	             style={{ height: '40px', padding: '5px'}}></Input>
  	      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
  	      <Button onClick={handleSubmit}
                  component={Link}
                  to={`/schools/${school.id}`}
                  style={{ width: '15%' }}>Submit</Button>
  	      </div>
	  	</form>
      </Paper>
  	)
  }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name, create, address, description, submitted } = state.creating
  const { editing } = state.profile
  const { currentSchool } = state.schools
  return { 
  	name: name,
  	create: create,
  	address: address,
  	description: description,
    submitted: submitted,
    editing: editing,
    school: currentSchool
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeAddress: (address) => dispatch(writeAddress(address)),
  writeDes: (description) => dispatch(writeDes(description)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createSchool: (search, input) => dispatch(_createSchool(search, input)),
  reset: () => dispatch(reset()),
  _editSchool: (input) => dispatch(_editSchool(input)),
  resetEditing: () => dispatch(resetEditing()),
    _fetchSchProfile: (id) => dispatch(_fetchSchProfile(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreate);
