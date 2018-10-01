import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fetchSchools } from '../store/schools'
import { Link } from 'react-router-dom'

class SchoolsDirectory extends Component {
  
  componentDidMount(){
    this.props._fetchSchools()
  }

  render() {
  	const { schools } = this.props;
  	
    const categories = [ 'Name', 'Address', '' ];
    
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
              <th key={idx}>{category} </th>
            )
          })}
  	    </tr>
  	    {schools.map((school, idx) => {
  	      return(
  	      	<tr style={borderStyle}>
  	      	  <th style={borderStyle}>{school.name}</th>
  	      	  <th style={borderStyle}>{school.address}</th>
              <th style={borderStyle}><button><Link to={`/schools/${school.id}`}>See Profile</Link></button></th>
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