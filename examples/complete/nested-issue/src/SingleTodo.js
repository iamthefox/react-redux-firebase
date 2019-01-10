import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
} from 'react-redux-firebase'
import './App.css'

function SingleTodo({ firebase, todo }) {
  return (
    <div className='App'>
      {todo.owner} : {todo.text}
      <hr />
    </div>
  )
}

SingleTodo.propTypes = {
  firebase: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    todo: state.firebase.data.todos[ownProps.id]
  }
}

const enhance = compose(
  firebaseConnect(({ id }) => {
    return [
      {
        path: `todos/${id}`,
      }
    ]
  }),
  connect(mapStateToProps)
)

export default enhance(SingleTodo)
