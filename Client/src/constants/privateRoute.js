import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
            return <Component {...props} />
    }} />
)
export default PrivateRoute;