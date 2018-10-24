import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'

class QuestionDetails extends Component {
	render() {

		if (!this.props.authedUser) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<div>
					Question Details
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(QuestionDetails)