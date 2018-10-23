import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData, handleInitialUserData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Home from './Home'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialUserData())
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

function mapStateToProps ({ users }) {
	return {
		loading: Object.keys(users).length === 0,
	}
}

export default connect(mapStateToProps)(App)