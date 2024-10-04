import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../services/authServices';

const PrivateRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return getToken() ? <Component {...props} /> : <Redirect to={{pathname: '/login'}} />
            }}
        />
    )
}

export default PrivateRoutes;