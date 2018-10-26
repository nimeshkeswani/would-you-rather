export const SET_REDIRECT_URL = 'SET_REDIRECT_URL'

export function setRedirectURL (url) {
	return {
		type: SET_REDIRECT_URL,
		url,
	}
}