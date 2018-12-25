import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import '../styles/Home.css'

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
			showQuestions = this.props.unansweredQuestions.length > 0 ? this.props.unansweredQuestions.map((id) => (<Question key={id} id={id} />)) : 'No Unanswered Questions'
		}
		else {
			showQuestions = this.props.answeredQuestions.length > 0 ? this.props.answeredQuestions.map((id) => (<Question key={id} id={id} />)) : 'No Answered Questions'
		}

		return (
			<div>
				<Nav />
				<div className='buttons'>
				<button className='button' onClick={this.handleClickUnansweredQuestions}>Unanswered Questions</button>
				<button className='button' onClick={this.handleClickAnsweredQuestions}>Answered Questions</button>
				</div>
				<div className='questions'>
				{showQuestions}
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users, questions }) {
	
	const userProp = users[authedUser]
	const questionsProp = Object.keys(questions).sort((a,b) => (questions[b].timestamp - questions[a].timestamp))
	const answeredQuestionsProp = userProp ? questionsProp.filter((question) => (Object.keys(userProp.answers).includes(question))) : null
	const unansweredQuestionsProp = userProp ? questionsProp.filter((question) => (!answeredQuestionsProp.includes(question))) : null

	return {
		authedUser,
		user: userProp,
		answeredQuestions: answeredQuestionsProp,
		unansweredQuestions: unansweredQuestionsProp,
	}
}

export default connect(mapStateToProps)(Home)