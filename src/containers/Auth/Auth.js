import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
// managing our state here and not through redux because it's a local UI state
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    componentDidMount () {
        // if the user is not building a burger and the authReidrectPath is not set to home
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') { // if building is not true and then the path is set to checkout then you would want to execute the function below to set the path to home
            // console.log(this.props.buildingBurger + ' building')
            this.props.onSetAuthRedirectPath();
            // also if the user is building a burger and is then redirected to the auth page
            // and the user doesnt login, the user then goes to the home route and back to the auth page
            // the checkout path will still be recorded but overwrittem after signup to lead to the home page
        }; 
    };
    checkValidity(value, rules) { // validation obj property from each property is being passed into rules, which makes rules an object
        let isValid = true;

        if (!rules) { // another approach
            return true; // always return true for this method if no validaton rules are defined
        };

        if (rules.required) { //
            isValid = value.trim() !== '' && isValid; // if its an empty string it will be false and if theres an actual value then it will return true because an empty value is not equal to an empty string and that's true
        };

        // adding more rules
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        };

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    inputChangedHandler =(event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true // whenever this method fires the user did touch an element so it should be set to true on touch
            }
        };
        this.setState({ controls: updateControls });
    };

    SubmitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        console.log('[switchAuthModeHandler]')
        // prevState when on the sign up page is true
        // when the btn to sign is clicked, this method executes and then changes the state
        // from the prevState which was true to not true which is false
        // so if the property isSignup is false then it means the btn will show signup as the condition below
        this.setState(prevState => { // holds the prevState of the application before the method is being
            console.log(prevState.isSignup)
            return {isSignup: !prevState.isSignup}
        });
        // using prevState bcos we might not be sure abt the state's prop value
        // so prevState holds what it was before this method is executed
    };
    render () {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({ // pushing email and password obj from the state as distinct objects in the array
                id: key, // just the name/property of the obj email or password
                config: this.state.controls[key] // this is obj property value, this is an obj
            });
        };

        let form = formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                )
            );

        if (this.props.loading) {
            form = <Spinner />
        };

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p style={{color: "red", textTransform: "capitalize"}}
                    >{this.props.error.message}
                </p>
            )
        };

        let authRedirect = null;

        //  Redirecting the user after signing in
        if (this.props.isAuthenticated)  {
            console.log(this.props.authRedirectPath)
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        };
     
        return (
            <div className="Auth">
                {authRedirect}
                {errorMessage} 
                <form onSubmit={this.SubmitHandler}>
                    { form }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
        ) 
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null, //if token is not null meaning you have authenticated and there is a login
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);