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
					{users.map((user, index) => (
						<div key={user.id} style={{ 'borderWidth': '1px', 'borderColor': 'black', 'borderStyle': 'solid' }}>
						<p>
							<img src={user.avatarURL} alt="" height="42" width="42"/>
							<br/>{user.name}
						</p>
						<p>
							Answered Questions: {user.answeredQuestions}
							<br/>Asked Questions: {user.askedQuestions}
						</p>
						<p>
							Rank: {index+1}
							<br/>Score: {user.score}
						</p>
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