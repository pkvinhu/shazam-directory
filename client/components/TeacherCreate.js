import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeName, 
	     writeGender, 
	     writeSubjects,
	     _createTeacher,
	     flipSubmitted,
	     reset } from '../store/create'

class TeacherCreate extends Component {
constructor(){
  	super()
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
  	const { writeName, writeGender, writeSubjects } = this.props;
  	if (e.target.name === 'name') {writeName(e.target.value)}
  	else if (e.target.name === 'gender') {writeGender(e.target.value)}
  	else if (e.target.name === 'subjects') {writeSubjects(e.target.value)}
  }

  handleSubmit(e){
  	e.preventDefault()
  	const { create, name, gender, subjects, _createTeacher, flipSubmitted } = this.props
  	_createTeacher( create, {name, gender, subjects})
  	.then(()=>flipSubmitted());
  }

  componentWillUnmount(){
  	this.props.flipSubmitted()
  	this.props.reset()
  }

  render() {
  	const { name, gender, subjects } = this.props;
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
  	      <label>Gender</label>
  	      <select name='gender'>
  	             <option value={gender}>--</option>
  	    	     <option value={gender}>M</option>
  	    	     <option value={gender}>F</option>
  	    	     </select>
  	      <label>Subjects</label>
  	      <input type='text'
  	             name='subjects'
  	             value={subjects}
  	             style={{ height: '40px', padding: '5px'}}></input>
  	      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
  	      <button style={{ width: '15%' }}>Submit</button>
  	      </div>
	  	</form>
  	)
  }
}

const mapStateToProps = state => {
  const { create, name, subjects, gender } = state.creating
  return {
  	create: create,
  	name: name,
  	subjects: subjects,
  	gender: gender
  }
}

const mapDispatchToProps = dispatch => ({
  writeName: (name) => dispatch(writeName(name)),
  writeGender: (gender) => dispatch(writeGender(gender)),
  writeSubjects: (subjects) => dispatch(writeSubjects(subjects)),
  flipSubmitted: () => dispatch(flipSubmitted()),
  _createTeacher: (search, input) => dispatch(_createTeacher(search, input)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreate)