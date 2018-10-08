 import axios from 'axios'


 // INITIAL STATE
 const initialState = {
   prof: '',
   editing: false,
   currentlyEditing: {}
 }


// ACTION TYPE
const PROFILE_TYPE = 'PROFILE_TYPE'
const RESET_PROFILE = 'RESET_PROFILE'
const EDITING_PROFILE = 'EDITING_PROFILE'
const RESET_EDIT = 'RESET_EDIT'

// ACTION CREATOR
export const profileType = prof => ({
   type: PROFILE_TYPE,
   prof
})

export const resetProfile = () => ({
  type: RESET_PROFILE
})

export const resetEditing = () => ({
  type: RESET_EDIT
})

export const editingProfile = info => ({
  type: EDITING_PROFILE,
  info
})

// THUNK CREATORS
export const _editStudent = input => async dispatch => {
  const name = input.name;
  const gpa = input.gpa*1;
  const extracurricular = input.extracurricular.split(' ');
  const schoolId = input.enrollment;
  const response = await axios.put(`/api/shazam/edit/students/${input.id}`, { name, gpa, extracurricular, schoolId })
  const student = response.data;
}

export const _editTeacher = input => async dispatch => {
  const name = input.name;
  const gender = input.gender;
  const subjects = input.subjects.split(' ');
  const schoolId = input.employment;
  const response = await axios.put(`/api/shazam/edit/teachers/${input.id}`, { name, gender, subjects, schoolId })
  const teacher = response.data;
}

export const _editSchool = input => async dispatch => {
  const name = input.name;
  const address = input.address || null;
  const description = input.description || null;
  const response = await axios.put(`/api/shazam/edit/schools/${input.id}`, { name, address, description })
  const school = response.data;
}

// PROFILE REDUCER
const profile = (state = initialState, action) => {
  switch(action.type) {
  	case PROFILE_TYPE:
  	  return {
  	  	...state,
  	  	prof: action.prof
  	  }

  	case RESET_PROFILE:
  	  return {
  	  	prof: ''
  	  }

  	case RESET_EDIT:
  	  return {
  	  	...state,
  	  	editing: false
  	  }

  	case EDITING_PROFILE:
  	  return {
  	  	...state,
  	  	editing: true,
  	  	currentlyEditing: action.info
  	  }

  	default:
  	  return state;
  }
}

export default profile;