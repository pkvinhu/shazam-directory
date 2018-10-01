import React, { Component } from 'react'

export default class CreateForm extends Component {

	render() {

	  return (
	  	<div style={{display: 'flex', 
	  	             justifyContent: 'center', 
	  	             flexDirection: 'column' }}>
	  	  <h2>Create</h2>
	  	  <form>
	  	    <input type='text'></input>
	  	    <button>Submit</button>
	  	  </form>
	  	</div>
	  )
	}
}