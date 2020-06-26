import React from 'react';

import burgerLogo from '../../assests/images/27.1 burger-logo.png.png';
import './Logo.css'

const logo = (props) => {
    return (
        <div className="Logo"
            style={{
                height: props.height,
                marginBottom: props.marginBottom
            }}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    )
};

export default logo;