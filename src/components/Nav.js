import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
import '../styles/Nav.css'

class Nav extends Component {
  render() {
    return (
      <nav>
        <div>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            Leaderboard
          </NavLink>
          <NavLink to='/add' exact activeClassName='active'>
            New Question
          </NavLink>
        </div>
        <p>Hello, {this.props.user.name} <img src={this.props.user.avatarURL} alt="" height="21" width="21"/></p>
        <Logout />
      </nav>
    )
  }
}

function mapStateToProps({ users, authedUser }) {

  const user = users[authedUser]

  return {
    user,
  }
}

export default connect(mapStateToProps)(Nav)