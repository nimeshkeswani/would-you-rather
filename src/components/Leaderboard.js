import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import '../styles/Leaderboard.css'

class Leaderboard extends Component {

	render() {

		const { authedUser, users } = this.props

		if (!authedUser) {
			return <Redirect to={{
			          pathname: '/',
			          state: { from: this.props.location }
			        }} />
		}

		return (
			<div>
				<Nav />
				<div className='users'>
					{users.map((user, index) => (
						<div key={user.id} className='user'>
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