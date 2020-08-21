import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout(); // first thing when rendering the component
    }

    render() {
        // we dont need a slice of the global state here 
        // bcos when the onLogut function is run the tokens in the state
        // become null, which means the users has logged out and 
        // the tokens dont exist anymore in the state
        // so then the redirect
        // whenever this container is loaded it redirects
        return <Redirect to="/"/>
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(Logout);