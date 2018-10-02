import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchTeachers } from '../store/teachers'
import { clear } from '../store/search'
import { reset } from '../store/create'
import { Link } from 'react-router-dom'

class TeachersDirectory extends Component {
  
  componentDidMount() {
    const { _fetchTeachers, clear, reset } = this.props;
    _fetchTeachers()
    clear()
    reset()
  }

  render() {
  	const { teachers } = this.props;

  	const categories = [ 'Name', 'Subjects', '' ];

    const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

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
  	      	<tr style={borderStyle}>
  	      	  <th style={borderStyle}>{teacher.name}</th>
  	      	  <th style={borderStyle}>{teacher.subjects.join(', ') || 'None'}</th>
              <th style={borderStyle}><button><Link to={`/teachers/${teacher.id}`}>See Profile</Link></button></th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	    </table>
  	  </div>
  	)
  }
}

const mapStateToProps = (state) => {
  const { directory, input } = state.teachers
  return {  
  	teachers: directory,
  	input: input 
  }
}

const mapDispatchToProps = dispatch => ({
  _fetchTeachers: () => dispatch(_fetchTeachers()),
  clear: () => dispatch(clear()),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersDirectory)