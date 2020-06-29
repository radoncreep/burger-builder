import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary'

const withErrorHandler = (WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req; // We jave to return our req config so the req cld continue
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => { // also returning the response so it cn be used in the promise block and it can continue with the response
                this.setState({ error: error });
            })
        }

        // Removing interceptors error from memory created components having errors
        componentWillUnmount () {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor); 
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Auxillary>
                    {/* if its not null */}
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}> 
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxillary>
            ) 
        }
    }
};

export default withErrorHandler;