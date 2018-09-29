import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import students from './students'
import teachers from './teachers'
import schools from './schools'

// CURRENT SEARCH
const initialState = { 
	search: '',
	input: ''
}

const CURRENT_SEARCH = 'CURRENT_SEARCH'
const WRITE_SEARCH = 'WRITE_SEARCH'

export const currentSearch = search => ({
  type: CURRENT_SEARCH,
  search
})

export const writeSearch = content => ({
  type: WRITE_SEARCH,
  content
})

const search = (state = initialState, action) => {
  switch (action.type) {
  	case CURRENT_SEARCH:
  	  return { 
  	  	...state, 
  	  	search: action.search
  	  }

  	case WRITE_SEARCH:
      return {
        ...state,
        input: action.content
      }

  	default:
  	  return state;
  }
}

const reducer = combineReducers({
  students,
  teachers,
  schools,
  search
});

const store = createStore(reducer, applyMiddleware(loggingMiddleware, thunkMiddleware))
export default store;