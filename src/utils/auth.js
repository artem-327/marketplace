import axios from "axios";
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

export function withAuth(ComposedComponent) {
    class requireAuth extends React.Component {

        verify(props) {
            if (!props.isAuthenticated) {
                props.history.push("/");
            }
        }

        componentWillMount() {
            this.verify(this.props)
        }

        componentWillUpdate(nextProps) {
            this.verify(nextProps)
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }

    requireAuth.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    };

    function mapStateToProps(store) {
        return {
            isAuthenticated: store.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(requireAuth)
}

export function setAuthToken(token) {
    localStorage.setItem('jwtoken', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function deteleAuthToken() {
    localStorage.removeItem('jwtoken');
    delete axios.defaults.headers.common['Authorization'];
}