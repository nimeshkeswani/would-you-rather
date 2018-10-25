import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import { handleAddAnswer } from '../actions/questions'

class UnansweredQuestion extends Component {

	state = {
		selectedOption: 'optionOne'
	}

	handleOptionChange = (e) => {
		const selectedOption = e.target.value

	    this.setState(() => ({
	      selectedOption
	    }))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { selectedOption } = this.state
    	const { dispatch, authedUser, question } = this.props

		dispatch(handleAddAnswer(authedUser, question.id, selectedOption))

	    this.setState(() => ({
	    	selectedOption: 'optionOne',
	    }))
	}

	render() {

		const { authedUser, question, author } = this.props

		if (!authedUser) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<Nav />
				<img src={author.avatarURL} alt="" height="42" width="42"/>{author.name} asked:
				<form onSubmit={this.handleSubmit}>
					<div>
						Would you rather {question.optionOne.text}?
						<input type="radio"
							value="optionOne"
							checked={this.state.selectedOption === 'optionOne'} 
							onChange={this.handleOptionChange} />
					</div>
					<div>
						Would you rather {question.optionTwo.text}?
						<input type="radio"
							value="optionTwo"
							checked={this.state.selectedOption === 'optionTwo'} 
							onChange={this.handleOptionChange} />
					</div>
					<button
		            	type='submit'>
		            		Submit
		            </button>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props
	const authedUserInfo = authedUser ? users[authedUser] : null
	const question = questions[id]
	const author = question ? users[question.author] : null

	return {
		authedUser,
		question,
		author,
	}
}

export default connect(mapStateToProps)(UnansweredQuestion)