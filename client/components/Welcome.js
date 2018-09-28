import React, { Component } from 'react'

export default class Welcome extends Component {
  constructor() {
  	super()
  	this.state = {
  	  option: ''
  	}
  	this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
  	this.setState({ option: e.target.type })
  }

  render() {
  	const { handleClick } = this;
  	const options = [ 'search', 'create', 'update' ]
  	return(
  	  <div style={{ margin: '10px 120px 10px 120px' }}>
  	    <h1>Welcome to School Directory!</h1>
  	    <p>You have reached our very reputable school directory. Almost every school that is of any relevance is in our database -- so if your school isn't here, it's time to bring your school back to relevance. We used very advanced analytics in screening schools. You can find all information students and teachers have deemed the public privy to as well by easily using our search option! Please see our options below for further navigation.</p>
  	    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
  	    {options.map((option, idx) => {
  	      return (
  	        <button style={{ padding: '15px', border: '2px solid black', borderRadius: '50%', width: '130px', fontSize: '20px'}} key={idx} type={option} onClick={handleClick}>{option}</button>
  	      )
  	    })}
  	    </div>
  	  </div>
  	)
  }
}