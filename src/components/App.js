import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Home from './Home'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className="App">
						{
							this.props.loading === true
							? null
							: <div>
								<Route path='/' exact component={Login} />
								<Route path='/home' component={Home} />
								<Route path='/questions/:id' component={QuestionDetails} />
								<Route path='/add' component={NewQuestion} />
								<Route path='/leaderboard' component={Leaderboard} />
							  </div>
						}
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ users }) {
	return {
		loading: Object.keys(users).length === 0,
	}
}

export default connect(mapStateToProps)(App)