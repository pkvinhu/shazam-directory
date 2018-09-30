import React, { Component } from 'react'

export default class SearchInformation extends Component {
  constructor(props){
  	super(props)
  }

  render() {
  	const { info } = this.props;
  	return (
  	  <div style={{ display: 'flex', justifyContent: 'center' }}>
  	  <table>
  	    <tbody>
  	    {info.map((each, idx) => {
  	      return(
  	      	<tr>
  	      	  <th>{each.name}</th>
  	      	  <th>{each.subjects.join(', ') || 'None'}</th>
  	      	</tr>
  	      )
  	    })}
  	    </tbody>
  	    </table>
  	  </div>
  	)
  }
}

