import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../services/authServices';

const PublicRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return !getToken() ? <Component {...props} /> : <Redirect to={{pathname: '/premium-content'}} />
            }}
        />
    )
}

export default PublicRoutes;