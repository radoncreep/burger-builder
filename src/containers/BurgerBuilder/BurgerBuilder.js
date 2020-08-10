import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        console.log(this.props);
        // calling the property function
        this.props.onInitIngredients()
    }

    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((total, current) => {
                return total + current
            }
        );
        
        return sum > 0;
        // this.setState({ purchasable: sum > 0 }) // the expression gives a boolean value
    };

  
    purchaseHandler = () =>  {
        this.setState({ purchasing: true });
    };

    purchaseRemoveHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // the pruchase proerty has to be reinitialized to be false when we click the continue button after the ordering with the order now btn
        // that is when this method is ran the "purchased" property of the state has to be set to false before routing or going to the checkout page
        // to avoid being redirected
        this.props.onInitPurchase();
        this.props.history.push('/checkout'); 
    };

    render () {
        // Implementing this here, so as the file is rendering it renders the disabling logic to the button
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // this is comparing if the value of each ingredient key is less or equal to zero and returning boolean true or false
            // At the first render it is true which disables the less btn but when an ig is added it is false so the less btn is enabled
        };
        
        let orderSummary = null;

        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;
        
        if (this.props.ings) { // If this is true or not null
            burger =  (
                <Auxillary>
                    <Burger ingredients={this.props.ings}/>
    
                    <BuildControls 
                        addIngredients={ this.props.onIngredientsAdded }
                        removeIngredients={ this.props.onIngredientsRemoved }
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Auxillary>
            )

            orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                total={this.props.price}
            />
        };

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // };
       
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseRemoveHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Auxillary>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};
 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


// the dispatch(has a function which returns an object)
// the obj returned is the same with the type and payload 
// the function from burger control passes a string or ingredient type
// in which the function is run here as an anonymous function
// and then the ing type is passed as an argument
// this.props.onIngredientAdded is a property that has a function as a value
// so that's it




// addIngredientHandler = (type) => {
//     let oldValue = this.state.ingredients[type];
//     let newValue = oldValue + 1;
//     let updatedIngredients  = {
//         ...this.state.ingredients
//     };

//     // cloning the state because we don't want to change the orignal values in the state
//     updatedIngredients[type] = newValue;
    
//     // Price
//     // We are not cloning the price property of the state because it is only being used to calculate
//     // It's value is only updated by the newPrice constant using setState
//     let oldPrice = this.state.totalPrice;
//     let newPrice  = oldPrice + INGREDIENT_PRICES[type];
    
//     this.setState({
//         ingredients: updatedIngredients,
//         totalPrice: newPrice
//     });

//     this.updatePurchasable(updatedIngredients)
// };

// removeIngredientHandler = (type) => {
//     // INGREDIENTS
//     let currentValue = this.state.ingredients[type]; // e.g 1

//     if (currentValue <= 0) {
//         return;
//     };

//     let subtractedValue = currentValue - 1;
//     // if (currentValue >= 1) {
//     //     subtractedValue = currentValue - 1;
//     // } else if (currentValue === 0){
//     //     return subtractedValue = <p>No item</p>
//     // };
 
//     let updatedIngredients = {
//         ...this.state.ingredients
//     };
//     updatedIngredients[type] = subtractedValue;

//     // PRICE
//     // the value of salad in the clone state will be subtractedValue
    
//     let currentPrice = this.state.totalPrice;
//     let deductedPrice = currentPrice - INGREDIENT_PRICES[type];

//     this.setState({
//         ingredients: updatedIngredients,
//         totalPrice: deductedPrice
//     });

//     this.updatePurchasable(updatedIngredients);
// };


// BEFORE REDUX
// purchaseContinueHandler = () => {
//     const queryParams = [];

//     for (let key in this.state.ingredients) {
//         // encodeURIComponent is a method which simply encodes the elements such that they can be used in the URL
//         queryParams.push(encodeURIComponent(key) + '=' +  encodeURIComponent(this.state.ingredients[key]))
//     };
//     queryParams.push('price=' + this.state.totalPrice);
//     // example of what the array queryParams will look like ['salad=0', 'bacon=1', ...]
//     const queryString = queryParams.join('&');
//     this.props.history.push({
//         pathname: '/checkout',
//         search: '?' + queryString
//     });
    
// };
