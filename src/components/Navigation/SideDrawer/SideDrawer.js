import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/Toolbar/NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary'
const sidedrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];

    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"]
    };
    
    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed}/> 
                <div className={attachedClasses.join(' ')}>
                    <Logo height="11%" marginBottom="32px"/>
                    <nav>
                        <NavigationItems /> 
                    </nav>
                </div>
        </Auxillary>
    )
};

export default sidedrawer;