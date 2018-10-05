import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCurrentStu } from '../store/students' 
import { clearCurrentT } from '../store/teachers' 
import { clearCurrentSch } from '../store/schools'
import { resetProfile } from '../store/profile' 

class SingleProfile extends Component {

  componentWillUnmount(){
  	const { clearCurrentStu, clearCurrentT, clearCurrentSch, prof, resetProfile } = this.props;
  	if(prof === 'students' ) {clearCurrentStu()}
  	else if (prof === 'teachers') {clearCurrentT()}
  	else if (prof === 'schools') {clearCurrentSch()}
  	resetProfile();
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

class StudentProfile extends Component {
  

  render(){
  	const { theStudent, stylez } = this.props;
  	return (
  	  <div>
	  	<div style={stylez}>
	  	  <img src={theStudent.img} />
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
	  	  <img src={theTeacher.img} />
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
	  	  <img src={theSchool.img} />
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
  	prof: state.profile.prof
  }
}

const mapDispatchToProps = dispatch => ({
  clearCurrentStu: () => dispatch(clearCurrentStu()),
  clearCurrentT: () => dispatch(clearCurrentT()),
  clearCurrentSch: () => dispatch(clearCurrentSch()),
  resetProfile: () => dispatch(resetProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProfile)