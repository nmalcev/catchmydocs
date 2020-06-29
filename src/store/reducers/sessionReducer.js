import * as actions from '../actions/actionTypes';

export const initialState = {
    isAuthorizing: false,
    error: null,
    token: null,
    userId: null, // aka isAutorized
    userEmail: null,
    authType: null,
    refreshToken: null,
};


const sessionReducer = (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        case actions.AUTH_FAIL:
            nextState = {...state, error: action.error};
            break;
        case actions.LOGOUT:
            nextState = {...initialState};
            break;
        case actions.AUTH_SUCCESS:
            nextState = {
                ...state,
                isAuthorizing: false,
                error: null,
                token: action.token,
                userId: action.userId,
                userEmail: action.userEmail,
                authType: action.authType,
                refreshToken: action.refreshToken,
            };
            break;
        case actions.AUTH_RECHECKED:
            nextState = {...state, isAuthorizing: false};
            break;
        case actions.AUTH_START:
            nextState = {...state, isAuthorizing: true};
            break;
        case actions.RESET_STATE:
            nextState = {...state, ...action.nextState};
            break;
        default:
            nextState = {...state};
    }

    return nextState;
};


export default sessionReducer;
