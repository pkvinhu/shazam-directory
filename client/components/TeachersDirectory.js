import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchTeachers, _fetchTProfile } from '../store/teachers'
import { profileType } from '../store/profile'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Button } from '@material-ui/core'

class TeachersDirectory extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    const { profileType, _fetchTProfile } = this.props;
    _fetchTProfile(e.target.name)
    .then(() => profileType('teachers'))
  }

  componentDidMount() {
    const { _fetchTeachers, clear, reset } = this.props;
    _fetchTeachers()
    clear()
    reset()
  }

  render() {
    const { teachers, profile, currentTeacher } = this.props;
    const { handleClick } = this;

  	const categories = [ 'Name', 'Subjects', '' ];

    const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

    if(profile) {
      return (<Redirect to={`/teachers/${currentTeacher.id}`} />)
    } else if(!profile || currentTeacher === 'undefined') {
  	return (
  	 <Paper style={{ display: 'flex', justifyContent: 'center', padding: '35px' }}>
  	    <Table style={{ width: '60%' }}>
  	    <TableBody>
  	    <TableRow >
  	      {categories.map((category, idx) => {
            return (
              <TableCell key={idx}>{category}</TableCell>
            )
            })}
  	    </TableRow>
  	    {teachers.map((teacher, idx) => {
  	      return(
  	      	<TableRow key={teacher.id} >
  	      	  <TableCell >{teacher.name}</TableCell>
  	      	  <TableCell >{teacher.subjects || 'None'}</TableCell>
              <TableCell><button name={teacher.id} onClick={handleClick} component={Link} to={`/teachers/${teacher.id}`} color='primary'>Profile</button></TableCell>
  	      	</TableRow>
  	      )
  	    })}
  	    </TableBody>
  	    </Table>
  	  </Paper>
  	)
  }
  }
}

const mapStateToProps = (state) => {
  const { directory, input, profile, currentTeacher } = state.teachers
  return {  
  	teachers: directory,
  	input: input,
    profile: profile,
    currentTeacher: currentTeacher  
  }
}

const mapDispatchToProps = dispatch => ({
  _fetchTeachers: () => dispatch(_fetchTeachers()),
  clear: () => dispatch(clear()),
  reset: () => dispatch(reset()),
  _fetchTProfile: (id) => dispatch(_fetchTProfile(id)),
  profileType: (prof) => dispatch(profileType(prof))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersDirectory)