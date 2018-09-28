// import { createStore } from 'redux'
// import { thunkMiddleware } from 'react-redux'

// INITAL STATE
export const initialState = {
  directory: [],
  input: ''
}

// ACTION TYPES
const GET_TEACHERS = 'GET_TEACHERS'

// ACTION CREATORS
export const getTeachers = (teachers) => {
  type: GET_TEACHERS,
  teachers
}

// STUDENT REDUCER
const teachers = (state = initialState, action) => {
  switch(action.type) {
  	case GET_TEACHERS:
  	  return ({
  	  	...state,
  	  	directory: action.teachers
  	  })
  	default:
  	return state
  }
}

export default teachers;