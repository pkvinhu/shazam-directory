import React, { Component } from 'react'
import { connect } from 'react-redux'

class SchoolsDirectory extends Component {
  
  render() {
  	const { schools } = this.props;
  	const categories = [ 'Name', 'Address' ];
  	return (
  	  <div>
  	    <table>
  	    <tbody>
  	    <tr>
  	      {categories.map((category, idx) => {<th key={idx}>{category}</th>})}
  	    </tr>
  	    {schools.map((teacher, idx) => {
  	      return(
  	      	<tr>
  	      	  <th>{school.name}</th>
  	      	  <th>{school.address}</th>
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
  const { directory, input } = state.schools
  return {  
  	schools: directory,
  	input: input 
  }
}

export default connect(mapStateToProps)(SchoolsDirectory)