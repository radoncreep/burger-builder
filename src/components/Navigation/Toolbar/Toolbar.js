import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import Toggler from '../SideDrawer/DrawerToggler/DrawerToggler';
const toolbar = (props) => {
    return (
        <header className="Toolbar">
            <Toggler clicked={props.drawerToggle}/>

            <Logo height="100%"/>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    )
};

export default toolbar;