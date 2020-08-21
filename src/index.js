import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

// thunk for the purpose of writing async code
// compose allows us to compose our own set of enhancers and middlware is just a kind of enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  <React.StrictMode>
      {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// explaining combine reducers and change in state
// in our reducers after any operation an object is being returned
// that object ll be used in the createStore method to create a state
// so if you have const store = createStore({objectReturnedbyReducer})
// so the store is like store = {
//   ingredient: {
//     bacon: 1,
//     cheese: 0
//   },
//   loading: false
// }
// but when the reducers are combined into a rootReducer
// an object of objects is returned to createStore
// const store = createStore({
//   burgerBuilder: burgerBuilderReducer,
//   order: orderReducer
// })
// burgerBuilderReducer and orderReducer are objects returned from the reducer
// so the properties burgerBuiler and order have values which are objects
// the store will now be 
// const store = {
//     state: {
//         burgerBuilder: {
//           ingredients: {
//             bacon: 1,
//             cheese: 0
//           },
//           loading: false
//         }
//     },
//     order: {
//       ingredients: {
//         bacon: 1,
//         cheese: 0
//       },
//       loading: false
//     }
//     }
// }
// so accessing the state in different containers to get its props will be
// state.burgerBuiler.ingredients 
// state.order.ingredients
