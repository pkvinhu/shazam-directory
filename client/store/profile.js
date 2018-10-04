 // INITIAL STATE
 const initialState = {
   profile: ''
 }


// ACTION TYPE
const PROFILE_TYPE = 'PROFILE_TYPE'
const RESET_PROFILE = 'RESET_PROFILE'

// ACTION CREATOR
export const profileType = profile => ({
   type: PROFILE_TYPE,
   profile
})

export const resetProfile = () => ({
  type: RESET_PROFILE
})


// PROFILE REDUCER
const profile = (state = initialState, action) => {
  switch(action.type) {
  	case PROFILE_TYPE:
  	  return {
  	  	...state,
  	  	profile: action.profile
  	  }

  	case RESET_PROFILE:
  	  return {
  	  	...state,
  	  	profile: ''
  	  }

  	default:
  	  return state;
  }
}

export default profile;