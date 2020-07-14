import React from 'react';

import './Order.css'
// import { checkPropTypes } from 'prop-types';
const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({ // we are not just getting the name of the ig e.g 'salad', we want each ig name and its amount, so we group them into an obj push in to the new constant
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }; // [ {name: 'salad', amount: 2}, {name: 'bacon', amount: 1} ]

    const ingredientOutput = ingredients.map(ig => { // mapping each element in the array to a JSX span tag
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                oadding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})
        </span>
    });

    return (
        <div className="Order">
            <p>Ingredients: { ingredientOutput }</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default order;