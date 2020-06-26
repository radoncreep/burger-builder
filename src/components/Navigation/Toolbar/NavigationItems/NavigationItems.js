import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
           <NavigationItem link="/" active={true}>BurgerBuilder</NavigationItem>
           <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
};

export default navigationItems;


// set the JSX attr in line 8 as active and active={true} is the same
// because true is the default value