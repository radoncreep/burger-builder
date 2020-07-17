import React, { Component } from 'react';
import axios from '../../../axios-orders';

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
            value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fatest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value: ''
            },
        }
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
            ingredients: this.props.ingredients,
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

    inputChangedHandler = (event, inputIdentifier) => { // Two way binding
        // console.log(event.target.value);
        const updatedOrderForm = { // cloning the order form object
            ...this.state.orderForm
        };
        const updateFormElement = { // referencing the properties of the order form clone
            ...updatedOrderForm[inputIdentifier]
        };

        updateFormElement.value = event.target.value; // not [value] but .value first one is assigning a value to the value of property while the second is assiging a value to the property or key
        updatedOrderForm[inputIdentifier] = updateFormElement // sp here youre assigning the cloned properties to the clone order form itself
        this.setState({ orderForm: updatedOrderForm});
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
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    )
                })}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        );
    };
};

export default ContactData;