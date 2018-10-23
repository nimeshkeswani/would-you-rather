import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		console.log('Submitting')
	}

	render() {
		console.log(this.props)
		return (
			<div>
				Login
				<form onSubmit={this.handleSubmit}>
				<select>
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

function mapStateToProps({ users }) {
	const user_ids = Object.keys(users)
	return {
		users: user_ids.map((user_id) => (users[user_id])),
	}
}

export default connect(mapStateToProps)(Login)