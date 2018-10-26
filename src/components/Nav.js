import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

class Nav extends Component {
  render() {
    return (
    <nav>
      <p>Hello, {this.props.user.name} <img src={this.props.user.avatarURL} alt="" height="21" width="21"/></p>
      <table>
      <tbody>
      <tr>
        <td>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </td>
        <td>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            Leaderboard
          </NavLink>
        </td>
        <td>
          <NavLink to='/add' exact activeClassName='active'>
            New Question
          </NavLink>
        </td>
        <td>
          <Logout />
        </td>
      </tr>
      </tbody>
      </table>
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