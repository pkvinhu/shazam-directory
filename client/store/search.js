import axios from 'axios'

// CURRENT SEARCH
const initialState = { 
	search: '',
	input: '',
	filteredQuery: [],
	submitted: false
}

// ACTION TYPES
const CURRENT_SEARCH = 'CURRENT_SEARCH'
const WRITE_SEARCH = 'WRITE_SEARCH'
const QUERY_DATA = 'QUERY_DATA'
// const LOAD_QUERY = 'LOAD_QUERY'
const FLIP_SUBMIT = 'FLIP_SUBMIT'


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

// export const loadQuery = () => ({
//   type: LOAD_QUERY
// })

export const flipSubmit = () => ({
  type: FLIP_SUBMIT
})

// THUNK CREATORS
export const _searchData = (search, input) => async dispatch => {
  const response = await axios.post(`/api/shazam/search/${search}`, input)
  const info = response.data;
  const action = query(info)
  dispatch(action)
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
    // case LOAD_QUERY:
    //   return {...state}
    case FLIP_SUBMIT:
      return {
      	...state,
      	submitted: !state.submitted
      }

  	default:
  	  return state;
  }
}

export default search;