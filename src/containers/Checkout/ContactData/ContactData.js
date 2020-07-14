import React, { Component } from 'react';
import axios from '../../../axios-orders';

import './ContactData.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); // this method prevents the default, which would be to send a req and reload the page
        this.setState({ loading: true }); // to show spinner if we want to 

        // alert('You continue to the next step!');
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price, // this should be recalculated in the server in a real application
            customer: {
                name: 'Victor Onofiok',
                address: {
                    street: 'Wall Street',
                    zipCode: '019234',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fatest'
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

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Your name"></input>
                <input className="Input" type="email" name="email" placeholder="Your email"></input>
                <input className="Input" type="text" name="street" placeholder="Your street address"></input>
                <input className="Input" type="text" name="postal" placeholder="Your postal code"></input>
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