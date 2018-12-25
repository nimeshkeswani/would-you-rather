import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import '../styles/AnsweredQuestion.css'

class AnsweredQuestion extends Component {

	render() {

		const { authedUser, question, author, totalVotes, optionOneVotes, optionTwoVotes, optionOnePercVotes, optionTwoPercVotes, authedUserVote } = this.props

		if (!authedUser) {
			return <Redirect to='/' />
		}

		const optionOneColor = authedUserVote === 'optionOne' ? 'darkseagreen' : 'lightgray'
		const optionTwoColor = authedUserVote === 'optionTwo' ? 'darkseagreen' : 'lightgray'

		return (
			<div>
				<Nav />
				<div className='main'>
				<div className='answered-question'>
				<p>
					<img src={author.avatarURL} alt="" height="42" width="42"/>
					<br/>
					Asked by {author.name}
				</p>
				<p>
				Results:
				</p>
				<p className='answer'>
					Would you rather {question.optionOne.text}?
					<br/>({optionOnePercVotes}%)
					<br/>{optionOneVotes} out of {totalVotes} votes
					<br/><b>{authedUserVote === 'optionOne' ? 'Your Vote' : ''}</b>
				</p>
				<p className='answer'>
					Would you rather {question.optionTwo.text}?
					<br/>({optionTwoPercVotes}%)
					<br/>{optionTwoVotes} out of {totalVotes} votes
					<br/><b>{authedUserVote === 'optionTwo' ? 'Your Vote' : ''}</b>
				</p>
				</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props
	const authedUserInfo = authedUser ? users[authedUser] : null
	const question = questions[id]
	const author = question ? users[question.author] : null
	const totalVotes = question ? Object.keys(users).map((user) => (users[user].answers[question.id] ? 1 : 0)).reduce((a, b) => a + b, 0) : null
	const optionOneVotes = question ? Object.keys(users).map((user) => (users[user].answers[question.id] === 'optionOne' ? 1 : 0)).reduce((a, b) => a + b, 0) : null
	const optionTwoVotes = question ? Object.keys(users).map((user) => (users[user].answers[question.id] === 'optionTwo' ? 1 : 0)).reduce((a, b) => a + b, 0) : null
	const optionOnePercVotes = (optionOneVotes / totalVotes * 100).toFixed(2)
	const optionTwoPercVotes = (optionTwoVotes / totalVotes * 100).toFixed(2)
	const authedUserVote = authedUserInfo ? authedUserInfo.answers[question.id] : null

	return {
		authedUser,
		question,
		author,
		totalVotes,
		optionOneVotes,
		optionTwoVotes,
		optionOnePercVotes,
		optionTwoPercVotes,
		authedUserVote,
	}
}

export default connect(mapStateToProps)(AnsweredQuestion)