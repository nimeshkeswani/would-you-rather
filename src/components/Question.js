import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import '../styles/Question.css'

class Question extends Component {
	render() {
		return (
			<div className='question'>
			<p>
				<img src={this.props.author.avatarURL} alt="" height="42" width="42"/>
				<br/>
				{this.props.author.name} asks:
			</p>
			<p>
				Would You Rather <b>{this.props.question.optionOne.text}</b> or <b>{this.props.question.optionTwo.text}</b> ?
			</p>
			<p>
				<Link to={`/questions/${this.props.id}`}>
				<button>View Poll</button>
					</Link>
			</p>	
			</div>
		)
	}
}

function mapStateToProps({ questions, users, authedUser }, { id }) {

	const question = questions[id]

	return {
		question,
		author: users[questions[id].author],
	}
}

export default withRouter(connect(mapStateToProps)(Question))