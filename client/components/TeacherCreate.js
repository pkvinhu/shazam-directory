import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { _fetchTProfile } from '../store/teachers'
import { writeName, 
	     writeGender, 
	     writeSubjects,
       writeEmployment,
       flipSubmitted,
	     _createTeacher,
	     reset } from '../store/create'
import { _fetchSchools } from '../store/schools'
import { _editTeacher, resetEditing } from '../store/profile'
import { Input, InputLabel, Button, Select, Paper, MenuItem } from '@material-ui/core'

class TeacherCreate extends Component {
constructor(){
  	super()
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
  	const { writeName, writeGender, writeSubjects, writeEmployment } = this.props;
  	if (e.target.name === 'name') {writeName(e.target.value)}
  	else if (e.target.name === 'gender') {
      console.log(e.target)
      writeGender(e.target.value)
    }
  	else if (e.target.name === 'subjects') {writeSubjects(e.target.value)}
    else if (e.target.name === 'schools') {writeEmployment(e.target.value)}
  }

  handleSubmit(e){
  	e.preventDefault()
  	const { create, 
            name, 
            gender, 
            subjects, 
            _createTeacher, 
            flipSubmitted,
            resetEditing, 
            employment,
            editing,
            _editTeacher,
            teacher,
            _fetchTProfile } = this.props

    if(editing){
      const id = teacher.id;
      _editTeacher({name, gender, subjects, employment, id})
      .then(()=>{
        _fetchTProfile(id)
        flipSubmitted()
        resetEditing()
      })
    }
    else{
  	  _createTeacher( create, {name, gender, subjects, employment})
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
  	const { name, gender, subjects, schools, employment, teacher, editing, create } = this.props;
  	const { handleChange, handleSubmit } = this;
  	
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
  	      <InputLabel>Gender</InputLabel>
  	      <Select name='gender'
                  onChange={handleChange}
                  value={gender}>
  	           <MenuItem value=''>--</MenuItem>
  	    	     <MenuItem value='M'>M</MenuItem>
  	    	     <MenuItem value='F'>F</MenuItem>
  	    	     </Select>
  	      <InputLabel>Subjects</InputLabel>
  	      <Input type='text'
  	             name='subjects'
  	             value={subjects}
  	             style={{ height: '40px', padding: '5px'}}></Input>
          <InputLabel>School</InputLabel>
          <Select name='schools'
                  onChange={handleChange}
                  value={employment}>
          {schools.map(school => {
            return (
              <MenuItem value={school.id}>{school.name}</MenuItem>
              )
          })}
          </Select>
  	      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
  	      <Button onClick={handleSubmit} 
                  component={Link}
                  to={`/teachers/${teacher.id}`}
                  style={{ width: '15%' }}>Submit</Button>
  	      </div>
	  	  </form>
      </Paper>
  	)
  }
}

const mapStateToProps = state => {
  const { create, name, subjects, gender, submitted, employment } = state.creating
  const { directory } = state.schools
  const { editing } = state.profile
  const { currentTeacher } = state.teachers
  return {
  	create: create,
  	name: name,
  	subjects: subjects,
  	gender: gender,
    submitted: submitted,
    employment: employment,
    schools: directory,
    editing: editing,
    teacher: currentTeacher
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeGender: (gender) => dispatch(writeGender(gender)),
  writeSubjects: (subjects) => dispatch(writeSubjects(subjects)),
  writeEmployment: (school) => dispatch(writeEmployment(school)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createTeacher: (search, input) => dispatch(_createTeacher(search, input)),
  reset: () => dispatch(reset()),
  _fetchSchools: () => dispatch(_fetchSchools()),
  _editTeacher: input => dispatch(_editTeacher(input)),
  resetEditing: () => dispatch(resetEditing()),
  _fetchTProfile: (id) => dispatch(_fetchTProfile(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreate)