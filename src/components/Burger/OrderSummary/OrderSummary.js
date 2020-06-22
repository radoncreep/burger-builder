import React from 'react';

import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey, index) => {
            // any element you return as a list should have a unique key to idnetify each child
            return <li key={igKey + index}>
                        <span 
                            style={{ textTransform: 'capitalize' }}>{igKey}
                        </span>: {props.ingredients[igKey]}
                    </li>
        });

    return (
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.total.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxillary>
    )
};  

export default orderSummary;
