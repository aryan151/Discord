import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import serversReducer, { myServersReducer } from './server';
import channels from './channel'
import messagesReducer from './message';
import membersReducer from './membersservers';
import dmMessagesReducer from './dmMessages';


const rootReducer = combineReducers({
  session,
  servers: serversReducer,
  myServers: myServersReducer,
  channels,
  messages: messagesReducer,
  members: membersReducer,
  dms: dmMessagesReducer
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
