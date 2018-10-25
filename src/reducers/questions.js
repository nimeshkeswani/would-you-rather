import { GET_QUESTIONS, ASK_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
	switch(action.type) {
		case GET_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ASK_QUESTION :
			const { question } = action
			return {
				...state,
				[action.question.id]: action.question,
			}
		default :
			return state
	}
}