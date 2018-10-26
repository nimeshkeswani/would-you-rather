import { SET_REDIRECT_URL } from '../actions/redirectURL'

export default function redirectURL (state = null, action) {
	switch(action.type) {
		case SET_REDIRECT_URL :
			return action.url
		default :
			return state
	}
}