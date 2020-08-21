import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar
                    isAuth = {this.props.isAuthenticated}
                    drawerToggle={this.sideDrawerTogglerHandler}/>

                <SideDrawer
                    isAuth = {this.props.isAuthenticated}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);