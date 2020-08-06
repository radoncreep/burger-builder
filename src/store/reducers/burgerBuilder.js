import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};


let INGREDIENT_PRICES = {
    salad: 1,
    bacon: 1.2,
    cheese: 0.5,
    meat: 2
};

const reducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    };
};

export default reducer;


// ingredientName is a payload we are getting from the dispatch in its container
// it could either be salad, bacon, meat, or cheese
// so we receive either of those as a property in the action obj 
// [action.ingredient] is an es6 syntax that allows the use of the dot operator 
// this is to get the object property and set it as prop in the cloned obj 
 