import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'

class SearchInformation extends Component {
  constructor() {
  	super()
  }

  render() {
  	const { data } = this.props;
  	console.log(data)
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table>
  	      {data[0].firstName &&
  	       <StudentBody />}
  	      {data[0].address &&
  	      	<SchoolBody />}
  	      {data[0].admin &&
  	      	<TeacherBody />}
  	      {!data.length &&
  	      	<h3 style={{ backgroundColor: 'yellow' }}>The information you have searched does not exist. Please try again!</h3>}
  	    </table>
  	  </div>
  	)
  }
}

class StudentBody extends Component {

  render() {
  	const { data } = this.props;
  	console.log('This is data', data)
  	const categories = [ 'First Name', 'Last Name', 'GPA', 'Extracurriculars' ]
  	return (
  	  <tbody>
  	    {categories.map(c => (<th>{c}</th>))}
  	    {data.map((each, idx) => {
  	    return(
  	      	<tr>
  	      	  <th>{each.firstName}</th>
  	      	  <th>{each.lastName}</th>
  	      	  <th>{each.gpa}</th>
  	      	  <th>{each.extracurricular || 'None'}</th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	)
  }
}

class TeacherBody extends Component {

  render() {
  	const { data } = this.props;
  	const categories = [ 'Name', 'Subjects']
  	return (
  	  <tbody>
  	    {categories.map(c => (<th>{c}</th>))}
  	    {data.map((each, idx) => {
  	    return(
  	      	<tr>
  	      	  <th>{each.name}</th>
  	      	  <th>{each.subjects || 'None'}</th>
  	      	</tr>
  	      )
  	    })}
  	  </tbody>
  	)
  }
}

class SchoolBody extends Component {

  render() {
  	const { data } = this.props;
  	const categories = [ 'Name', 'Address']
  	return (
  	  <tbody>
  	    {categories.map(c => (<th>{c}</th>))}
  	    {data.map((each, idx) => {
  	    return(
  	      	<tr>
  	      	  <th>{each.name}</th>
  	      	  <th>{each.address}</th>
  	      	</tr>
  	      )
  	    })}
  	  </tbody>
  	)
  }
}

const mapStateToProps = state => {
    console.log('This is ', state.search.filteredQuery)
	const {filteredQuery} = state.search
	return { data: filteredQuery }
}
connect(mapStateToProps)(StudentBody)
connect(mapStateToProps)(TeacherBody)
connect(mapStateToProps)(SchoolBody)
export default connect(mapStateToProps)(SearchInformation)