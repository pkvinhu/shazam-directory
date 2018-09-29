import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  input: ''
}

// ACTION TYPES
const GET_TEACHERS = 'GET_TEACHERS'


// ACTION CREATORS
export const getTeachers = teachers => ({
  type: GET_TEACHERS,
  teachers
})


// THUNK CREATORS
export const _fetchTeachers = () => async dispatch => {
  const response = await axios.get('/api/shazam/teachers')
  const teachers = response.data
  dispatch(getTeachers(teachers))
}

export const _searchTeachers = search => async dispatch => {
  const response = await axios.get(`/api/shazam/${search}/search`)
  const students = response.data;
  dispatch(getTeachers(teachers))
}

// STUDENT REDUCER
const teachers = (state = initialState, action) => {
  switch(action.type) {
  	
  	case GET_TEACHERS:
  	  return {
  	  	...state,
  	  	directory: action.teachers
  	  }

  	default:
  	return state
  }
}

export default teachers;