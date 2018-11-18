import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Home from './Home'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Page404 from './Page404'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Fragment>
					<LoadingBar />
					<div className="App">
						{
							this.props.loading === true
							? null
							: <div>
								<Switch>
									<Route path='/' exact component={Login} />
									<Route path='/home' component={Home} />
									<Route path='/questions/:id' component={QuestionDetails} />
									<Route path='/add' component={NewQuestion} />
									<Route path='/leaderboard' component={Leaderboard} />
									<Route component={Page404} />
								</Switch>
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
