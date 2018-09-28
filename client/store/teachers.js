import { createStore } from 'redux'
import { thunkMiddleware } from 'react-redux'

// INITAL STATE
export const teachersState = {
  teachers: [],
  input: ''
}

// ACTION TYPES


// ACTION CREATORS


// STUDENT REDUCER
const teachersReducer = (state = teachersState, action) => {
  switch(action.type) {
  	
  	default:
  	return state
  }
}

export default teachersReducer;