import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchStudents } from '../store/students'
import { writeName, 
	     writeGPA, 
	     writeExtra,
	     flipSubmitted,
	     _createStudent,
	     reset } from '../store/create'

class StudentCreate extends Component {
  
  constructor(){
  	super()
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
  	const { writeName, writeGPA, writeExtra } = this.props;
  	if (e.target.name === 'name') {writeName(e.target.value)}
  	else if (e.target.name === 'gpa') {writeGPA(e.target.value)}
  	else if (e.target.name === 'extracurricular') {writeExtra(e.target.value)}
  }

  handleSubmit(e){
  	e.preventDefault()
  	const { create, name, gpa, extracurricular, _createStudent, flipSubmitted } = this.props
  	_createStudent( create, {name, gpa, extracurricular})
  	.then(()=>flipSubmitted());
  }

  componentWillUnmount(){
  	this.props.flipSubmitted()
  	this.props.reset()
  }

  render() {
  	const { name, gpa, extracurricular } = this.props;
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
  	      <label>GPA</label>
  	      <input type='text'
  	             name='gpa'
  	    	     value={gpa}></input>
  	      <label>Extracurricular</label>
  	      <input type='text'
  	             name='extracurricular'
  	             value={extracurricular}
  	             style={{ height: '40px', padding: '5px'}}></input>
  	      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
  	      <button style={{ width: '15%' }}>Submit</button>
  	      </div>
	  	</form>
  	)
  }
}

const mapStateToProps = state => {
  const { create, name, gpa, extracurricular } = state.creating
  return {
  	create: create,
  	name: name,
  	gpa: gpa,
  	extracurricular: extracurricular
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeGPA: (gpa) => dispatch(writeGPA(gpa)),
  writeExtra: (ex) => dispatch(writeExtra(ex)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createStudent: (search, input) => dispatch(_createStudent(search, input)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate)