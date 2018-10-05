import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editingProfile } from '../store/profile'
import { writeName, 
	     writeGender, 
	     writeSubjects,
         writeEmployment,
         flipSubmitted } from '../store/create'

class TeacherProfile extends Component {
  constructor(){
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
  	const { editingProfile, 
  		    teacher, 
  		    writeName, 
  		    writeGender, 
  		    writeSubjects, 
  		    writeEmployment } = this.props
  	writeName(teacher.name)
  	writeGender(teacher.gender)
  	if(teacher.subjects){writeSubjects(teacher.subjects)}
  	if(teacher.school){ writeEmployment(teacher.school.name)}
  	editingProfile(teacher)
  }

  render(){
  	const { teacher, stylez, editing, prof } = this.props;
  	const { handleClick } = this;

  	if(editing) {
  		return (<Redirect to={`/edit/${prof}/${teacher.id}`} />)
  	} else {
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <img src={teacher.img} />
	  	  <h1>{teacher.name}</h1>
	      <h3>Subjects:</h3>
	  	  <label>{teacher.subjects}</label>
	  	  <h3>School:</h3>
	  	  {!teacher.school ?
	  	  <label>None</label> :
	  	  <label>{teacher.school.name}</label>
	  	}
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
  	teacher: state.teachers.currentTeacher,
  	prof: prof,
  	editing: editing,
  	currentlyEditing: currentlyEditing
  }
}

const mapDispatchToProps = dispatch => ({
  editingProfile: (info) => dispatch(editingProfile(info)),
  writeName: (name) => dispatch(writeName(name)),
  writeGender: (gender) => dispatch(writeGender(gender)),
  writeSubjects: (subjects) => dispatch(writeSubjects(subjects)),
  writeEmployment: (school) => dispatch(writeEmployment(school)),
  flipSubmitted: () => dispatch(flipSubmitted())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile)