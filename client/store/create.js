import axios from 'axios'


// INITIAL STATE
const initialState = {
  create: '',
  name: '',
  gpa: '',
  subjects: '',
  extracurricular: '',
  address: '',
  teacherGender: '',
  schoolDescription: '',
  submitted: false
}


// ACTION TYPES
const CURRENT_TYPE = 'CURRENT_TYPE'
const WRITE_NAME = 'WRITE_NAME'
const WRITE_GPA = 'WRITE_GPA'
const WRITE_EXTRACURRICULAR = 'WRITE_EXTRACURRICULAR'

const WRITE_GENDER = 'WRITE_GENDER'
const WRITE_SUBJECTS = 'WRITE_SUBJECTS'

const WRITE_ADDRESS = 'WRITE_ADDRESS'
const WRITE_DESCRIPTION = 'WRITE_DESCRIPTION'

const FLIP_SUBMIT = 'FLIP_SUBMIT'


// ACTION CREATORS
export const currentType = current => ({
  type: CURRENT_TYPE,
  current
})

export const writeName = name => ({
  type: WRITE_NAME,
  name
})

export const writeGPA = gpa => ({
  type: WRITE_GPA,
  gpa
})

export const writeExtra = ex => ({
  type: WRITE_EXTRACURRICULAR,
  ex
})

export const writeGender = gender => ({
  type: WRITE_GENDER,
  gender
})

export const writeSubjects = subjects => ({
  type: WRITE_SUBJECTS,
  subjects
})

export const writeAddress = address => ({
  type: WRITE_ADDRESS,
  address
})

export const writeDes = description => ({
  type: WRITE_DESCRIPTION,
  description
})

export const flipSubmit = () => ({
  type: FLIP_SUBMIT
})


// THUNK CREATORS
export const _createStudent = (create, input) => async dispatch => {
  const name = input.name;
  const gpa = input.gpa*1;
  const subjects = input.subjects.split(' ').trim();
  const response = await axios.post(`/api/shazam/${create}/create`, { name, gpa, subjects })
  const student = response.data;
}


// CREATE REDUCER
const creating = (state = initialState, action) => {
  switch (action.type) {

  	case CURRENT_TYPE:
  	  return {
  	  	...state,
  	  	create: action.current
  	  }

  	case WRITE_NAME:
  	  return {
  	  	...state,
  	  	name: action.name
  	  }

  	case WRITE_GPA:
  	  return {
  	  	...state,
  	  	gpa: action.gpa  	  
  	  }

  	case WRITE_EXTRACURRICULAR:
  	  return {
  	  	...state,
  	  	extracurricular: action.ex
  	  }

  	case WRITE_GENDER:
  	  return {
  	  	...state,
  	  	gender: action.gender
  	  }

  	case WRITE_SUBJECTS:
  	  return {
  	  	...state,
  	  	subjects: action.subjects
  	  }

  	case WRITE_ADDRESS:
  	  return {
  	  	...state,
  	  	address: action.address
  	  }

  	case WRITE_DESCRIPTION:
  	  return {
  	  	...state,
  	  	description: action.description
  	  }

  	case FLIP_SUBMIT:
      return {
      	...state,
      	submitted: !state.submitted
      }

  	default:
  	  return state;
  }
}

export default creating;