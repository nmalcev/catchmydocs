import * as actions from './actionTypes';
import {authStart} from './auth';

describe('Action tests', () => {
    it('AuthStart', () => {
        expect(authStart()).toEqual({type: actions.AUTH_START});
    })
})