import React from 'react'
import PropTypes from 'prop-types'
import createFirebaseInstance from './createFirebaseInstance'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'
import ReduxFirestoreProvider from './ReduxFirestoreProvider'

/**
 * Provider for context containing extended firebase instance created
 * by react-redux-firebase
 * @param {Object} props
 * @param {Object} props.config - react-redux-firebase config
 * @param {Object} props.store - Redux store
 * @param {Object} props.firebase - Firebase library
 * @param {Boolean} props.initializeAuth - Whether or not to initialize auth
 * @param {Function} props.createFirestoreInstance - Function for creating
 * extended firestore instance
 */
function ReactReduxFirebaseProvider(props = {}) {
  const {
    children,
    config,
    store,
    firebase,
    initializeAuth,
    createFirestoreInstance
  } = props
  const extendedFirebaseInstance = React.useMemo(
    () => {
      const extendedFirebaseInstance = createFirebaseInstance(
        firebase,
        config,
        store
      )
      if (initializeAuth) {
        extendedFirebaseInstance.initializeAuth()
      }
      return extendedFirebaseInstance
    },
    [firebase, config, store]
  )
  // Initialize auth if not disabled
  if (createFirestoreInstance) {
    return (
      <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
        <ReduxFirestoreProvider {...props} initializeAuth={false}>
          {children}
        </ReduxFirestoreProvider>
      </ReactReduxFirebaseContext.Provider>
    )
  }
  return (
    <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
      {children}
    </ReactReduxFirebaseContext.Provider>
  )
}

ReactReduxFirebaseProvider.defaultProps = {
  initializeAuth: true
}

ReactReduxFirebaseProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  initializeAuth: PropTypes.bool,
  createFirestoreInstance: PropTypes.func
}

export default ReactReduxFirebaseProvider
