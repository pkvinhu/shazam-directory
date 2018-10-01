import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { writeName, 
	     writeGPA, 
	     writeExtra, 
	     writeGender, 
	     writeSubjects, 
	     writeAddress, 
	     writeDescription,
	     flipSubmitted,
	     _createStudent } from '../store/create'

class CreateForm extends Component {

	render() {
	  const { create, submitted } = this.props;

	  if(submitted && create === 'students') {
	  	return <Redirect to='/students' />
	  } 
	  else if(submitted && create === 'teachers') {
	  	return <Redirect to='/teachers' />
	  }
	  else if(submitted && create === 'schools') {
	  	return <Redirect to='/schools' />
	  }
	  else if(!submitted) {
	  return (
	  	<div style={{display: 'flex', 
	  	             justifyContent: 'center', 
	  	             flexDirection: 'column' }}>
	  	  <h2>Basic Information</h2>
	  	  {create === 'students' &&
	  	  <StudentCreate />}

	  	</div>
	  )
	}
	}
}

class StudentCreate extends Component {
  
  constructor(){
  	super()
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
  	const { writeName, writeGPA, writeSubjects } = this.props;
  	if (e.target.name === 'name') {writeName(e.target.value)}
  	else if (e.target.name === 'gpa') {writeGPA(e.target.value)}
  	else if (e.target.name === 'subjects') {writeSubjects(e.target.value)}
  }

  handleSubmit(e){
  	e.preventDefault()
  	const { create, name, gpa, subjects, _createStudent, flipSubmitted } = this.props
  	_createStudent( create, {name, gpa, subjects})
  	flipSubmitted()
  }

  render() {
  	const { name, gpa, subjects } = this.props;
  	const { handleChange, handleSubmit } = this;
  	return (
  	  <div>
  	    <form onChange={handleChange} onSubmit={handleSubmit}>
	  	  <label>Name</label>
	  	  <input type='text'
	  	  		 name='name'
	  	         value={name}></input>
  	      <label>GPA</label>
  	      <input type='text'
  	             name='gpa'
  	    	     value={gpa}></input>
  	      <label>Subjects</label>
  	      <input type='text'
  	             name='subjects'
  	             value={subjects}></input>
  	      <button>Submit</button>
	  	</form>
  	  </div>
  	)
  }
}

// class TeacherCreate extends Component {

//   render(){

//   	return (
//   	<div>
//   	<hr />
//   	</div>
//   	)
//   }
// }

// class SchoolCreate extends Component {

//   render(){

//   	return (
//   	<div>
//   	<hr />
//   	</div>
//   	)
//   }
// }

const mapStateToProps = (state, ownProps) => {
  const { create, name, gpa, extracurricular, subjects, gender, address, description } = state.creating
  return { 
  	create: create,
  	name: name,
  	gpa: gpa,
  	extracurricular: extracurricular,
  	subjects: subjects,
  	gender: gender,
  	address: address,
  	description: description
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeGPA: (gpa) => dispatch(writeGPA(gpa)),
  writeExtra: (ex) => dispatch(writeExtra(ex)),
  writeGender: (gender) => dispatch(writeGender(gender)),
  writeSubjects: (subjects) => dispatch(writeSubjects(subjects)),
  writeAddress: (address) => dispatch(writeAddress(address)),
  writeDescription: (description) => dispatch(writeDescription(description)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createStudent: (search, input) => dispatch(_createStudent(search, input))
})

connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
// connect(mapStateToProps, mapDispatchToProps)(TeacherCreate);
// connect(mapStateToProps, mapDispatchToProps)(SchoolCreate);

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)