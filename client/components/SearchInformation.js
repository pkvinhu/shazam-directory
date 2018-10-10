import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flipSubmit, clearQuery } from '../store/search'
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Button, CircularProgress } from '@material-ui/core'

class SearchInformation extends Component {
  constructor(){
  	super()
  	this.state={
  	  loading: true
  	}
  	this.loading = this.loading.bind(this);
  }

  componentWillMount(){
  	this.loader = setInterval(
      () => this.loading(),
      3000
    );
  }

  componentWillUnmount(){
  	clearInterval(this.loader);
  	this.props.clear();
  }

  loading(){
  	this.setState({ loading: false})
  }

  render() {
  	const { data, search, submitted } = this.props;

  	const borderStyle = { 
      border: '1px solid black', 
      padding: '25px' 
    }
    if (submitted === true || this.state.loading) {
  	  return (
  	    <div style={{ display:'flex', justifyContent:'center'}}>
  	      <CircularProgress size={100} color='secondary'/>
  	    </div>
  	  )
    }
  	else if(data.length > 0) {
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '50%' }}>
  	      {data[0].gpa &&
  	       <StudentBody data={data} borderStyle={borderStyle}/>}
  	      {data[0].address &&
  	      	<SchoolBody data={data} borderStyle={borderStyle}/>}
  	      {data[0].admin &&
  	      	<TeacherBody data={data} borderStyle={borderStyle}/>}
  	    </table>
  	  </div>
  	)
  } 
  else {
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
  	const categories = [ 'First Name', 'GPA', 'Extracurriculars' ]
  	return (
  	<Paper style={{ padding: '35px', display: 'flex', justifyContent: 'center'}}>
  	  <Table>
  	  <TableBody>
  	  <TableRow>
  	    {categories.map((c, idx) => (<TableCell key={idx}>{c}</TableCell>))}
  	  </TableRow>
  	    {data.map((each, idx) => {
  	    return(
  	      	<TableRow key={each.id} >
  	      	  <TableCell >{each.name}</TableCell>
  	      	  <TableCell >{each.gpa}</TableCell>
  	      	  <TableCell >{each.extracurricular || 'None'}</TableCell>
  	      	</TableRow>
  	      )
  	    })}
  	    </TableBody>
  	    </Table>
  	  </Paper>
  	)
  }
}

class TeacherBody extends Component {

  render() {
  	const { data, borderStyle } = this.props;
  	const categories = [ 'Name', 'Subjects']
  	return (
  	<Paper style={{ padding: '35px', display: 'flex', justifyContent: 'center'}}>
  	<Table>
  	  <TableBody>
  	  <TableRow>
  	    {categories.map((c, idx) => (<TableCell key={idx}>{c}</TableCell>))}
  	  </TableRow>
  	    {data.map((each, idx) => {
  	    return(
  	      	<TableRow key={each.id} >
  	      	  <TableCell >{each.name}</TableCell>
  	      	  <TableCell >{each.subjects || 'None'}</TableCell>
  	      	</TableRow>
  	      )
  	    })}
  	    </TableBody>
  	    </Table>
  	  </Paper>
  	)
  }
}

class SchoolBody extends Component {

  render() {
  	const { data, borderStyle } = this.props;
  	const categories = [ 'Name', 'Address']
  	return (
  	<Paper style={{ padding: '35px', display: 'flex', justifyContent: 'center'}}>
  	  <Table>
  	  <TableBody>
  	  <TableRow>
  	    {categories.map((c, idx) => (<TableCell key={idx}>{c}</TableCell>))}
  	  </TableRow>
  	    {data.map((each, idx) => {
  	    return(
  	      	<TableRow key={each.id} >
  	      	  <TableCell >{each.name}</TableCell>
  	      	  <TableCell >{each.address}</TableCell>
  	      	</TableRow>
  	      )
  	    })}
  	    </TableBody>
  	    </Table>
  	  </Paper>
  	)
  }
}

const mapStateToProps = state => {
	const { filteredQuery, search, submitted } = state.search
	return { 
		data: filteredQuery,
		search: search,
		submitted: submitted
		}
}

const mapDispatchToProps = dispatch => ({
  flipSubmit: () => dispatch(flipSubmit()),
  clear: () => dispatch(clearQuery())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInformation)