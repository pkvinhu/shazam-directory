import { createStore } from 'redux'
import { thunkMiddleware } from 'react-redux'

// INITAL STATE
export const studentsState = {
  students: [],
  input: ''
}

// ACTION TYPES


// ACTION CREATORS


// STUDENT REDUCER
const studentsReducer = (state = studentsState, action) => {
  switch(action.type) {
  	
  	default:
  	return state
  }
}

export default studentsReducer;