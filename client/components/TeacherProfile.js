import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editingProfile, profileType, resetProfile } from '../store/profile'
import { writeName, 
	     writeGender, 
	     writeSubjects,
         writeEmployment,
         flipSubmitted } from '../store/create'
import { Card, CardMedia, CardContent, Typography, Paper } from '@material-ui/core'

class TeacherProfile extends Component {
  constructor(){
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.props.profileType('teachers')
  }

  componentWillUnMount(){
    this.props.resetProfile();
  }

  handleClick(e){
  	const { editingProfile, 
  		    teacher, 
  		    writeName, 
  		    writeGender, 
  		    writeSubjects, 
  		    writeEmployment } = this.props
  	writeName(teacher.name)
  	writeGender(teacher.gender)
  	if(teacher.subjects){writeSubjects(teacher.subjects)}
  	if(teacher.school){ writeEmployment(teacher.school.name)}
  	editingProfile(teacher)
  }

  render(){
  	const { teacher, stylez, editing, prof } = this.props;
  	const { handleClick } = this;

  	if(editing) {
  		return (<Redirect to={`/edit/${prof}/${teacher.id}`} />)
  	} else {
  	return (
  	  <div style={{ width: '55%', padding: '50px'}}>
      <Card style={{ padding: '20px'}}>
      <CardMedia 
      image={teacher.img}
      style={{ height:'300px'}}>
      </CardMedia>
        <CardContent>
        <Typography variant='display1' centered>
          {teacher.name}
        </Typography>
        <br />
        <Typography variant='title' centered>
          Gender:
        </Typography>
        <Typography variant='body1' centered>
          {teacher.gender}
        </Typography>
        <br />
        <Typography variant='title' centered>
          Subjects:
        </Typography>
        <Typography variant='body1' centered>
          {teacher.subjects || 'None' }
        </Typography>
        <br />
        <Typography variant='title' centered>
          School:
        </Typography>
        {!teacher.school ?
        <Typography variant='body1' centered>None</Typography> :
        <Typography variant='body1' centered>{teacher.school.name}</Typography>}
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
  	teacher: state.teachers.currentTeacher,
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
  writeGender: (gender) => dispatch(writeGender(gender)),
  writeSubjects: (subjects) => dispatch(writeSubjects(subjects)),
  writeEmployment: (school) => dispatch(writeEmployment(school)),
  flipSubmitted: () => dispatch(flipSubmitted())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile)