import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import UnansweredQuestion from './UnansweredQuestion'
import AnsweredQuestion from './AnsweredQuestion'

class QuestionDetails extends Component {
	render() {

		const { authedUser, question, isAnswered } = this.props

		if (!authedUser) {
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
	const authedUserInfo = authedUser ? users[authedUser] : null
	const question = questions[id]
	const isAnswered = authedUser && question ? users[authedUser].answers[question.id] : null

	return {
		authedUser,
		question,
		isAnswered,
	}
}

export default connect(mapStateToProps)(QuestionDetails)