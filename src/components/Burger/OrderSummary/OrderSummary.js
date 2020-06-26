import React, { Component } from 'react';

import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    componentWillUpdate() { // Using hooks to optimize rendering
        // Order summary was logging if tho it was just an ig that was added and not the order summary being shown
        // So it won't make alot of sense to have it rendered/Updated if it is not being shown
        console.log('[OrderSummary] WillUpdate');
    }
    render() {        
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey, index) => {
            // any element you return as a list should have a unique key to idnetify each child
            return <li key={igKey + index}>
                        <span 
                            style={{ textTransform: 'capitalize' }}>{igKey}
                        </span>: {this.props.ingredients[igKey]}
                    </li>
        });

        return (
            <Auxillary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.total.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxillary>
        )
    }
};  

export default OrderSummary;
