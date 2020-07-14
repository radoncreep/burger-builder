import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        // console.log('rogiehgeoigrehog')
        // console.log(this.state.orders)
        axios.get('/orders.json')
            .then(res => {
                // console.log(res.data)
                const fetchedOrders = [];
                
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchedOrders });
            }).catch(error => {
                this.setState({ loading: false }); // if there's an error you don't wont it to keep loading
            })
    }

    render() {
        return (
            <div>
               {this.state.orders.map(order => (
                   <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price}/>
               ))}
            </div>
        );
    }
}

export default Orders;
