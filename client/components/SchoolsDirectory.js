import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchSchools, _fetchSchProfile } from '../store/schools'
import { profileType } from '../store/profile'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'

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
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '50%' }}>
  	    <tbody>
  	    <tr style={borderStyle}>
  	      {categories.map((category, idx) => {
            return (
              <th key={idx}>{category} </th>
            )
          })}
  	    </tr>
  	    {schools.map((school, idx) => {
  	      return(
  	      	<tr key={school.id} style={borderStyle}>
  	      	  <th style={borderStyle}>{school.name}</th>
  	      	  <th style={borderStyle}>{school.address}</th>
              <th style={borderStyle}><button name={school.id} onClick={handleClick}>See Profile</button></th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	    </table>
  	  </div>
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