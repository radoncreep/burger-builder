import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
// import axios from '../../axios-orders';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount () {
        // console.log('rogiehgeoigrehog')
        // console.log(this.state.orders)
        this.props.onFetchOrders();
    };

    render() {
        let orders = <Spinner />
        if (!this.props.loading) { // if loading is false
            orders = this.props.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price}/>
                    )
                )
            }
        return (
            <div>
               {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);


// BEFORE REDUX
// axios.get('/orders.json')
// .then(res => {
//     // console.log(res.data)
//     const fetchedOrders = [];
    
//     for (let key in res.data) {
//         fetchedOrders.push({
//             ...res.data[key],
//             id: key
//         })
//     }
//     this.setState({ loading: false, orders: fetchedOrders });
// }).catch(error => {
//     this.setState({ loading: false }); // if there's an error you don't wont it to keep loading
// })
