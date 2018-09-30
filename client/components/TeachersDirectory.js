import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchTeachers } from '../store/teachers'

class TeachersDirectory extends Component {
  
  componentDidMount() {
    this.props._fetchTeachers()
  }

  render() {
  	const { teachers } = this.props;
  	const categories = [ 'Name', 'Subjects' ];
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table>
  	    <tbody>
  	    <tr>
  	      {categories.map((category, idx) => {<th key={idx}>{category}</th>})}
  	    </tr>
  	    {teachers.map((teacher, idx) => {
  	      return(
  	      	<tr>
  	      	  <th>{teacher.name}</th>
  	      	  <th>{teacher.subjects.join(', ') || 'None'}</th>
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
  _fetchTeachers: () => dispatch(_fetchTeachers())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersDirectory)