import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/new_question' exact activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  )
}