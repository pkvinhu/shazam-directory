import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchStudents, _fetchStuProfile } from '../store/students'
import { profileType } from '../store/profile'
import { clearQuery } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Button } from '@material-ui/core'

class StudentsDirectory extends Component {
  constructor() {
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

   handleClick(id){
  	const { profileType, _fetchStuProfile } = this.props;
  	_fetchStuProfile(id)
  	profileType('students')
  }

  componentDidMount() {
  	const { _fetchStudents, clearQuery, reset } = this.props;
  	_fetchStudents()
  	clearQuery()
    /*
  	reset()*/
  }

  render() {
  	const { students, profile, currentStudent } = this.props;
  	const { handleClick } = this;

  	const categories = [ 'First Name', 'GPA', 'Exracurriculars', ''];

  	const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

  	return (

      <Paper style={{ display: 'flex', justifyContent: 'center', padding: '35px' }}>
  	    <Table style={{ width: '60%' }}>
  	    <TableBody >
  	    <TableRow >
  	      {categories.map((category, idx) => {
  	      	return (
  	      		<TableCell style={{fontStyle: 'bold'}} key={idx}>{category}</TableCell>
  	      	)}
  	      	)}
  	    </TableRow>
  	    {students.map((student, idx) => {
  	      return(
  	      	<TableRow key={student.id} >
  	      	  <TableCell >{student.name}</TableCell>
  	      	  <TableCell >{student.gpa}</TableCell>
  	      	  <TableCell >{student.extracurricular || 'None'}</TableCell>
  	      	  <TableCell >
                <Button onClick={()=>handleClick(student.id)} 
                        component={Link} 
                        to={`/students/${student.id}`}>
                  Profile
                </Button>
              </TableCell>
  	      	</TableRow>
  	      )
  	    })}
  	    </TableBody>
  	    </Table>
        </Paper>

  	)
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
  clearQuery: () => dispatch(clearQuery()),
  reset: () => dispatch(reset()),
  _fetchStuProfile: (id) => dispatch(_fetchStuProfile(id)),
  profileType: (prof) => dispatch(profileType(prof))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsDirectory)