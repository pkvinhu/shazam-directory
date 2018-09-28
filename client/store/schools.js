import { createStore } from 'redux'
import { thunkMiddleware } from 'react-redux'

// INITAL STATE
export const schoolsState = {
  schools: [],
  input: ''
}

// ACTION TYPES


// ACTION CREATORS


// STUDENT REDUCER
const schoolsReducer = (state = schoolsState, action) => {
  switch(action.type) {
  	
  	default:
  	return state
  }
}

export default schoolsReducer