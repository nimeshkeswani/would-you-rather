import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import '../styles/Login.css'

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
			<div className='wrapper'>
				<p className='game-name'>Would<br/>You<br/>Rather</p>
				<p>Please login to continue</p>
				<form className='login-form' onSubmit={this.handleSubmit}>
					<select className='drop-down' onChange={this.handleChange}>
						{this.props.users.map((user) => (
							<option key={user.id} value={user.id}>{user.name}</option>
						))}
					</select>
					<button className='submit-button' type='submit'>Log In</button>
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