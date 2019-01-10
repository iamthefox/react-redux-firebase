import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
} from 'react-redux-firebase'
import './App.css'
import SingleTodo from './SingleTodo'

function Home({ firebase, todos }) {
  return (
    <div className='App'>
      <h1>Issue with using firebaseConnect after connect</h1>
      {todos && todos.map(({ key: todoId }) => <SingleTodo key={todoId} id={todoId}/>)}
    </div>
  )
}

Home.propTypes = {
  firebase: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.firebase.ordered.todos
  }
}

const enhance = compose(
  connect((state) => {
    // do things before first firebase connect
    // this will attach "firebase" prop and override actual firebase db
    // it will cause following firebaseConnect to fail miserably because
    // firebaseConnect relies on "firebase" prop to be an actual database ref
    // rather than data object that firebaseReducer returns.
    // Potential solution here would be moving reducer or firebase prop that
    // firebaseConnect relies on to a different key
    return {
      ...state
    }
  }),
  firebaseConnect(() => [
    {
      path: 'todos',
      queryParams: ['limitToLast=10']
    }
  ]),
  connect(mapStateToProps)
)

export default enhance(Home)
