import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editingProfile, profileType, resetProfile } from '../store/profile'
import { writeName, 
	     writeGPA, 
	     writeExtra,
       writeEnrollment,
	     flipSubmitted } from '../store/create'
import { Card, CardMedia, CardContent, Typography, Paper } from '@material-ui/core'

class StudentProfile extends Component {
  constructor(){
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.props.profileType('students')
  }

  componentWillUnMount(){
    this.props.resetProfile();
  }

  handleClick(e){
  	const { editingProfile, 
  		    student, 
  		    writeName, 
  		    writeGPA, 
  		    writeExtra, 
  		    writeEnrollment } = this.props
    writeName(student.name)
    writeGPA(student.gpa)
    if(student.extracurricular) { writeExtra(student.extracurricular)}
    if(student.school) { writeEnrollment(student.school.name)}
  	editingProfile(student)
  }

  render(){
  	const { student, stylez, editing, prof } = this.props;
  	const { handleClick } = this;
  	
  	if(editing) {
  		return (<Redirect to={`/edit/${prof}/${student.id}`}/>)
  	} else {
  	return (
  	  <div style={{ width: '55%', padding: '50px'}}>
	  	<Card style={{ padding: '20px'}}>
      <CardMedia 
      image={student.img}
      style={{ height:'300px'}}>
      </CardMedia>
	  	  <CardContent>
	  	  <Typography variant='display1' centered>
          {student.name}
        </Typography>
        <br />
	  	  <Typography variant='title' centered>
          GPA:
        </Typography>
	  	  <Typography variant='body1' centered>
          {student.gpa}
        </Typography>
        <br />
	  	  <Typography variant='title' centered>
          Extracurricular:
        </Typography>
	  	  <Typography variant='body1' centered>
          {student.extracurricular || 'None' }
        </Typography>
        <br />
	  	  <Typography variant='title' centered>
          School:
        </Typography>
	  	  {!student.school ?
	  	  <Typography variant='body1' centered>None</Typography> :
	  	  <Typography variant='body1' centered>{student.school.name}</Typography>}
      </CardContent>
	  	</Card>
	  	<div style={{ display:'flex', flexDirection: 'row-reverse'}}>
	  	  <button onClick={handleClick}>EDIT</button>
	  	</div>
	  </div>
  	)
  }
  }
}

const mapStateToProps = state => {
  const { prof, editing, currentlyEditing } = state.profile
  return { 
  	student: state.students.currentStudent,
  	prof: prof,
  	editing: editing,
  	currentlyEditing: currentlyEditing
  }
}

const mapDispatchToProps = dispatch => ({
  editingProfile: (info) => dispatch(editingProfile(info)),
  profileType: (t) => dispatch(profileType(t)),
  resetProfile: () => dispatch(resetProfile()),
  writeName: (name) => dispatch(writeName(name)),
  writeGPA: (gpa) => dispatch(writeGPA(gpa)),
  writeExtra: (ex) => dispatch(writeExtra(ex)),
  writeEnrollment: (school) => dispatch(writeEnrollment(school)),
  flipSubmitted: () => dispatch(flipSubmitted()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile)