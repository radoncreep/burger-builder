import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
           <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
           {props.isAuthenticated // this is false bcos we havent authenticated so it wont show on anything the nav
                ? <NavigationItem link="/orders" >Orders</NavigationItem>
                : null}
           {!props.isAuthenticated 
                ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>
            }
        </ul>
    ) 
};

export default navigationItems;


// set the JSX attr in line 8 as active and active={true} is the same
// because true is the default value