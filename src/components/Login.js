import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

	state = {
		user: this.props.users[0].id
	}

	handleChange = (e) => {

		const user = e.target.value

		console.log(user)

		this.setState(() => ({
		  user
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(this.state.user)
		this.props.dispatch(setAuthedUser(this.state.user))
	}

	render() {
		console.log(this.props)

		if (this.props.authedUser) {
			return <Redirect to='/home' />
		}

		return (
			<div>
				Login
				<form onSubmit={this.handleSubmit}>
				<select onChange={this.handleChange}>
					{this.props.users.map((user) => (
						<option key={user.id} value={user.id}>{user.name}</option>
					))}
				</select>
				<button type='submit'>Log In</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users }) {
	const user_ids = Object.keys(users)
	return {
		authedUser,
		users: user_ids.map((user_id) => (users[user_id])),
	}
}

export default connect(mapStateToProps)(Login)