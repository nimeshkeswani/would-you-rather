import { showLoading, hideLoading } from 'react-redux-loading'
import { askQuestion } from '../api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ASK_QUESTION = 'ASK_QUESTION'

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