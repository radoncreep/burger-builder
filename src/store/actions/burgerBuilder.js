// these are actions creators
// each function is used to return an action to be used in the reducer

import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};


// Fetching ingredients aycnhronously
// adding a new action creator

export const setIngredients = (ingredients) => { // this is the synchronous action creator
    // returning an action to be dispatched
    return {
        type: actionTypes.SETINGREDIENTS,
        ingredients: ingredients // this will be an obj which is the response.data received from the call of this function in initIngredients function below
    };
};

// exporting this function to use it in anywhere but it is been used here
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    // want to return a function where I receive dispatch function
    // this is available to use thru redux thunk, which allows the use of action creators like this
    return (dispatch) => {  // we are using dispatch here as an argument to be able to use dispatch to dispatch actions and ingredients received from the server
        axios.get('https://burger-builder-f819b.firebaseio.com/ingredients.json ')
            .then(response => {
                // the data property holds the data which is a js obj which we want to use 
                console.log(response.data)
                dispatch(setIngredients(response.data)); // setIngredients is going to return an obj to this function to be dispatch({ type: ..., ingredients: ingredients received from response.data axios call})
            }).catch(error => {
                // we need to dispatch an action if the we didnt get an ingredient
                dispatch(fetchIngredientsFailed());
                // fetchIngredientsFailed is a function that returns an action, 
            }
        );
    };
};

// BEFORE REDUX
// axios.get('https://burger-builder-f819b.firebaseio.com/ingredients.json')
// .then(response => {
//     // console.log(response.data);
//     this.setState({ ingredients: response.data })
// }).catch(err => {
//     this.setState({ error: true})
// });