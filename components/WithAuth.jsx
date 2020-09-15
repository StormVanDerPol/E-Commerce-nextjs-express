import React, { Component } from 'react';
import { dodoFlight, dodoTimeouts } from '../utils/dodoAirlines';
import Redirect from '../pages/redirect';
import localStorageService from '../utils/LocalStorageService';

//WithAuth protects routes. Protected routes are only accessible with a valid token.

//heeeelp
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

            try {
                //Get user info, refreshes token.
                const { data } = await dodoFlight({
                    method: 'get',
                    url: `${location.origin}/api/v1/admin/me`,
                    timeout: dodoTimeouts.short,
                    token: localStorageService.get('token'),
                });

                if (data.success) {

                    if (isAdmin) {
                        this.setState({
                            loading: false,
                            forbidden: (data.user.role === 'admin') ? false : true,
                        });
                    } else {
                        this.setState({
                            loading: false,
                        })
                    }
                } else {
                    if (data.message === 'TOKEN EXPIRED') {
                        localStorageService.clear();
                    }

                    this.setState({
                        loading: false,
                        forbidden: true,
                    })
                }

            } catch (err) {

                console.log('unhandled')

                this.setState({
                    loading: false,
                    forbidden: true,
                })
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