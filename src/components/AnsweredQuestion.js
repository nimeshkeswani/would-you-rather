import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'

class AnsweredQuestion extends Component {

	render() {

		const { authedUser, question, author, isAnswered, totalVotes, optionOneVotes, optionTwoVotes, optionOnePercVotes, optionTwoPercVotes, authedUserVote } = this.props

		if (!authedUser) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<p style={{ 'border-width': '1px', 'border-color': 'black', 'border-style': 'solid' }}>
				<p>
					<img src={author.avatarURL} alt="" height="42" width="42"/>
					<br/>
					{author.name} asked:
				</p>
				<p>
					Would you rather {question.optionOne.text}? - {optionOneVotes} out of {totalVotes} votes ({optionOnePercVotes}%)
					 {authedUserVote === 'optionOne' ? ' - Your Vote' : ''}
				</p>
				<p>
					Would you rather {question.optionTwo.text}? - {optionTwoVotes} out of {totalVotes} votes ({optionTwoPercVotes}%)
					 {authedUserVote === 'optionTwo' ? ' - Your Vote' : ''}
				</p>
				</p>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props
	const authedUserInfo = authedUser ? users[authedUser] : null
	const question = questions[id]
	const author = question ? users[question.author] : null
	const isAnswered = authedUser && question ? users[authedUser].answers[question.id] : null
	const totalVotes = question ? Object.keys(users).map((user) => (users[user].answers[question.id] ? 1 : 0)).reduce((a, b) => a + b, 0) : null
	const optionOneVotes = question ? Object.keys(users).map((user) => (users[user].answers[question.id] === 'optionOne' ? 1 : 0)).reduce((a, b) => a + b, 0) : null
	const optionTwoVotes = question ? Object.keys(users).map((user) => (users[user].answers[question.id] === 'optionTwo' ? 1 : 0)).reduce((a, b) => a + b, 0) : null
	const optionOnePercVotes = optionOneVotes / totalVotes * 100
	const optionTwoPercVotes = optionTwoVotes / totalVotes * 100
	const authedUserVote = authedUserInfo ? authedUserInfo.answers[question.id] : null

	return {
		authedUser,
		question,
		author,
		isAnswered,
		totalVotes,
		optionOneVotes,
		optionTwoVotes,
		optionOnePercVotes,
		optionTwoPercVotes,
		authedUserVote,
	}
}

export default connect(mapStateToProps)(AnsweredQuestion)