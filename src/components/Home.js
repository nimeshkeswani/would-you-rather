import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Logout from './Logout'
import { handleInitialData } from '../actions/shared'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		
		if (!this.props.authedUser) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<div>
					User: {this.props.user.name}
				</div>
				<br/>
				<div>
					Unanswered Questions
					{this.props.unansweredQuestions.map((id) => (<Question key={id} id={id} />))}
				</div>
				<br/>
				<div>
					Answered Questions
					{this.props.answeredQuestions.map((id) => (<Question key={id} id={id} />))}
				</div>
				<br/>
				<Logout />
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users, questions }) {
	
	const userProp = users[authedUser]
	const questionsProp = Object.keys(questions)
	const answeredQuestionsProp = userProp ? Object.keys(userProp.answers) : null
	const unansweredQuestionsProp = userProp ? questionsProp.filter((question) => (!answeredQuestionsProp.includes(question))) : null

	return {
		authedUser,
		user: userProp,
		answeredQuestions: answeredQuestionsProp,
		unansweredQuestions: unansweredQuestionsProp,
	}
}

export default connect(mapStateToProps)(Home)