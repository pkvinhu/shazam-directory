import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  profile: false,
  currentTeacher: {}
}

// ACTION TYPES
const GET_TEACHERS = 'GET_TEACHERS'
const PROFILE_VIEW = 'PROFILE_VIEW'
const CLEAR = 'CLEAR'

// ACTION CREATORS
export const getTeachers = teachers => ({
  type: GET_TEACHERS,
  teachers
})

export const profileView = (teacher) => ({
  type: PROFILE_VIEW,
  teacher
})

export const clearCurrentT = () => ({
  type: CLEAR
})

// THUNK CREATORS
export const _fetchTeachers = () => async dispatch => {
  const response = await axios.get('/api/shazam/teachers')
  const teachers = response.data
  dispatch(getTeachers(teachers))
}

export const _fetchTProfile = (id) => async dispatch => {
  const response = await axios.get(`/api/shazam/teachers/${id}`)
  const teacher = response.data
  const action = profileView(teacher)
  dispatch(action)
}

// STUDENT REDUCER
const teachers = (state = initialState, action) => {
  switch(action.type) {
  	
  	case GET_TEACHERS:
  	  return {
  	  	...state,
  	  	directory: action.teachers
  	  }

   	case PROFILE_VIEW:
  	  return {
  	  	...state,
  	  	profile: !state.profile,
  	  	currentTeacher: action.teacher
  	  }

  	case CLEAR:
  	  return {
  	  	...state,
  	  	profile: false,
  	  	currentTeacher: {}
  	  }

  	default:
  	return state
  }
}

export default teachers;