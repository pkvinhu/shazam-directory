import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchSchools, _fetchSchProfile } from '../store/schools'
import { profileType } from '../store/profile'
import { clearQuery } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Button } from '@material-ui/core'

class SchoolsDirectory extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id){
    const { profileType, _fetchSchProfile } = this.props;
    _fetchSchProfile(id)
    profileType('schools')
  }

  componentDidMount() {
    const { _fetchSchools, clearQuery, reset } = this.props;
    _fetchSchools()
    clearQuery()
    /*
    reset()*/
  }

  render() {
    const { schools, profile, currentSchool } = this.props;
    const { handleClick } = this;
  	
    const categories = [ 'Name', 'Address', '' ];
    
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
              <TableCell key={idx}>{category} </TableCell>
            )
          })}
  	    </TableRow>
  	    {schools.map((school, idx) => {
  	      return(
  	      	<TableRow key={school.id} >
  	      	  <TableCell >{school.name}</TableCell>
  	      	  <TableCell >{school.address}</TableCell>
              <TableCell >
                <Button onClick={()=>handleClick(school.id)}
                        component={Link}
                        to={`/schools/${school.id}`}>
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
  clearQuery: () => dispatch(clearQuery()),
  reset: () => dispatch(reset()),
  _fetchSchProfile: (id) => dispatch(_fetchSchProfile(id)),
  profileType: (prof) => dispatch(profileType(prof))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsDirectory)