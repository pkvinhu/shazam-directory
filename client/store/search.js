import axios from 'axios'

// CURRENT SEARCH
const initialState = { 
	search: '',
	input: '',
	filteredQuery: []
}

// ACTION TYPES
const CURRENT_SEARCH = 'CURRENT_SEARCH'
const WRITE_SEARCH = 'WRITE_SEARCH'
const QUERY_DATA = 'QUERY_DATA'


// ACTION CREATORS
export const currentSearch = result => ({
  type: CURRENT_SEARCH,
  result
})

export const writeSearch = content => ({
  type: WRITE_SEARCH,
  content
})

export const query = data => ({
  type: QUERY_DATA,
  data
})

// THUNK CREATORS
export const _searchTeachers = (search, input) => async dispatch => {
  const response = await axios.post(`/api/shazam/search/${search}`, input)
  const students = response.data;
  dispatch(query(teachers))
}

export const _searchStudents = (search, input) => async dispatch => {
  const response = await axios.post(`/api/shazam/search/${search}`, input)
  const students = response.data;
  dispatch(query(students))
  console.log('Thunk', students)
}

export const _searchSchools = (search, input) => async dispatch => {
  const response = await axios.post(`/api/shazam/search/${search}`, input)
  const schools = response.data;
  dispatch(query(schools))
}


// SEARCH REDUCER
const search = (state = initialState, action) => {
  switch (action.type) {
  	case CURRENT_SEARCH:
  	  return { 
  	  	...state, 
  	  	search: action.result
  	  }

  	case WRITE_SEARCH:
      return {
        ...state,
        input: action.content
      }

    case QUERY_DATA:
    console.log('Reducer', action.data)
      return {
      	filteredQuery: action.data,
      	search: '',
      	input: ''
      }

  	default:
  	  return state;
  }
}

export default search;