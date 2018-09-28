import React, { Component } from 'react'
import { connect } from 'react-redux'

class TeachersDirectory extends Component {
  
  render() {
  	const { teachers } = this.props;
  	const categories = [ 'Name', 'Subjects' ];
  	return (
  	  <div>
  	    <table>
  	    <tbody>
  	    <tr>
  	      {categories.map((category, idx) => {<th key={idx}>{category}</th>})}
  	    </tr>
  	    {teachers.map((teacher, idx) => {
  	      return(
  	      	<tr>
  	      	  <th>{teacher.name}</th>
  	      	  <th>{teacher.subjects || 'None'}</th>
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

export default connect(mapStateToProps)(TeachersDirectory)