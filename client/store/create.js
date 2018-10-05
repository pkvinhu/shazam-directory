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
  enrollment: '',
  employment: '',
  submitted: false
}


// ACTION TYPES
const CURRENT_TYPE = 'CURRENT_TYPE'
const WRITE_NAME = 'WRITE_NAME'
const WRITE_GPA = 'WRITE_GPA'
const WRITE_EXTRACURRICULAR = 'WRITE_EXTRACURRICULAR'

const WRITE_GENDER = 'WRITE_GENDER'
const WRITE_SUBJECTS = 'WRITE_SUBJECTS'
const WRITE_ENROLLMENT = 'WRITE_ENROLLMENT'

const WRITE_ADDRESS = 'WRITE_ADDRESS'
const WRITE_DESCRIPTION = 'WRITE_DESCRIPTION'
const WRITE_EMPLOYMENT = 'WRITE_EMPLOYMENT'

const FLIP_SUBMITTED = 'FLIP_SUBMITTED'
const RESET = 'RESET'


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

export const writeEnrollment = school => ({
  type: WRITE_ENROLLMENT,
  school
})

export const writeEmployment = school => ({
  type: WRITE_EMPLOYMENT,
  school
})

export const flipSubmitted = () => ({
  type: FLIP_SUBMITTED
})

export const reset = () => ({
  type: RESET
})


// THUNK CREATORS
export const _createStudent = (create, input) => async dispatch => {
  const name = input.name;
  const gpa = input.gpa*1;
  const extracurricular = input.extracurricular.split(' ');
  const enrollment = input.enrollment;
  const response = await axios.post('/api/shazam/students/create', { name, gpa, extracurricular, enrollment })
  const student = response.data;
  console.log(student)
}

export const _createTeacher = (create, input) => async dispatch => {
  const name = input.name;
  const gender = input.gender;
  const subjects = input.subjects.split(' ');
  const employment = input.employment;
  const response = await axios.post('/api/shazam/teachers/create', { name, gender, subjects, employment })
  const teacher = response.data;
  console.log(teacher)
}

export const _createSchool = (create, input) => async dispatch => {
  const name = input.name;
  const address = input.address || null;
  const description = input.description || null;
  const response = await axios.post('/api/shazam/schools/create', { name, address, description })
  const school = response.data;
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

  	case WRITE_ENROLLMENT:
  	console.log(action.school)
  	  return {
  	  	...state,
  	  	enrollment: action.school
  	  }

  	case WRITE_EMPLOYMENT:

  	  return {
  	  	...state,
  	  	employment: action.school
  	  }

  	case FLIP_SUBMITTED:
      return {
      	...state,
      	submitted: !state.submitted
      }

    case RESET:
      return initialState;

  	default:
  	  return state;
  }
}

export default creating;