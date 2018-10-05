import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editingProfile } from '../store/profile'
import { writeName,
		 writeAddress, 
	     writeDes,
	     flipSubmitted } from '../store/create'

class SchoolProfile extends Component {
  constructor(){
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
  	const { editingProfile, 
  		    school, 
  		    writeName, 
  		    writeAddress, 
  		    writeDes } = this.props
  	writeName(school.name)
  	if(school.address) {writeAddress(school.address)}
  	if(school.description) {writeDes(school.description)}
  	editingProfile(school)
  }

  render(){
  	const { school, stylez, prof, editing } = this.props;
  	const { handleClick } = this;

  	if(editing) {
  		return (<Redirect to={`/edit/${prof}/${school.id}`} />)
  	} else {
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <img src={school.img} />
	  	  <h1>{school.name}</h1>
	  	  <h3>Address:</h3>
	  	  <label>{school.address}</label>
	  	  <h3>Description:</h3>
	  	  <label>{school.description}</label>
	  	</div>
  	  	<div style={{ display:'flex', flexDirection: 'row-reverse'}}>
	  	  <button onClick={handleClick}>EDIT</button>
	  	</div>
	  </div>
  	)
  }
  }
}

const mapStateToProps = state => {
  const { prof, editing, currentlyEditing } = state.profile
  return { 
  	school: state.schools.currentSchool,
  	prof: prof,
  	editing: editing,
  	currentlyEditing: currentlyEditing
  }
}

const mapDispatchToProps = dispatch => ({
  editingProfile: (info) => dispatch(editingProfile(info)),
  writeName: (name) => dispatch(writeName(name)),
  writeAddress: (address) => dispatch(writeAddress(address)),
  writeDes: (description) => dispatch(writeDes(description)),
  flipSubmitted: () => dispatch(flipSubmitted())
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolProfile)