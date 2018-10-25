import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'

class Leaderboard extends Component {
	render() {

		const { authedUser, users } = this.props

		console.log(this.props)

		if (!authedUser) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<div>
					{users.map((user) => (
						<div key={user.id}>
						<img src={user.avatarURL} alt="" height="42" width="42"/> - {user.name} - {user.answeredQuestions} - {user.askedQuestions} - {user.score}
						</div>
					))}
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users }) {

	let usersInfo = Object.keys(users).map((user) => (users[user])).map((user) => {
			let userDetail = user
			userDetail.askedQuestions = userDetail.questions.length
			userDetail.answeredQuestions = Object.keys(userDetail.answers).length
			userDetail.score = userDetail.askedQuestions + userDetail.answeredQuestions
			return userDetail
		})
		
	return {
		authedUser,
		users: usersInfo.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0)),
	}
}

export default connect(mapStateToProps)(Leaderboard)