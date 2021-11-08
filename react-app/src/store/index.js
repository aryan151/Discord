import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
<<<<<<< HEAD
import channels from './channel'

const rootReducer = combineReducers({
  session,
  channels
=======
import serversReducer from './server';

const rootReducer = combineReducers({
  session,
  servers: serversReducer,
>>>>>>> b0a5a8e1b61598b2ceb1df727636328f6449ea15
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
