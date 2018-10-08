import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchSchools, _fetchSchProfile } from '../store/schools'
import { profileType } from '../store/profile'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'
import { Table, TableBody, TableHead, TableRow, TableCell, Paper } from '@material-ui/core'

class SchoolsDirectory extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    const { profileType, _fetchSchProfile } = this.props;
    _fetchSchProfile(e.target.name)
    .then(() => profileType('schools'))
  }

  componentDidMount() {
    const { _fetchSchools, clear, reset } = this.props;
    _fetchSchools()
    clear()
    reset()
  }

  render() {
    const { schools, profile, currentSchool } = this.props;
    const { handleClick } = this;
  	
    const categories = [ 'Name', 'Address', '' ];
    
    const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

    if(profile) {
      return (<Redirect to={`/schools/${currentSchool.id}`} />)
    } else {
  	return (

      <Paper style={{ display: 'flex', justifyContent: 'center', padding: '35px' }}>
  	    <Table style={{ width: '60%' }}>
  	    <TableBody>
  	    <TableRow >
  	      {categories.map((category, idx) => {
            return (
              <TableCell key={idx}>{category} </TableCell>
            )
          })}
  	    </TableRow>
  	    {schools.map((school, idx) => {
  	      return(
  	      	<TableRow key={school.id} >
  	      	  <TableCell >{school.name}</TableCell>
  	      	  <TableCell >{school.address}</TableCell>
              <TableCell ><button name={school.id} onClick={handleClick}>See Profile</button></TableCell>
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
  const { directory, input, profile, currentSchool } = state.schools
  return {  
  	schools: directory,
  	input: input,
    profile: profile,
    currentSchool: currentSchool  
  }
}

const mapDispatchToProps = dispatch => ({
  _fetchSchools: () => dispatch(_fetchSchools()),
  clear: () => dispatch(clear()),
  reset: () => dispatch(reset()),
  _fetchSchProfile: (id) => dispatch(_fetchSchProfile(id)),
  profileType: (prof) => dispatch(profileType(prof))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsDirectory)