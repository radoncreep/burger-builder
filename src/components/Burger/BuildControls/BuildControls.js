import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
    return (
        <div className="BuildControls">
           <p><strong>CurrentPrice: {props.price.toFixed(2)}</strong></p>
            { controls.map(ctrl => {
               
                return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}

                    // when you an onclick there has to be a function that will handle this event that is we are using a function for the attribute
                    // so when we click the event is handled by the function which has a function call in it and invokes it
                    // so these functions are handling the onclick events

                    added={() => props.addIngredients(ctrl.type)}
                    removed={() => props.removeIngredients(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            })}

            <button className="OrderButton"
                disabled={!props.purchasable}
                onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    )
};

export default buildControls;
