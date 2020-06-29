import axios from 'axios';

export const FIREBASE_KEY = 'AIzaSyCIIPnSP2etYjiMicmsNU6KAA0Vcqgt2oo';
export const firebaseIdentity = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/',
});

