import React, { Component } from 'react'
import SelectForm from './SelectForm'
import CreateForm from './CreateForm'
import { Typography, Paper } from '@material-ui/core'

export default class Welcome extends Component {
  constructor() {
  	super()
  	this.state = {
  	  navigation: ''
  	}
  	this.handleClick = this.handleClick.bind(this)
    this.resetNav = this.resetNav.bind(this)
  }

  handleClick(e) {
    console.log(e.target.innerHTML)
  	this.setState({ [e.target.name]: e.target.innerHTML })
  }

  resetNav(){
    this.setState({ navigation: '' })
    console.log('I am happening', this.state.navigation)
  }

  render() {
  	const { handleClick, resetNav } = this;
  	const options = [ 'search', 'create' ];
    const { navigation } = this.state;
    console.log(navigation)
  	return(
      <Paper style={{ margin: '10px 120px 10px 120px', padding: '50px' }}>
  	    <Typography variant='display2'>
          Welcome to Our School Directory!
        </Typography>
  	    <Typography variant='body1' style={{ padding: '35px' }}>
        You have reached our very reputable school directory. Almost every school that is of any relevance is in our database -- so if your school isn't here, it's time to bring your school back to relevance. We used very advanced analytics in screening schools. You can find all information students and teachers have deemed the public privy to as well by easily using our search option! Please see our options below for further navigation.
        </Typography>
  	    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
  	    {navigation === '' &&
        options.map((option, idx) => {
  	      return (
  	        <button style={{ padding: '15px', 
                             border: '2px solid black', 
                             borderRadius: '50%', 
                             width: '130px', 
                             fontSize: '20px'}} 
                    name='navigation'
                    key={idx} 
                    onClick={handleClick}>{option}</button>
  	      )
  	    })}
        {navigation !== '' &&
          <SelectForm navigation={navigation} reset={resetNav}/> }
  	    </div>
  	  </Paper>
  	)
  }
}