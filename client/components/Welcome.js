import React, { Component } from 'react'
import SelectForm from './SelectForm'
import CreateForm from './CreateForm'
import { Typography, Paper, Button } from '@material-ui/core'

export default class Welcome extends Component {
  constructor() {
  	super()
  	this.state = {
  	  navigation: ''
  	}
  	this.handleClick = this.handleClick.bind(this)
    this.resetNav = this.resetNav.bind(this)
  }

  handleClick(option) {
  	this.setState({ navigation: option })
  }

  resetNav(){
    this.setState({ navigation: '' })
    console.log('I am happening', this.state.navigation)
  }

  render() {
  	const { handleClick, resetNav } = this;
  	const options = [ 'search', 'create' ];
    const { navigation } = this.state;

  	return(
      <Paper style={{ margin: '10px 120px 10px 120px', padding: '50px' }}>
  	    <Typography variant='display2'>
          Welcome to Our School Directory!
        </Typography>
  	    <Typography variant='body1' style={{ padding: '35px' }}>
        You have reached our very reputable school directory. Almost every school that is of any relevance is in our database -- so if your school isn't here, it's time to bring your school back to relevance. We used very advanced analytics in screening schools. You can find all information students and teachers have deemed the public privy to as well by easily using our search option! Please see our options below for further navigation.
        </Typography>
  	    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
  	    {navigation === '' ?
        options.map((option, idx) => {
  	      return (
  	        <Button key={idx} 
                    onClick={()=>handleClick(option)}>{option}</Button>
  	      )
  	    }) :
        <SelectForm navigation={navigation} reset={resetNav}/> }
  	    </div>
  	  </Paper>
  	)
  }
}