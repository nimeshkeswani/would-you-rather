import { GET_USERS } from '../actions/users'
import { ASK_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
	switch(action.type) {
		case GET_USERS :
			return {
				...state,
				...action.users
			}
		case ASK_QUESTION :
			const { question } = action
			return {
				...state,
				[action.question.author]: {
					...state[action.question.author],
					questions: state[action.question.author].questions.concat([question.id])
				}
			}
		default :
			return state
	}
}