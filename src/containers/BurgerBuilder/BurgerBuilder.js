import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

let INGREDIENT_PRICES = {
    salad: 1,
    bacon: 1.2,
    cheese: 0.5,
    meat: 2
};
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-builder-f819b.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response.data);
                this.setState({ ingredients: response.data })
            }).catch(err => {
                this.setState({ error: true})
            });
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
        
        this.setState({ purchasable: sum > 0 }) // the expression gives a boolean value
    };

    addIngredientHandler = (type) => {
        let oldValue = this.state.ingredients[type];
        let newValue = oldValue + 1;
        let updatedIngredients  = {
            ...this.state.ingredients
        };

        // cloning the state because we don't want to change the orignal values in the state
        updatedIngredients[type] = newValue;
        
        // Price
        // We are not cloning the price property of the state because it is only being used to calculate
        // It's value is only updated by the newPrice constant using setState
        let oldPrice = this.state.totalPrice;
        let newPrice  = oldPrice + INGREDIENT_PRICES[type];
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchasable(updatedIngredients)
    };

    removeIngredientHandler = (type) => {
        // INGREDIENTS
        let currentValue = this.state.ingredients[type]; // e.g 1

        if (currentValue <= 0) {
            return;
        };

        let subtractedValue = currentValue - 1;
        // if (currentValue >= 1) {
        //     subtractedValue = currentValue - 1;
        // } else if (currentValue === 0){
        //     return subtractedValue = <p>No item</p>
        // };
     
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = subtractedValue;

        // PRICE
        // the value of salad in the clone state will be subtractedValue
        
        let currentPrice = this.state.totalPrice;
        let deductedPrice = currentPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: deductedPrice
        });

        this.updatePurchasable(updatedIngredients);
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
        this.setState({ loading: true });
        // alert('You continue to the next step!');
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // this should be recalculated in the server in a real application
            customer: {
                name: 'Victor Onofiok',
                address: {
                    street: 'Wall Street',
                    zipCode: '019234',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fatest'
        };

        // the syntax for sending a req to firebase is the name of the node with .json as its extension
        axios.post('/order.json', orders)
            .then(response => {
                // console.log(response)
                this.setState({ loading: false, purchasing: false });
            }).catch(error => {
                this.setState({ loading: false, purchasing: false });
                console.log(error);
            });
    };

    render () {
        // Implementing this here, so as the file is rendering it renders the disabling logic to the button
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // this is comparing if the value of each ingredient key is less or equal to zero and returning boolean true or false
            // At the first render it is true which disables the less btn but when an ig is added it is false so the less btn is enabled
        };
        
        let orderSummary = null;

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;
        
        if (this.state.ingredients) { // If this is true or not null
            burger =  (
                <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
    
                    <BuildControls 
                        addIngredients={ this.addIngredientHandler }
                        removeIngredients={ this.removeIngredientHandler }
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Auxillary>
            )

            orderSummary =  <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                total={this.state.totalPrice}
            />
        };

        if (this.state.loading) {
            orderSummary = <Spinner />
        };
       
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

export default withErrorHandler(BurgerBuilder, axios);