import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flipSubmit, clear } from '../store/search'

class SearchInformation extends Component {
  // componentWillUnmount(){
  // 	this.props.clear();
  // }

  render() {
  	const { data } = this.props;

  	const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }

  	if(data.length > 0) {
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '50%' }}>
  	      {!data[0].admin &&
  	       <StudentBody data={data} borderStyle={borderStyle}/>}
  	      {data[0].address &&
  	      	<SchoolBody data={data} borderStyle={borderStyle}/>}
  	      {data[0].admin &&
  	      	<TeacherBody data={data} borderStyle={borderStyle}/>}
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
  	const { data, borderStyle } = this.props;
  	console.log('This is data', data)
  	const categories = [ 'First Name', 'GPA', 'Extracurriculars' ]
  	return (
  	  <tbody>
  	    {categories.map(c => (<th>{c}</th>))}
  	    {data.map((each, idx) => {
  	    return(
  	      	<tr style={borderStyle}>
  	      	  <th style={borderStyle}>{each.name}</th>
  	      	  <th style={borderStyle}>{each.gpa}</th>
  	      	  <th style={borderStyle}>{each.extracurricular || 'None'}</th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	)
  }
}

class TeacherBody extends Component {

  render() {
  	const { data, borderStyle } = this.props;
  	const categories = [ 'Name', 'Subjects']
  	return (
  	  <tbody>
  	    {categories.map(c => (<th>{c}</th>))}
  	    {data.map((each, idx) => {
  	    return(
  	      	<tr style={borderStyle}>
  	      	  <th style={borderStyle}>{each.name}</th>
  	      	  <th style={borderStyle}>{each.subjects.join(', ') || 'None'}</th>
  	      	</tr>
  	      )
  	    })}
  	  </tbody>
  	)
  }
}

class SchoolBody extends Component {

  render() {
  	const { data, borderStyle } = this.props;
  	const categories = [ 'Name', 'Address']
  	return (
  	  <tbody>
  	    {categories.map(c => (<th>{c}</th>))}
  	    {data.map((each, idx) => {
  	    return(
  	      	<tr style={borderStyle}>
  	      	  <th style={borderStyle}>{each.name}</th>
  	      	  <th style={borderStyle}>{each.address}</th>
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
  flipSubmit: () => dispatch(flipSubmit()),
  clear: () => dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInformation)