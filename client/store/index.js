import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import students from './students'
import teachers from './teachers'
import schools from './schools'
import search from './search'
import creating from './create'
import profile from './profile'

const reducer = combineReducers({
  students,
  teachers,
  schools,
  search,
  creating,
  profile
});

const store = createStore(reducer, applyMiddleware(loggingMiddleware, thunkMiddleware))
export default store;