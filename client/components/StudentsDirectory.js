import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentsDirectory extends Component {
  
  render() {
  	const { students } = this.props;
  	return (
  	  <div>
  	  
  	  </div>
  	)
  }
}

const mapStateToProps = (state) => ({
  students: state.students
});

export default connect(mapStateToProps)(StudentsDirectory)