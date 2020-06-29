import {firebaseIdentity} from '../firebase';
import {logout} from '../actions/auth';

export const interceptorMiddleware = store => {
    firebaseIdentity.interceptors.response.use(function (response) {
        return response;
    }, function (exc) {
        const {error} = exc.response.data;
        const invalidIdToken = error.errors.find(errorObj => errorObj.message === 'INVALID_ID_TOKEN');

        if (!!invalidIdToken) {
            store.dispatch(logout());
        }
        return Promise.reject(exc);
    });
   
    return  next => {
        return action => {
            let res = next(action);
            return res;
        }
    }
}