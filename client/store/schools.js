import axios from 'axios'

// INITAL STATE
export const initialState = {
  directory: []
}

// ACTION TYPES
const GET_SCHOOLS = 'GET_SCHOOLS'


// ACTION CREATORS
export const getSchools = (schools) => ({
  type: GET_SCHOOLS,
  schools
})


// THUNK CREATORS
export const _fetchSchools = () => async dispatch => {
  const response = await axios.get('/api/shazam/schools')
  const schools = response.data
  dispatch(getSchools(schools))
}

export const _searchSchools = (search, input) => async dispatch => {
  const response = await axios.post(`/api/shazam/search/${search}`, input)
  const schools = response.data;
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
 	
  	default:
  	return state
  }
}

export default schools;