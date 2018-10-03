import React from 'react';
import PropTypes from "prop-types";

const Operator = ({ firstname, middlename, lastname, email, login }) => {
    return (
        <tr className="admin-operators-new-item">
            <td>{firstname}</td>
            <td>{middlename}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{login}</td>
            <td>
                <button className="button small red" onClick={() => this.props.removeOperator(this.props.id)}>Delete</button>
                <button className="button small" onClick={() => this.props.editOperator({ ...this.props })}>Edit</button>
            </td>
        </tr>
    );
};

export default Operator;

Operator.propTypes = {
    firstname: PropTypes.string,
    middlename: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    login: PropTypes.string,
};