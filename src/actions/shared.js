import { getUsers } from './users'
import { getQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../api'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({users, questions}) => {
				dispatch(getUsers(users))
				dispatch(getQuestions(questions))
				dispatch(setAuthedUser(AUTHED_ID))
				dispatch(hideLoading())
			})
	}
}