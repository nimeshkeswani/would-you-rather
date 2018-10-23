import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
	render() {
		return (
			<div>
				{this.props.author.name} asks {this.props.id}
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

export default connect(mapStateToProps)(Question)