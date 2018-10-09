import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { editingProfile, profileType, resetProfile } from '../store/profile'
import { writeName,
		     writeAddress, 
	       writeDes,
	       flipSubmitted } from '../store/create'
import { Card, CardMedia, CardContent, Typography, Paper, Button, Icon } from '@material-ui/core'

class SchoolProfile extends Component {
  constructor(){
  	super()
  	this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.props.profileType('schools')
  }

  componentWillUnMount(){
    this.props.resetProfile();
  }

  handleClick(e){
  	const { editingProfile, 
  		    school, 
  		    writeName, 
  		    writeAddress, 
  		    writeDes } = this.props
  	writeName(school.name)
  	if(school.address) {writeAddress(school.address)}
  	if(school.description) {writeDes(school.description)}
  	editingProfile(school)
  }

  render(){
  	const { school, stylez, prof, editing } = this.props;
  	const { handleClick } = this;

  	return (
      <div style={{ width: '60%', padding: '50px'}}>
      <Card style={{ padding: '20px'}}>
      <CardMedia 
      image={school.img}
      style={{ height:'300px'}}>
      </CardMedia>
        <CardContent>
        <Typography variant='display1' centered>
          {school.name}
        </Typography>
        <br />
        <Typography variant='title' centered>
          Address:
        </Typography>
        <Typography variant='body1' centered>
          {school.address}
        </Typography>
        <br />
        <Typography variant='title' centered>
          Description:
        </Typography>
        <Typography variant='body1' centered>
          {school.description || 'None' }
        </Typography>
      </CardContent>
      </Card>
      <div style={{ display:'flex', flexDirection: 'row-reverse'}}>
        <Button onClick={handleClick}
                component={Link}
                to={`/edit/${prof}/${school.id}`}>
          <Icon>edit_icon</Icon>
        </Button>
      </div>
    </div>
  	)
  }
}

const mapStateToProps = state => {
  const { prof, editing, currentlyEditing } = state.profile
  return { 
  	school: state.schools.currentSchool,
  	prof: prof,
  	editing: editing,
  	currentlyEditing: currentlyEditing
  }
}

const mapDispatchToProps = dispatch => ({
  editingProfile: (info) => dispatch(editingProfile(info)),
  profileType: (t) => dispatch(profileType(t)),
  resetProfile: () => dispatch(resetProfile()),
  writeName: (name) => dispatch(writeName(name)),
  writeAddress: (address) => dispatch(writeAddress(address)),
  writeDes: (description) => dispatch(writeDes(description)),
  flipSubmitted: () => dispatch(flipSubmitted())
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolProfile)