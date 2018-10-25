import { showLoading, hideLoading } from 'react-redux-loading'
import { askQuestion, answerQuestion } from '../api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ASK_QUESTION = 'ASK_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const UNANSWER_QUESTION = 'UNANSWER_QUESTION'

export function receiveQuestions(questions) {
	return {
		type: GET_QUESTIONS,
		questions
	}
}

export function addQuestion(question) {
	return {
		type: ASK_QUESTION,
		question
	}
}

export function handleAskQuestion (optionOneText, optionTwoText, author) {
  return (dispatch, getState) => {
    
    const { authedUser } = getState()

    dispatch(showLoading)

    return askQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function addAnswer(authedUser, qid, answer) {
	return {
		type: ANSWER_QUESTION,
		authedUser,
		qid,
		answer
	}
}

export function removeAnswer(authedUser, qid, answer) {
	return {
		type: UNANSWER_QUESTION,
		authedUser,
		qid,
		answer
	}
}

export function handleAddAnswer (authedUser, qid, answer) {
  return (dispatch) => {

    dispatch(addAnswer(authedUser, qid, answer))

    return answerQuestion({
    	authedUser,
    	qid,
    	answer,
    })
      .catch((e) => {
        console.warn('Error in handleAddAnswer: ', e)
        dispatch(removeAnswer(authedUser, qid, answer))
        alert('The was an error answering the question. Try again.')
      })
  }
}
