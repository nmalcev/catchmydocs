import sessionReducer, {initialState as sessionReducerInitState} from './sessionReducer';
import {authStart} from '../actions/auth';

describe('Session Reducer', () => {
    it('actions should result in the expected state value', () => {
        expect(sessionReducer(undefined, authStart()))
            .toEqual({...sessionReducerInitState, isAuthorizing: true});
    })

})