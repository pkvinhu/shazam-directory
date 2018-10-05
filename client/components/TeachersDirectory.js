import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchTeachers, _fetchTProfile } from '../store/teachers'
import { profileType } from '../store/profile'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link, Redirect } from 'react-router-dom'

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
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '50%' }}>
  	    <tbody>
  	    <tr style={borderStyle}>
  	      {categories.map((category, idx) => {
            return (
              <th key={idx}>{category}</th>
            )
            })}
  	    </tr>
  	    {teachers.map((teacher, idx) => {
  	      return(
  	      	<tr key={teacher.id} style={borderStyle}>
  	      	  <th style={borderStyle}>{teacher.name}</th>
  	      	  <th style={borderStyle}>{teacher.subjects || 'None'}</th>
              <th style={borderStyle}><button name={teacher.id} onClick={handleClick}>See Profile</button></th>
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