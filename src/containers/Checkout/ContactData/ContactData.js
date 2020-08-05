import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import './ContactData.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fatest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value: '', // the value of the options at first will be an empty string and will only be updated once we trigger onChange i.e once we change the value once, 
                // this will become an issue once we submit our form to the server, then we will actually submit an empty value in case we never switch the value
                // all controls are now setup equal
                // if the controls or property elements do not need validaton it should just be empty
                validation: {}, // accessing the validaton poperty as an arg "rules" in the checkValidity method will not  fail but return undefined
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); // this method prevents the default, which would be to send a req and reload the page
        this.setState({ loading: true }); // to show spinner if we want to 

        let formData = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // alert('You continue to the next step!');
        const orders = {
            ingredients: this.props.ings,
            price: this.props.price, // this should be recalculated in the server in a real application
            orderData: formData
        };

        // the syntax for sending a req to firebase is the name of the node with .json as its extension
        axios.post('/orders.json', orders)
            .then(response => {
                // console.log(response)
                this.setState({ loading: false });
                this.props.history.push('/'); // getting history through props on the routing componeent
                // but because of the way this component is rendered thru the render method it wont recieve history as props so we have to pass it
                
            }).catch(error => {
                this.setState({ loading: false });
                console.log(error);
            }
        );
    }

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

    inputChangedHandler = (event, inputIdentifier) => { // Two way binding
        // console.log(event.target.value);
        // the inputIdentifier is the formElement passed as an arg here
        // it cld be the name, street, zip code... obj property
        const updatedOrderForm = { // cloning the order form object
            ...this.state.orderForm
        };

        const updateFormElement = { // referencing the properties of the order form clone
            ...updatedOrderForm[inputIdentifier] // if the inputIdentifier is the name porperty from orderForm clone then the properties of name is going to be spread into this obj
        };

        updateFormElement.value = event.target.value; // not [value] but .value first one is assigning a value to the value of property while the second is assiging a value to the property or key
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation); // this method returns true or false
        updateFormElement.touched = true; // when the element is clicked the event is fired off, so if a value has been inserted or deleted in the input it counts as being touched, so the value here is set to true
        updatedOrderForm[inputIdentifier] = updateFormElement // sp here youre assigning the cloned properties to the clone order form itself
        
        let formValid = true

        for (let inputIdentifier in updatedOrderForm) {
            formValid = updatedOrderForm[inputIdentifier].valid && formValid;
        };

        this.setState({ orderForm: updatedOrderForm, formIsValid: formValid });
    };


    render() {
        let formElementsArray = [];

        for (let key in this.state.orderForm) { // each of the properties of order form are going to be object elements
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key], // this is going to be an obje ct like name: {} , street: {} as in this.state.orderForm
            });
        };

        let form = (
            <form>
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                {formElementsArray.map(formElement => { // it's either you use the return keyword or you return the component as o line with => () instead of => {} where you need the return kwyword
                    return (
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
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        };

        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);