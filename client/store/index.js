import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import students from './students'
import teachers from './teachers'
import schools from './schools'
import search from './search'
import creating from './create'

const reducer = combineReducers({
  students,
  teachers,
  schools,
  search,
  creating
});

const store = createStore(reducer, applyMiddleware(loggingMiddleware, thunkMiddleware))
export default store;