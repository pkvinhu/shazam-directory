import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: []
}

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS'


// ACTION CREATORS
export const getStudents = (students) => ({
  type: GET_STUDENTS,
  students
})

// THUNK CREATORS
export const _fetchStudents = () => async dispatch => {
  const response = await axios.get('/api/shazam/students')
  const students = response.data
  dispatch(getStudents(students))
}

export const _searchStudents = search => async dispatch => {
  const response = await axios.get(`/api/shazam/${search}/search`)
  const students = response.data;
  dispatch(getStudents(students))
}

// STUDENT REDUCER
const students = (state = initialState, action) => {
  switch(action.type) {
  	case GET_STUDENTS:
  	  return ({
  	  	...state,
  	  	directory: action.students
  	  })
    
  	default:
  	return state
  }
}

export default students;