import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Home from './Home'

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
							  </div>
						}
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		loading: authedUser === null,
	}
}

export default connect(mapStateToProps)(App)