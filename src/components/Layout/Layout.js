import React from 'react';

import Auxillary from '../../hoc/Auxillary';
import './Layout.css';

const layout = (props) => {
    // eslint-disable-next-line no-unused-expressions
   return(
        <Auxillary>
            <div>Toolbar, SideDrawer, Backup</div>
            <main className = "Content">
                {props.children}
            </main>
        </Auxillary>  
    );
};

export default layout;