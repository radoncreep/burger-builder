import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,  // we are not receiving from this cases dispatch but both token and userId already exist in the state after authentication
                userId: null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            console.log(action.path);
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
};

export default reducer;