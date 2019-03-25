import axios from "axios";
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from "../components/Spinner/Spinner";
import {logout} from "../modules/identity";

export function withAuth(ComposedComponent) {
    class requireAuth extends React.Component {

        verify(props) {
            if (!props.isAuthenticated && !props.isFetchingIdentity) {
                if(props.location.pathname !== "/login")
                    props.router.push("/login");
            }
            if(!props.isFetchingIdentity && !localStorage.jwtoken) {
                logout();
                if(props.location.pathname !== "/login")
                    props.router.push("/login");
            }
        }

        componentWillMount() {
            this.verify(this.props)
        }

        componentWillUpdate(nextProps) {
            this.verify(nextProps)
        }

        render() {
            return this.props.isFetchingIdentity ? <Spinner /> : <ComposedComponent {...this.props}/>
        }
    }

    requireAuth.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isFetchingIdentity: PropTypes.bool.isRequired
    };

    function mapStateToProps(store) {
        return {
            isAuthenticated: store.identity.isAuthenticated,
            isFetchingIdentity: store.identity.identity.isFetching
        }
    }
    return connect(mapStateToProps)(requireAuth)
}

export function setAuthToken(token) {
    localStorage.setItem('jwtoken', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function deleteAuthToken() {
    localStorage.removeItem('jwtoken');
    delete axios.defaults.headers.common['Authorization'];
}

export function checkToken(props) {
    //use isFetchingIdentity ?
    return false;
    if(!props.isFetchingIdentity && !localStorage.jwtoken) {
        logout();
        if(props.location.pathname !== "/auth/login")
            props.router.push("/auth/login");
            return true;
    }
    return false;
}