import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import { handleAskQuestion } from '../actions/questions'

class NewQuestion extends Component {
	
	state = {
		optionOne: '',
		optionTwo: '',
		redirect: false,
	}

	handleChangeOptionOne = (e) => {
	    const optionOne = e.target.value

	    this.setState(() => ({
	      optionOne
	    }))
 	}

	handleChangeOptionTwo = (e) => {
	    const optionTwo = e.target.value

	    this.setState(() => ({
	      optionTwo
	    }))
 	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOne, optionTwo } = this.state
    	const { dispatch, authedUser } = this.props

		dispatch(handleAskQuestion(optionOne, optionTwo, authedUser))

	    this.setState(() => ({
	    	optionOne: '',
	    	optionTwo: '',
	    	redirect: true
	    }))
	}

	render() {

		if (!this.props.authedUser) {
			return <Redirect to={{
			          pathname: '/',
			          state: { from: this.props.location }
			        }} />
		}

		return (
			<div>
				<Nav />
				<div style={{ 'borderWidth': '1px', 'borderColor': 'black', 'borderStyle': 'solid' }}>
				<p>
					Create New Question
				</p>
				<hr/>
				<p>
					Complete the question:
				</p>
				<p>
					<b>Would You Rather...</b>
				</p>
				<form onSubmit={this.handleSubmit}>
					<p>
					<input type='text' placeholder="optioneOne" value={this.state.optionOne} onChange={this.handleChangeOptionOne}/>
					</p>
					OR
					<p>
					<input type='text' placeholder="optioneTwo" value={this.state.optionTwo} onChange={this.handleChangeOptionTwo}/>
					</p>
					<p>
					<button
		            	type='submit'
		            	disabled={this.state.optionOne === '' || this.state.optionTwo === ''}>
		            		Submit
		            </button>
		            </p>
				</form>
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

export default connect(mapStateToProps)(NewQuestion)