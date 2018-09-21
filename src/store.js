import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import { middlewares as globalMiddlewares } from './middlewares'
import routesMap from './routes'
import queryString from 'query-string'

export const history = createHistory()

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, {
  location: 'router',
  querySerializer: queryString
})

const initialState = {}
const enhancers = [
  enhancer
]

const middlewares = [
  thunk,
  ...globalMiddlewares,
  middleware
]

const rootReducer = combineReducers({ ...reducers, router: reducer, form })

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)



const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
