import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
	render() {
		return (
			<Link to={`/questions/${this.props.id}`}>
			<div>
				{this.props.author.name} asks {this.props.id} on {this.props.question.timestamp}
			</div>
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