import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
	render() {
		return (
			<Link to={`/questions/${this.props.id}`}>
			<div>
				<img src={this.props.author.avatarURL} alt="" height="42" width="42"/> - {this.props.author.name} asks:
			</div>
			<div>
				Would You Rather {this.props.question.optionOne.text} or {this.props.question.optionTwo.text} ?
			</div>
			<br/>
			</Link>
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