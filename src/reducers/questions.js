import { GET_QUESTIONS, ASK_QUESTION, ANSWER_QUESTION, UNANSWER_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
	const { authedUser, qid, answer } = action
	switch(action.type) {
		case GET_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ASK_QUESTION :
			return {
				...state,
				[action.question.id]: action.question,
			}
		case ANSWER_QUESTION :
			return {
				...state,
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			}
		case UNANSWER_QUESTION :
			return {
				...state,
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.filter((user) => (user !== authedUser))
					}
				}
			}
		default :
			return state
	}
}