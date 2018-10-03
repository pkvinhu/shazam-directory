import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchStudents, _fetchProfile } from '../store/students'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'

class StudentsDirectory extends Component {
  constructor() {
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
  	e.preventDefault();
  	console.log('This', e.target.name)
  	this.props._fetchProfile(e.target.name)
  }

  componentDidMount() {
  	const { _fetchStudents, clear, reset } = this.props;
  	_fetchStudents()
  	clear()
  	reset()
  }

  render() {
  	const { students, profile, currentStudent } = this.props;
  	const { handleClick } = this;

  	const categories = [ 'First Name', 'GPA', 'Exracurriculars', 'Profile Picture', ''];

  	const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }
    if(profile) {
      return (<Redirect to={`/students/${currentStudent.id}`} />)
    } 
    else if(!profile) {
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '70%' }}>
  	    <tbody >
  	    <tr style={borderStyle}>
  	      {categories.map((category, idx) => {
  	      	return (
  	      		<th key={idx}>{category}</th>
  	      	)}
  	      	)}
  	    </tr>
  	    {students.map((student, idx) => {
  	      return(
  	      	<tr style={borderStyle}>
  	      	  <th style={borderStyle}>{student.name}</th>
  	      	  <th style={borderStyle}>{student.gpa}</th>
  	      	  <th style={borderStyle}>{student.extracurricular || 'None'}</th>
  	      	  <th style={borderStyle}>{student.img}</th>
  	      	  <th style={borderStyle}><button name={student.id} onClick={handleClick}>See Profile</button></th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	    </table>
  	  </div>
  	)
    }
  }
}

const mapStateToProps = (state) => {
  const { directory, input, profile, currentStudent } = state.students
  return {  
  	students: directory,
  	input: input,
  	profile: profile,
  	currentStudent: currentStudent 
  }
}

const mapDispatchToProps = (dispatch) => ({
  _fetchStudents: () => dispatch(_fetchStudents()),
  clear: () => dispatch(clear()),
  reset: () => dispatch(reset()),
  _fetchProfile: (id) => dispatch(_fetchProfile(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsDirectory)