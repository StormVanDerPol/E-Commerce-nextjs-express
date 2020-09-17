import React, { Component } from 'react';
import { dodoFlight, dodoTimeouts } from '../utils/dodoAirlines';
import Redirect from '../pages/redirect';
import localStorageService from '../utils/LocalStorageService';

//WithAuth protects routes. Protected routes are only accessible with a valid token.
const WithAuth = (AuthComponent, isAdmin) => {

    return class Authenticated extends Component {

        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                forbidden: false,
            }
        }

        async componentDidMount() {
            //Get user info, refreshes token.
            const res = await dodoFlight({
                method: 'get',
                url: `${location.origin}/api/v1/admin`,
                timeout: dodoTimeouts.short,
                token: localStorageService.get('token'),
            });

            if (res.data.success) {
                //If our call succeeds (token is valid)
                if (isAdmin) {
                    //is admin route
                    this.setState({
                        loading: false,
                        //Check if role is admin, if not, return forbidden
                        forbidden: (res.data.user.role === 'admin') ? false : true,
                    });
                } else {
                    //!admin route
                    this.setState({
                        loading: false,
                    })
                }

            } else {
                //if token is invalid, return forbidden
                this.setState({
                    loading: false,
                    forbidden: true,
                });
            }
        }

        render() {
            //Display loading component to protect sensitive data
            return (this.state.loading) ?
                <p>Loading...</p> : (this.state.forbidden) ?
                    <Redirect to={'/forbidden'} /> : <AuthComponent />
        }
    }
}

export default WithAuth;