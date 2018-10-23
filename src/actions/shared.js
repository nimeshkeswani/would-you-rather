import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { getUsers, getQuestions, getInitialData } from '../api'

export function handleInitialUserData() {
	return (dispatch) => {
		dispatch(showLoading())
		return getUsers()
			.then(({ users }) => {
				dispatch(receiveUsers(users))
				dispatch(hideLoading())
			})
	}
}

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({users, questions}) => {
				dispatch(receiveUsers(users))
				dispatch(receiveQuestions(questions))
				dispatch(hideLoading())
			})
	}
}