import * as actions from './actionTypes';
import {firebaseIdentity, FIREBASE_KEY } from '../firebase';

export const authStart = () => ({
    type: actions.AUTH_START
});

export const authSuccess = (token, userId, userEmail, authType, refreshToken) => {
    return {
        type: actions.AUTH_SUCCESS,
        token,
        userId,
        userEmail,
        authType,
        refreshToken
    };
};

export const authFail = error => ({
    type: actions.AUTH_FAIL,
    error
});

export const logout = () => ({
    type: actions.LOGOUT,
});

export const auth = (email, password, isSignUp = false, history) => {
    return (dispatch, getState) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const url = `/${isSignUp ? 'signupNewUser' : 'verifyPassword'}?key=${FIREBASE_KEY}`;
        
        firebaseIdentity.post(url, authData)
            .then(response => {
                const {data} = response;
                dispatch(authSuccess(data.idToken, data.localId, data.email, data.kind, data.refreshToken, history));
                history.push('/');
            })
            .catch(err => {
                if (!isSignUp && err.response.data) {
                    let {error} = err.response.data;

                    let isEmailInvalid = error.errors.find(errorObj => errorObj.message === 'INVALID_EMAIL');
                    console.warn('Authorization failed! isEmailInvalid: %s', isEmailInvalid);
                    console.dir(error);
                } else {
                    console.warn('SignUp error:');
                    console.dir(err);
                }
                dispatch(authFail(err));
            });
    };
};


export const recheckAuthorization = () => {
    return (dispatch, getState) => {
        dispatch(authStart());
        const sessionState = getState().session;
        if (!sessionState || !sessionState.token) {
            dispatch(logout());
            return;
        }
        let url = `/getAccountInfo?key=${FIREBASE_KEY}`;

        firebaseIdentity.post(url, {
            idToken: sessionState.token,
            // Backend supports additional properties:
            // localId: [sessionState.userId],
            // email: [sessionState.userEmail]
        }).then(resp => {
            const {users} = resp.data;
            const userData = users.find(data => data.email === sessionState.userEmail);
            
            if (userData && +(new Date(userData.lastRefreshAt)) + 3600 * 1000 > Date.now()) {
                dispatch({
                    type: actions.AUTH_RECHECKED,
                });
            } else {
                throw('The token is expired');
            }
        }).catch(err => {
            console.warn('Check error');
            console.dir(err);
            dispatch({
                type: actions.AUTH_RECHECKED,
            });
            // 
        });    
    }
}
