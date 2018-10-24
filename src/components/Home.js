import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Logout from './Logout'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'

class Home extends Component {

	state = {
		showAnsweredQuestions: false
	}

	handleClickUnansweredQuestions = (e) => {
		this.setState(() => ({
			showAnsweredQuestions: false
		}))
	}

	handleClickAnsweredQuestions = (e) => {
		this.setState(() => ({
			showAnsweredQuestions: true
		}))
	}

	render() {

		const { showAnsweredQuestions } = this.state

		let showQuestions
		
		if (!this.props.authedUser) {
			return <Redirect to='/' />
		}

		if (showAnsweredQuestions === false) {
			showQuestions = this.props.unansweredQuestions.map((id) => (<Question key={id} id={id} />))
		}
		else {
			showQuestions = this.props.answeredQuestions.map((id) => (<Question key={id} id={id} />))
		}

		return (
			<div>
				<Nav />
				<div>
					User: {this.props.user.name}
				</div>
				<br/>
				<button onClick={this.handleClickUnansweredQuestions}>Unanswered Questions</button><button onClick={this.handleClickAnsweredQuestions}>Answered Questions</button>
				<div>
				{showQuestions}
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