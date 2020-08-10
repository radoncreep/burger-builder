// these are actions creators
// each function is used to return an action to be used in the reducer


import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

// requesting and receiving the order made or submitted to the firebase server
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START // no need for a payload because loading is just an initializer and it is already a prop in the state also in the reducer
    };
};

// the action we dispatch from the container once we click the order now btn
// then we connnect this to the contactData container
// this has our async code and therefore doesn't return an action
export const purchaseBurger = (orderData) => {
    // we are able to use the dispatch func here bcos of the redux thunk middleware
    return dispatch => {
        // executing it w the dispatch function so that the action returned by purchaseBurgerStart is dispatched to the store
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData ) // so post to this "orders.json" collection the orderData
            .then( response => {
                console.log(response.data.name); // how we can get the id, after checking what we got back from the server the name is the property holding the id
                // the use of dispatch here is to dispatch the object we get back from the purchaseBurgerSuccess
                // so first the data from the client is passed from the contactData container to here 
                // after the post req is made the rsponse and orderData is passed to purchaseBurgerSuccess which is called here
                // the function then executes after the call here and returns an object 
                // the object is what is being dispatched to the reducer
                // the reducer identifies this by checking the type from the object being dipatched as an action, it checks the type prop and execute
                dispatch(purchaseBurgerSuccess( response.data.name, orderData )) // adding the orderData to see what was added in the client side and to put that in the global store
            })
            .catch( error => {
                dispatch( purchaseBurgerFailed( error ));
            })
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrders = () => {
    // dispatch function available to here throuh the composer in the index.js file
    return dispatch => { //you're not returning an object, this is a function
    // on req before we get the orders, loading should be set to true to load the spinner
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then(res => {
                // console.log(res.data)
                const fetchedOrders = [];
                
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                };
                // dispatching a function that will take in the orders we got from the db
                dispatch(fetchOrdersStart(fetchedOrders)); // these returns an obj from fetchedOrderStart as an action to be dispatched
            }).catch(error => {
                dispatch(fetchOrdersFail(error)) // passing the error gotten from the db
                // this.setState({ loading: false }); // if there's an error you don't wont it to keep loading
            }
        )
    }
}

// orderData is an array of object containing order data such as:
// the ingredient obj 
// the contact data 
// and so on