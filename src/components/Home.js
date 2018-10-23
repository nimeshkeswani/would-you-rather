import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
	render() {
		return (
			<div>
				{this.props.questions.map((id) => (<Question key={id} id={id} />))}
			</div>
		)
	}
}

function mapStateToProps({ questions }) {
	return {
		questions : Object.keys(questions)
	}
}

export default connect(mapStateToProps)(Home)