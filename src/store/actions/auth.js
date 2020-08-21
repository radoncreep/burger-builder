import axios from 'axios';

import * as actionTypes from './actionTypes';

// exporting different action creators

// this is returns an object and is being dispatched to the reducer from the auth function
// without it being dispatched it cannot reach the reducer
export const auth_start = () => {
    return {
        type: actionTypes.AUTH_START
    }
};


// this is returns an object and is being dispatched to the reducer from the auth function
// without it being dispatched it cannot reach the reducer
export const auth_success = (token, userId) => {
    // console.log(token, userId)
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

// this is returns an object and is being dispatched to the reducer from the auth function
// without it being dispatched it cannot reach the reducer
export const auth_fail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

// synchronous function
export const auth_logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logout = (expirationTime) => {
    // asynchronous function
    return dispatch => {
        setTimeout(() => {
            console.log(expirationTime + ' dispatched immediately')
            dispatch(auth_logout());
        }, expirationTime * 1000) // forgot to multipy by 1000
    }; // always multiply by 1000 when using setTimeout func cos it reads in milliseconds so you have to convert it
};

export const auth = (email, password, isSignup) => {
    // dispatch function available through thunk
    return dispatch => {
        dispatch(auth_start());
        // axios call to authenticate user data from the client side
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfXA41ksEbBpm0IuBWwMEU3HZaXfDJxv8';

        if (!isSignup) { // if the isSignup property is false in the updated state then use the login url from firebase
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfXA41ksEbBpm0IuBWwMEU3HZaXfDJxv8'
        };

        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                const expirationTime = new Date((new Date().getTime() + response.data.expiresIn * 1000));  // so the current time + one hour
                // doing it here and not in the authSuccess function bcos of the expirssIn data we want here
                // this would be use to check where there is an available token and also if the expiration time is not exceeded, then the user should still be authenticated after reloading 
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                // storing userId in the local storage to be used in the below func, this cld aslo be gotten from firebase with their API endpoint but this approach is easier
                localStorage.setItem('userId', response.data.localId);
                dispatch(auth_success(response.data.idToken, response.data.localId));
                dispatch(logout(response.data.expiresIn)); // session expiry time gotten from the server
            })
            .catch(error => {
                console.log(error.response);
                dispatch(auth_fail(error.response.data.error))
            }); 
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(auth_logout()); // I made a mistake and used the logut function which takes in the expiration date which would be undefined and then the setTimeout function would run by undefined * 1000, which would make in run imeediately and execute logout which still gets called and works anyways but isnt the right approach
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if (expirationDate <= new Date()) {
                dispatch(auth_logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(auth_success(token, userId));
                dispatch(logout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}