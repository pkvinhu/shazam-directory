import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { _fetchStuProfile } from '../store/students'
import { writeName, 
	     writeGPA, 
	     writeExtra,
       writeEnrollment,
	     flipSubmitted,
	     _createStudent,
	     reset } from '../store/create'
import { _fetchSchools } from '../store/schools'
import { _editStudent, resetEditing } from '../store/profile'
import { Input, InputLabel, Button, Select, Paper, MenuItem } from '@material-ui/core'

class StudentCreate extends Component {
  
  constructor(){
  	super()
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
  	const { writeName, 
            writeGPA, 
            writeExtra, 
            writeEnrollment } = this.props;
  	if (e.target.name === 'name') {writeName(e.target.value)}
  	else if (e.target.name === 'gpa') {writeGPA(e.target.value)}
  	else if (e.target.name === 'extracurricular') {writeExtra(e.target.value)}
    else if (e.target.name === 'schools') {writeEnrollment(e.target.value)}
  }

  handleSubmit(e){
  	e.preventDefault()
  	const { create, 
            name, 
            gpa, 
            extracurricular, 
            _createStudent, 
            editing,
            _editStudent, 
            flipSubmitted,
            resetEditing, 
            submitted, 
            enrollment,
            student,
            _fetchStuProfile } = this.props
  	
    if(editing) {
      const id = student.id
      _editStudent({name, gpa, extracurricular, enrollment, id })
      .then(()=>{
        _fetchStuProfile(id)
        flipSubmitted()
        resetEditing()
      })
    }
    else{ 
      _createStudent( create, {name, gpa, extracurricular, enrollment })
  	  .then(()=>flipSubmitted())
    }
  }

  componentDidMount(){
    this.props._fetchSchools();
  }

  componentWillUnmount(){
  	this.props.flipSubmitted()
  	this.props.reset()
  }

  render() {
  	const { name, gpa, extracurricular, schools, enrollment, editing, create, student } = this.props;
  	const { handleChange, handleSubmit } = this;

    if(!editing && !create) {
      return (<Redirect to={`/students/${student.id}`} />)
    }
    else {
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
  	      <InputLabel>GPA</InputLabel>
  	      <Input type='text'
  	             name='gpa'
  	    	     value={gpa}></Input>
  	      <InputLabel>Extracurricular</InputLabel>
  	      <Input type='text'
  	             name='extracurricular'
  	             value={extracurricular}
  	             style={{ height: '40px', padding: '5px'}}></Input>
          <InputLabel>School</InputLabel>
          <Select name='schools'
                  onChange={handleChange}
                  value={enrollment}>
          {schools.map(school => {
            return (
              <MenuItem value={school.id}>{school.name}</MenuItem>
              )
          })}
          </Select>
  	      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
  	      <Button component={Link} 
                  to={`/students/${student.id}`} 
                  onClick={handleSubmit} 
                  style={{ width: '15%' }}>Submit</Button>
  	      </div>
	  	</form>
      </Paper>
  	)
  }
  }
}

const mapStateToProps = state => {
  const { create, name, gpa, extracurricular, submitted, enrollment } = state.creating
  const { directory } = state.schools
  const { editing } = state.profile
  const { currentStudent } = state.students
  return {
  	create: create,
  	name: name,
  	gpa: gpa,
  	extracurricular: extracurricular,
    submitted: submitted,
    enrollment: enrollment,
    schools: directory,
    editing: editing,
    student: currentStudent
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeGPA: (gpa) => dispatch(writeGPA(gpa)),
  writeExtra: (ex) => dispatch(writeExtra(ex)),
  writeEnrollment: (school) => dispatch(writeEnrollment(school)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createStudent: (search, input) => dispatch(_createStudent(search, input)),
  reset: () => dispatch(reset()),
  _fetchSchools: () => dispatch(_fetchSchools()),
  _editStudent: (input) => dispatch(_editStudent(input)),
  resetEditing: () => dispatch(resetEditing()),
  _fetchStuProfile: (id) => dispatch(_fetchStuProfile(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate)