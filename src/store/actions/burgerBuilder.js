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
        ingredients: ingredients
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
    return dispatch => {
        axios.get('https://burger-builder-f819b.firebaseio.com/ingredients.json')
            .then(response => {
                // the data property holds the data which is a js obj which we want to use 
                dispatch(setIngredients(response.data));
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