import React from 'react';

import './Modal.css';
import Auxillary from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Auxillary>
            <Backdrop show={props.show} clicked={props.modalClosed}/> 
            <div 
                className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    {props.children}
            </div>
        </Auxillary>
    
    )
};

export default modal;