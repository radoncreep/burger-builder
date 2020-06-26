import React, { Component } from 'react';

import Auxillary from '../Auxillary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    };

    sideDrawerTogglerHandler = () => { // This is a clean way of setting the state when it depends on the old state
        this.setState((prevState) => {
            // console.log((prevState));
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };
    
    render() {
        return(
            <Auxillary>
                 {/* <SideDrawer /> */}
                <Toolbar drawerToggle={this.sideDrawerTogglerHandler}/>

                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />

                <main className = "Content">
                    {this.props.children}
                </main>
            </Auxillary>  
        );
    }
    // eslint-disable-next-line no-unused-expressions
  
};

export default Layout;