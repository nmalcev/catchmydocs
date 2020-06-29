import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './reducers/sessionReducer';
import {recheckAuthorization} from './actions/auth';
// Middleware for restoring a state from the localStorage 
import {getSavedSession, sesionSaver} from './middlewares/sessionMiddleware';
// Middleware for handling token experation errors
import {interceptorMiddleware} from './middlewares/interceptorMiddleware';

const savedSession = getSavedSession();
const store = createStore(
    combineReducers({
        session: sessionReducer
    }),
    savedSession ? savedSession : undefined, // in case of undefined the sessionReducer() gets a default value
    applyMiddleware(thunk, sesionSaver, interceptorMiddleware),
);

store.dispatch(recheckAuthorization());

export default store;