export const GET_USERS = 'GET_USERS'

export function receiveUsers(users) {
	return {
		type: GET_USERS,
		users
	}
}