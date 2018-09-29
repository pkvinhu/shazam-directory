import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchSchools } from '../store/schools'

class SchoolsDirectory extends Component {
  
  componentDidMount(){
    this.props._fetchSchools()
  }

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
  	    {schools.map((school, idx) => {
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

const mapDispatchToProps = dispatch => ({
  _fetchSchools: () => dispatch(_fetchSchools())
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsDirectory)