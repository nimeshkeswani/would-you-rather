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

		console.log(optionOne, optionTwo)

		dispatch(handleAskQuestion(optionOne, optionTwo, authedUser))

	    this.setState(() => ({
	    	optionOne: '',
	    	optionTwo: '',
	    	redirect: true
	    }))
	}

	render() {

		if (!this.props.authedUser) {
			return <Redirect to='/' />
		}

		if (this.state.redirect) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<div>
					Create New Question
				</div>
				<div>
					Would You Rather
				</div>
				<form onSubmit={this.handleSubmit}>
					<input type='text' placeholder="optioneOne" value={this.state.optionOne} onChange={this.handleChangeOptionOne}/>
					OR
					<input type='text' placeholder="optioneTwo" value={this.state.optionTwo} onChange={this.handleChangeOptionTwo}/>
					<button
		            	type='submit'
		            	disabled={this.state.optionOne === '' || this.state.optionTwo === ''}>
		            		Submit
		            </button>
				</form>
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