 // INITIAL STATE
 const initialState = {
   profile: ''
 }


// ACTION TYPE
const PROFILE_TYPE = 'PROFILE_TYPE'


// ACTION CREATOR
export const profileType = profile => ({
   type: PROFILE_TYPE,
   profile
})


// PROFILE REDUCER
const profile = (state = initialState, action) => {
  switch(action.type) {
  	case PROFILE_TYPE:
  	  return {
  	  	...state,
  	  	profile: action.profile
  	  }

  	default:
  	  return state;
  }
}

export default profile;