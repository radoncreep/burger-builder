import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>

            <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}
            />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
};

// We are not dispatching here

export default connect(mapStateToProps)(Checkout);

// BEFORE REDUX

// componentWillMount() { // changed from DidMount to WillMount because before we render the child component we already have accees to the props, so we can already get the query params there
//     // We are using this lifecycle bcos whenever we load this component, it will mount itself
//     // Theres no way we can route to it w/o it being mounted again bcos it is not nested in some other component/page
//     const query = new URLSearchParams(this.props.location.search);
//     const ingredients = {};
//     let price = 0;
//     // console.log(query.entries()); 

//     for (let param of query.entries()) {
//         // ['salad', '2']
//         if (param[0] === 'price') {
//             price = param[1];
//         } else {
//             ingredients[param[0]] = +param[1]; // plus sign infront to convert it to a nunber
//         }
//     }

//     this.setState({ ingredients: ingredients, totalPrice: price });
// }

// render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
