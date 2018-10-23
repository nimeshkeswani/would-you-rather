import {
  _getUsers,
  _getQuestions,
} from './_DATA.js'

export function getUsers () {
  return Promise.all([
    _getUsers()
  ]).then(([users]) => ({
    users
  }))
}

export function getQuestions () {
  return Promise.all([
    _getQuestions()
  ]).then(([questions]) => ({
    questions
  }))
}

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}