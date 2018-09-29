import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: [],
  input: '',
  search: false
}

// ACTION TYPES
const GET_SCHOOLS = 'GET_SCHOOLS'
const CURRENT_SEARCH = 'CURRENTLY_SEARCH'

// ACTION CREATORS
export const getSchools = (schools) => ({
  type: GET_SCHOOLS,
  schools
})

export const currentSearchSchools = ({
  type: CURRENT_SEARCH,
})

// THUNK CREATORS
export const _fetchSchools = () => async dispatch => {
  const response = await axios.get('/api/shazam/schools')
  const schools = response.data
  dispatch(getSchools(schools))
}

// STUDENT REDUCER
const schools = (state = initialState, action) => {
  switch(action.type) {
  	case GET_SCHOOLS:
  	  return ({
  	  	...state,
  	  	directory: action.schools
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

export default schools;