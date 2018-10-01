import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchStudents } from '../store/students'

class StudentsDirectory extends Component {
  
  componentDidMount() {
  	this.props._fetchStudents();
  }

  render() {
  	const { students } = this.props;
  	const categories = [ 'First Name', 'Last Name', 'GPA', 'Exracurriculars'];
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table style={{ outlineStyle: 'solid' }}>
  	    <tbody >
  	    <tr style={{ border: '2px solid black'}}>
  	      {categories.map((category, idx) => {<th key={idx} style={{ border: '2px solid black'}}>{category}</th>})}
  	    </tr>
  	    {students.map((student, idx) => {
  	      return(
  	      	<tr style={{ border: '2px solid black'}}>
  	      	  <th>{student.firstName}</th>
  	      	  <th>{student.lastName}</th>
  	      	  <th>{student.gpa}</th>
  	      	  <th>{student.extracurriculars || 'None'}</th>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsDirectory)