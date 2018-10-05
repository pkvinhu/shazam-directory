import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editingProfile } from '../store/profile'
import { writeName, 
	     writeGPA, 
	     writeExtra,
         writeEnrollment,
	     flipSubmitted } from '../store/create'

class StudentProfile extends Component {
  constructor(){
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
  	const { editingProfile, 
  		    student, 
  		    writeName, 
  		    writeGPA, 
  		    writeExtra, 
  		    writeEnrollment } = this.props
    writeName(student.name)
    writeGPA(student.gpa)
    if(student.extracurricular) { writeExtra(student.extracurricular)}
    if(student.school) { writeEnrollment(student.school.name)}
  	editingProfile(student)
  }

  render(){
  	const { student, stylez, editing, prof } = this.props;
  	const { handleClick } = this;
  	
  	if(editing) {
  		return (<Redirect to={`/edit/${prof}/${student.id}`}/>)
  	} else {
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <img src={student.img} />
	  	  <h1>{student.name}</h1>
	  	  <h3>GPA:</h3>
	  	  <label>{student.gpa}</label>
	  	  <h3>Extracurricular:</h3>
	  	  <label>{student.extracurricular || 'None' }</label>
	  	  <h3>School:</h3>
	  	  {!student.school ?
	  	  <label>None</label> :
	  	  <label>{student.school.name}</label>
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
  	student: state.students.currentStudent,
  	prof: prof,
  	editing: editing,
  	currentlyEditing: currentlyEditing
  }
}

const mapDispatchToProps = dispatch => ({
  editingProfile: (info) => dispatch(editingProfile(info)),
  writeName: (name) => dispatch(writeName(name)),
  writeGPA: (gpa) => dispatch(writeGPA(gpa)),
  writeExtra: (ex) => dispatch(writeExtra(ex)),
  writeEnrollment: (school) => dispatch(writeEnrollment(school)),
  flipSubmitted: () => dispatch(flipSubmitted()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile)