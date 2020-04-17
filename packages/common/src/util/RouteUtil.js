// src/util/route_util.js

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-native';
import {useSelector} from "react-redux";
// Passed in from parent component or from mapStateToProps
export const Auth = ({ component: Component, user, loginUser, ...rest }) => {
    const loggedIn = !!user;
    return (
        <Route
            {...rest}
            render={(props) => (
            !loggedIn ? (
                <Component {...props} loginUser={loginUser} />
            ) : (
                    // Redirect to the tweets page if the user is authenticated
                    <Redirect to="/" />
                )
        )}
        />
    )
};

export const Protected = ({ component: Component, user, loginUser = () => {}, ...rest }) => {
    const loggedIn = !!user;
    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} user={user} loginUser={loginUser} />
                ) : (
                    // Redirect to the login page if the user is already authenticated
                    <Redirect to="/login"/>
                )
            }
        />
    )
};

// Use the isAuthenitcated slice of state to determine whether a user is logged in

// const mapStateToProps = state => (
//     { loggedIn: state.session.isAuthenticated }
// );

// export const AuthRoute = withRouter(Auth);
//
// export const ProtectedRoute = withRouter(Protected);