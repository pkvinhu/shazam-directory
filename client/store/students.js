import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  input: '',
  searching: false
}

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS'
const CURRENT_SEARCH = 'CURRENTLY_SEARCH'


// ACTION CREATORS
export const getStudents = (students) => ({
  type: GET_STUDENTS,
  students
})

export const currentSearchStudents = ({
  type: CURRENT_SEARCH,
})

// THUNK CREATORS
export const _fetchStudents = () => async dispatch => {
  const response = await axios.get('/api/shazam/students')
  const students = response.data
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
  	case CURRENT_SEARCH:
  	  return ({
  	  	...state,
  	  	searching: true
  	  })  	
  	default:
  	return state
  }
}

export default students;