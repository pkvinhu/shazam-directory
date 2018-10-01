import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flipSubmit } from '../store/search'

class SearchInformation extends Component {
  constructor() {
  	super()
  }

  componentWillUnmount(){
  	this.props.flipSubmit();
  }

  render() {
  	const { data } = this.props;
  	console.log('This', data)
  	if(data.length > 0) {
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table>
  	      {data[0].firstName &&
  	       <StudentBody data={data}/>}
  	      {data[0].address &&
  	      	<SchoolBody data={data}/>}
  	      {data[0].admin &&
  	      	<TeacherBody data={data}/>}
  	    </table>
  	  </div>
  	)
  } else {
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <h3 style={{ backgroundColor: 'yellow' }}>The information you have searched does not exist. Please try again!</h3>
  	  </div>
  	)
  }
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
  	      	  <th>{each.subjects.join(', ') || 'None'}</th>
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
	const { filteredQuery } = state.search
	return { data: filteredQuery }
}

const mapDispatchToProps = dispatch => ({
  flipSubmit: () => dispatch(flipSubmit())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInformation)