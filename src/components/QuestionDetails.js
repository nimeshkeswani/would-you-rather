import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'

class QuestionDetails extends Component {
	render() {

		const { id, authedUser, question, author } = this.props

		if (!authedUser) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<img src={author.avatarURL} height="42" width="42"/>
				<div>
					Would You Rather - {question.optionOne.text} or {question.optionTwo.text}
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	const question = questions[id]
	const author = question ? users[question.author] : null

	return {
		id,
		authedUser,
		question,
		author,
	}
}

export default connect(mapStateToProps)(QuestionDetails)