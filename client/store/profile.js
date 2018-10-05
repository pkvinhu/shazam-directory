 // INITIAL STATE
 const initialState = {
   prof: '',
   editing: false,
   currentlyEditing: {}
 }


// ACTION TYPE
const PROFILE_TYPE = 'PROFILE_TYPE'
const RESET_PROFILE = 'RESET_PROFILE'
const EDITING = 'EDITING'

// ACTION CREATOR
export const profileType = prof => ({
   type: PROFILE_TYPE,
   prof
})

export const resetProfile = () => ({
  type: RESET_PROFILE
})

export const editing = (info) => ({
  type: EDITING,
  info
})


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
  	  	prof: '',
  	  	editing: false,
  	  	currentlyEditing: {}
  	  }

  	case EDITING:
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