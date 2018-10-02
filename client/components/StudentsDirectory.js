import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchStudents } from '../store/students'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link } from 'react-router-dom'

class StudentsDirectory extends Component {
  
  componentDidMount() {
  	const { _fetchStudents, clear, reset } = this.props;
  	_fetchStudents()
  	clear()
  	reset()
  }

  render() {
  	const { students } = this.props;

  	const categories = [ 'First Name', 'GPA', 'Exracurriculars', 'Profile Picture', ''];

  	const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

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
  	      	  <th style={borderStyle}><button><Link to={`/students/${student.id}`}>See Profile</Link></button></th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	    </table>
  	  </div>
  	)
  }
}

const mapStateToProps = (state) => {
  const { directory, input } = state.students
  return {  
  	students: directory,
  	input: input 
  }
}

const mapDispatchToProps = (dispatch) => ({
  _fetchStudents: () => dispatch(_fetchStudents()),
  clear: () => dispatch(clear()),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsDirectory)