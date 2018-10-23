import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Question from './Question'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Fragment>
				<LoadingBar />
				<div className="App">
					{
						this.props.loading === true
						? null
						: this.props.questions.map((id) => (<Question key={id} id={id} />))
					}
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps ({ authedUser, questions }) {
	return {
		loading: authedUser === null,
		questions : Object.keys(questions)
	}
}

export default connect(mapStateToProps)(App)