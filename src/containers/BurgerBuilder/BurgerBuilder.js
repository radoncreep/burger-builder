import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary';

class BurgerBuilder extends Component {
    render () {
        return (
            <Auxillary>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxillary>
        )
    }
};

export default BurgerBuilder;