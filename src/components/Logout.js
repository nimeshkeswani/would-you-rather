import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Logout extends Component {
	handleClick = (e) => {
		this.props.dispatch(setAuthedUser(null))
	}
	render() {

		if (!this.props.authedUser) {
			return <Redirect to='/' />
		}
		
		return (
			<div>
			<button onClick={this.handleClick}>Logout
			</button>
			</div>
		)
	}
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(Logout)