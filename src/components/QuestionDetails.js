import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UnansweredQuestion from './UnansweredQuestion'
import AnsweredQuestion from './AnsweredQuestion'
import { setRedirectURL } from '../actions/redirectURL'

class QuestionDetails extends Component {

	addRedirectURL = (url) => {
		this.props.dispatch(setRedirectURL(url))
	}

	render() {

		const { authedUser, question, isAnswered } = this.props
		const { url } = this.props.match

		if (!authedUser) {
			this.addRedirectURL(url)
			return <Redirect to='/' />
		}

		if (isAnswered) {
			return (
				<AnsweredQuestion id={question.id}/>
			)
		}
		else {
			return (
				<UnansweredQuestion id={question.id}/>
			)
		}
		
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	const question = questions[id]
	const isAnswered = authedUser && question ? users[authedUser].answers[question.id] : null

	return {
		authedUser,
		question,
		isAnswered,
	}
}

export default connect(mapStateToProps)(QuestionDetails)