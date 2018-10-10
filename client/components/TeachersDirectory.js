import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchTeachers, _fetchTProfile } from '../store/teachers'
import { profileType } from '../store/profile'
import { clearQuery } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Button } from '@material-ui/core'

class TeachersDirectory extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id){
    const { profileType, _fetchTProfile } = this.props;
    console.log(id)
    _fetchTProfile(id)
    profileType('teachers')
  }

  componentDidMount() {
    const { _fetchTeachers, clearQuery, reset } = this.props;
    _fetchTeachers()
    clearQuery()
    /*
    reset()*/
  }

  render() {
    const { teachers, profile, currentTeacher } = this.props;
    const { handleClick } = this;

  	const categories = [ 'Name', 'Subjects', '' ];

    const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

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
              <TableCell>
                <Button onClick={()=>handleClick(teacher.id)}
                        component={Link}
                        to={`/teachers/${teacher.id}`}
                        >
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
  clearQuery: () => dispatch(clearQuery()),
  reset: () => dispatch(reset()),
  _fetchTProfile: (id) => dispatch(_fetchTProfile(id)),
  profileType: (prof) => dispatch(profileType(prof))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersDirectory)