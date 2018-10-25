import { GET_USERS } from '../actions/users'
import { ASK_QUESTION, ANSWER_QUESTION, UNANSWER_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
	const { authedUser, qid, answer } = action
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
		case ANSWER_QUESTION :
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
			}
		case UNANSWER_QUESTION :
			const { [qid]: value, ...withoutAnswer } = state[authedUser].answers;
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						withoutAnswer
					}
				}
			}
		default :
			return state
	}
}