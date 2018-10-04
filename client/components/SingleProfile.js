import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCurrentStu } from '../store/students' 
import { clearCurrentT } from '../store/teachers' 
import { clearCurrentSch } from '../store/schools'
import { resetProfile } from '../store/profile' 

class SingleProfile extends Component {

  componentWillUnmount(){
  	const { clearCurrentStu, clearCurrentT, clearCurrentSch, profile, resetProfile } = this.props;
  	if(profile === 'students' ) {clearCurrentStu()}
  	else if (profile === 'teachers') {clearCurrentT()}
  	else if (profile === 'schools') {clearCurrentSch()}
  	resetProfile();
  }

  render() {
  	const { profile, student, teacher, school } = this.props;

  	const stylez = { display: 'flex', 
  	  				flexDirection: 'column', 
  	  				width: '350px', 
  	  				border: '2px solid black',
  	  				padding: '20px' }
  	return (
  	<div style={{ display:'flex', justifyContent: 'center' }}>
  	{profile === 'students' &&
  	<StudentProfile stylez={stylez} theStudent={student}/>
  	}  	
  	{profile === 'teachers' &&
  	<TeacherProfile stylez={stylez} theTeacher={teacher}/>
  	}  
  	{profile === 'schools' &&
  	<SchoolProfile stylez={stylez} theSchool={school}/>
  	}  
  	</div>
  	)
  }
}

class StudentProfile extends Component {
  

  render(){
  	const { theStudent, stylez } = this.props;
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <div>{theStudent.img}</div>
	  	  <h1>{theStudent.name}</h1>
	  	  <h3>GPA:</h3>
	  	  <label>{theStudent.gpa}</label>
	  	  <h3>Extracurricular:</h3>
	  	  <label>{theStudent.extracurricular || 'None' }</label>
	  	</div>
	  	<div style={{ display:'flex', flexDirection: 'row-reverse'}}>
	  	  <button>EDIT</button>
	  	</div>
	  </div>
  	)
  }
}

class TeacherProfile extends Component {
  

  render(){
  	const { theTeacher, stylez } = this.props;
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <div>{theTeacher.img}</div>
	  	  <h1>{theTeacher.name}</h1>
	      <h3>Subjects:</h3>
	  	  <label>{theTeacher.subjects}</label>
	  	</div>
  	  	<div style={{ display:'flex', flexDirection: 'row-reverse'}}>
	  	  <button>EDIT</button>
	  	</div>
	  </div>
  	)
  }
}

class SchoolProfile extends Component {
  

  render(){
  	const { theSchool, stylez } = this.props;
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <div>{theSchool.img}</div>
	  	  <h1>{theSchool.name}</h1>
	  	  <h3>Address:</h3>
	  	  <label>{theSchool.address}</label>
	  	  <h3>Description:</h3>
	  	  <label>{theSchool.description}</label>
	  	</div>
  	  	<div style={{ display:'flex', flexDirection: 'row-reverse'}}>
	  	  <button>EDIT</button>
	  	</div>
	  </div>
  	)
  }
}

const mapStateToProps = state => {
  return { 
  	student: state.students.currentStudent,
  	teacher: state.teachers.currentTeacher,
  	school: state.schools.currentSchool,
  	profile: state.profile.profile
  }
}

const mapDispatchToProps = dispatch => ({
  clearCurrentStu: () => dispatch(clearCurrentStu()),
  clearCurrentT: () => dispatch(clearCurrentT()),
  clearCurrentSch: () => dispatch(clearCurrentSch()),
  resetProfile: () => dispatch(resetProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProfile)