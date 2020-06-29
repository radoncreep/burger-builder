import React, { Component } from 'react';

import './Modal.css';
import Auxillary from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate( nextProps, nextState ) {
        // if (nextProps.show !== this.props.state) {
        //     return true;
        // }
        // console.log(nextProps.show + ' next Props');
        // console.log(`${this.props.show} this.props`)
        // console.log(nextProps.show !== this.props.show);
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate')
    }
    render() {
        return (
            <Auxillary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/> 
                <div 
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                        {this.props.children}
                </div>
            </Auxillary>
        
        )
    }
};

export default Modal;