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

		this.setState(() => ({
		  user
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.dispatch(setAuthedUser(this.state.user))
	}

	render() {

		const { from } = this.props.location.state || { from: { pathname: '/' } }

		if (this.props.authedUser) {
			if (from.pathname !== '/') {
				return <Redirect to={from} />
			}
			else {
				return <Redirect to='/home' />
			}
		}

		return (
			<div>
				<p>Welcome to the Would You Rather App!</p>
				<p>Please login to continue</p>
				<img src="https://thefamilydinnerproject.org/wp-content/uploads/2013/05/wouldyourather.png" alt="" height="170" width="250"/>
				<p>Login</p>
				<form onSubmit={this.handleSubmit}>
					<p>
						<select onChange={this.handleChange}>
							{this.props.users.map((user) => (
								<option key={user.id} value={user.id}>{user.name}</option>
							))}
						</select>
					</p>
					<p><button type='submit'>Log In</button></p>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users, redirectURL }) {
	const user_ids = Object.keys(users)
	return {
		authedUser,
		users: user_ids.map((user_id) => (users[user_id])),
		redirectURL,
	}
}

export default connect(mapStateToProps)(Login)