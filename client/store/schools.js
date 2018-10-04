import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  profile: false,
  currentSchool: {}
}

// ACTION TYPES
const GET_SCHOOLS = 'GET_SCHOOLS'
const PROFILE_VIEW = 'PROFILE_VIEW'
const CLEAR = 'CLEAR'


// ACTION CREATORS
export const getSchools = (schools) => ({
  type: GET_SCHOOLS,
  schools
})

export const profileView = (school) => ({
  type: PROFILE_VIEW,
  school
})

export const clearCurrentSch = () => ({
  type: CLEAR
})

// THUNK CREATORS
export const _fetchSchools = () => async dispatch => {
  const response = await axios.get('/api/shazam/schools')
  const schools = response.data
  dispatch(getSchools(schools))
}

export const _fetchSchProfile = (id) => async dispatch => {
  const response = await axios.get(`/api/shazam/schools/${id}`)
  const school = response.data
  const action = profileView(school)
  dispatch(action)
}


// STUDENT REDUCER
const schools = (state = initialState, action) => {
  switch(action.type) {
  	
  	case GET_SCHOOLS:
  	  return ({
  	  	...state,
  	  	directory: action.schools
  	  })

  	case PROFILE_VIEW:
  	  return {
  	  	...state,
  	  	profile: !state.profile,
  	  	currentSchool: action.school
  	  }

  	case CLEAR:
  	  return {
  	  	...state,
  	  	profile: false,
  	  	currentSchool: {}
  	  }
 	
  	default:
  	return state
  }
}

export default schools;