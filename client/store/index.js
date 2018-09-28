import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import students from './students'
import teachers from './teachers'
import schools from './schools'


const reducer = combineReducers({
  students,
  teachers,
  schools
});

const store = createStore(reducer, applyMiddleware(loggingMiddleware, thunkMiddleware))
export default store;