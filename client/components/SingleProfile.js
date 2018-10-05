import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCurrentStu } from '../store/students' 
import { clearCurrentT } from '../store/teachers' 
import { clearCurrentSch } from '../store/schools'
import { resetProfile } from '../store/profile' 
import StudentProfile from './StudentProfile'
import TeacherProfile from './TeacherProfile'
import SchoolProfile from './SchoolProfile'

class SingleProfile extends Component {

  componentWillUnmount(){
  	const { clearCurrentStu, clearCurrentT, clearCurrentSch, prof, resetProfile, editing } = this.props;
  	if(prof === 'students' && !editing ) {clearCurrentStu()}
  	else if (prof === 'teachers' && !editing) {clearCurrentT()}
  	else if (prof === 'schools' && !editing) {clearCurrentSch()}
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
  	{prof === 'students' &&
  	<StudentProfile stylez={stylez} theStudent={student}/>
  	}  	
  	{prof === 'teachers' &&
  	<TeacherProfile stylez={stylez} theTeacher={teacher}/>
  	}  
  	{prof === 'schools' &&
  	<SchoolProfile stylez={stylez} theSchool={school}/>
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
  	currentlyEditing: currentlyEditing
  }
}

const mapDispatchToProps = dispatch => ({
  clearCurrentStu: () => dispatch(clearCurrentStu()),
  clearCurrentT: () => dispatch(clearCurrentT()),
  clearCurrentSch: () => dispatch(clearCurrentSch()),
  resetProfile: () => dispatch(resetProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProfile)