import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  profile: false,
  currentStudent: {}
}

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS'
const PROFILE_VIEW = 'PROFILE_VIEW'


// ACTION CREATORS
export const getStudents = (students) => ({
  type: GET_STUDENTS,
  students
})

export const profileView = (student) => ({
  type: PROFILE_VIEW,
  student
})

// THUNK CREATORS
export const _fetchStudents = () => async dispatch => {
  const response = await axios.get('/api/shazam/students')
  const students = response.data
  dispatch(getStudents(students))
}

export const _fetchProfile = (id) => async dispatch => {
  console.log('This too', id)
  const response = await axios.get(`/api/shazam/students/${id}`)
  const student = response.data
  console.log('This is the student', student)
  const action = profileView(student)
  dispatch(action)
}

// STUDENT REDUCER
const students = (state = initialState, action) => {
  switch(action.type) {
  	case GET_STUDENTS:
  	  return {
  	  	...state,
  	  	directory: action.students
  	  }

  	case PROFILE_VIEW:
  	  return {
  	  	...state,
  	  	profile: !state.profile,
  	  	currentStudent: action.student
  	  }
    
  	default:
  	return state
  }
}

export default students;