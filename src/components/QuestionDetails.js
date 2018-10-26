import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UnansweredQuestion from './UnansweredQuestion'
import AnsweredQuestion from './AnsweredQuestion'
import Page404 from './Page404'

class QuestionDetails extends Component {

	render() {

		const { authedUser, question, isAnswered } = this.props

		if (!authedUser) {
			return <Redirect to={{
			          pathname: '/',
			          state: { from: this.props.location }
			        }} />
		}

		if (!question) {
			return (
				<Page404 />
			)
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