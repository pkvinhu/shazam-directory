import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  input: '',
  searching: false
}

// ACTION TYPES
const GET_TEACHERS = 'GET_TEACHERS'
const CURRENT_SEARCH = 'CURRENTLY_SEARCH'

// ACTION CREATORS
export const getTeachers = (teachers) => ({
  type: GET_TEACHERS,
  teachers
})

export const currentSearchTeachers = ({
  type: CURRENT_SEARCH,
})

// THUNK CREATORS
export const _fetchTeachers = () => async dispatch => {
  const response = await axios.get('/api/shazam/teachers')
  const teachers = response.data
  dispatch(getTeachers(teachers))
}

// STUDENT REDUCER
const teachers = (state = initialState, action) => {
  switch(action.type) {
  	case GET_TEACHERS:
  	  return ({
  	  	...state,
  	  	directory: action.teachers
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

export default teachers;