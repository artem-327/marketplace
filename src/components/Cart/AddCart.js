import React, {Component} from 'react';
// import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './cart.css';
import {Control, Form} from 'react-redux-form';

class AddCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillReceiveProps(nextProps){
    
    }

    render() {
        return (
            <div className="add-cart">
               
            </div>
        );
    }
}

AddCart.propTypes = {
    // links: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string,
    //         url: PropTypes.string,
    //         class: PropTypes.string,
    //         exact: PropTypes.bool,
    //     })
    // ),
    // search: PropTypes.bool,
    // filter: PropTypes.bool,
};


export default AddCart;