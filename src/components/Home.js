import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Logout from './Logout'
import { handleInitialData } from '../actions/shared'
import { Redirect } from 'react-router-dom'

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
				<div>
					User: {this.props.authedUser}
				</div>
				<div>
					{this.props.questions.map((id) => (<Question key={id} id={id} />))}
				</div>
				<Logout />
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions }) {
	return {
		authedUser,
		questions : Object.keys(questions)
	}
}

export default connect(mapStateToProps)(Home)