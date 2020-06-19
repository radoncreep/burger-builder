import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = 
        Object.keys(props.ingredients).map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((total, current) => {
            return total.concat(current);
        }, []);
        console.log(transformedIngredients);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please pick an ingredient</p>
        };

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;