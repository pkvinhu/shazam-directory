import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCurrentStu, _fetchStudents } from '../store/students' 
import { clearCurrentT, _fetchTeachers } from '../store/teachers' 
import { clearCurrentSch, _fetchSchools } from '../store/schools'
import { resetProfile } from '../store/profile' 
import StudentProfile from './StudentProfile'
import TeacherProfile from './TeacherProfile'
import SchoolProfile from './SchoolProfile'
import { CircularProgress } from '@material-ui/core'

class SingleProfile extends Component {

  componentDidMount(){
  	const { _fetchStudents, _fetchTeachers, _fetchSchools } = this.props;
  	_fetchStudents();
  	_fetchTeachers();
  	_fetchSchools();
  }

  componentWillUnmount(){
  	const { clearCurrentStu, clearCurrentT, clearCurrentSch, prof, resetProfile, editing } = this.props;
  	/*if(prof === 'students' && !editing ) {clearCurrentStu()}
  	else if (prof === 'teachers' && !editing) {clearCurrentT()}
  	else if (prof === 'schools' && !editing) {clearCurrentSch()}*/
  }

  render() {
  	const { prof, student, teacher, school } = this.props;

  	const stylez = { display: 'flex', 
  	  				flexDirection: 'column', 
  	  				width: '500px', 
  	  				border: '2px solid black',
  	  				padding: '20px' }

  	return (
  	<div style={{ display:'flex', justifyContent: 'center' }}>
  	{(prof === 'students' && student !== undefined) &&
  	<StudentProfile stylez={stylez} /> 
  	}  	
  	{(prof === 'teachers' && teacher !== undefined) &&
  	<TeacherProfile stylez={stylez} /> 
  	}  
  	{(prof === 'schools' && school !== undefined) &&
  	<SchoolProfile stylez={stylez} /> 
  	}  
  	{(prof === 'students' && !student || prof === 'teachers' && !teacher || prof === 'schools' && !school) &&
  	<CircularProgress size={50} color='secondary'/>
  	}
  	</div>
  	)
  }
}


const mapStateToProps = state => {
  const { prof, editing, currentlyEditing } = state.profile
  return { 
  	prof: prof,
  	editing: editing,
  	currentlyEditing: currentlyEditing,
  	student: state.students.currentStudent,
  	teacher: state.teachers.currentTeacher,
  	school: state.schools.currentSchool
  }
}

const mapDispatchToProps = dispatch => ({
  clearCurrentStu: () => dispatch(clearCurrentStu()),
  clearCurrentT: () => dispatch(clearCurrentT()),
  clearCurrentSch: () => dispatch(clearCurrentSch()),
  resetProfile: () => dispatch(resetProfile()),
  _fetchStudents: () => dispatch(_fetchStudents()),
  _fetchTeachers: () => dispatch(_fetchTeachers()),
  _fetchSchools: () => dispatch(_fetchSchools())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProfile)