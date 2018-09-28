import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunkMiddleware } from 'react-redux'
import { loggingMiddleware } from 'redux-logger'
import studentsReducer, { studentsState } from './students'
import teachersReducer, { teachersState } from './teachers'
import schoolsReducer, { schoolsState } from './schools'



const reducer = combineReducers({
  studentsReducer,
  teachersReducer,
  schoolsReducer
});

const store = createStore(reducer)
export default store;