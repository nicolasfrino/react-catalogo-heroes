import PropTypes from 'prop-types';
import React from 'react';

import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ( {
    isAutenticated,
    component: Component,
    ...rest
} ) => {


    //console.log('rest', rest.location.pathname);
    localStorage.setItem('lastPath',rest.location.pathname) ;

    return (
        <Route  {...rest}
                component={ (props) => (
                        (isAutenticated)
                        ? <Component {...props}/>
                        : (<Redirect to="/login"/>)
                    )
                }
        />
    )
}


PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}