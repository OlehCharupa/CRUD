import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom"
import { isLogin, isAdmin } from "../redux/selectors/selectors"
import { paths } from '../routes/routes';


const PublicRoute = ({ component: Component, ...routeProps }) => {
    const isLoginState = useSelector(isLogin)
    const isAdminState = useSelector(isAdmin)

    const openPage = (isAdminState) => (
        isAdminState
            ? <Redirect to={paths.dashboard} />
            : <Redirect to={paths.profiles} />
    )

    return (<Route
        {...routeProps}
        render={props => {
            return isLoginState && routeProps.restricted ? (
                openPage(isAdminState)
            ) : (
                <Component {...props} />
            );
        }}
    />)


};

export default PublicRoute;