import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'; // importing withRouter hoc 
import { connect } from 'react-redux'; 

import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// import Orders from './components/Order/Order';
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
      
    );

    // still protecting the routes on the server but we are adding extra security for good user experience
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      );
    };

    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// withRouter will enforce your prop being passed to the app component
