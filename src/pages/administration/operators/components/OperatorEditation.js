import React, { Component } from 'react'
import PropTypes from "prop-types"
import InputControlled from "../../../../components/InputControlled/InputControlled";

class OperatorEditation extends Component {
    state = {
        firstname: this.props.operator.firstname,
        middlename: this.props.operator.middlename,
        lastname: this.props.operator.lastname,
        email: this.props.operator.email,
        login: this.props.operator.login,
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveEditation = () => {
        const {editOperator, operator} = this.props;
        editOperator({id: operator.id, ...this.state}, this.props.toogleEditation())
    }

    render() {
        const { toogleEditation } = this.props
        return (
            <tr className="admin-operators-new-item">
                <InputControlled
                    value={this.state.firstname}
                    handleChange={this.handleChange}
                    name="firstname"
                />
                <InputControlled
                    value={this.state.middlename}
                    handleChange={this.handleChange}
                    name="middlename"
                />
                <InputControlled
                    value={this.state.lastname}
                    handleChange={this.handleChange}
                    name="lastname"
                />
                <InputControlled
                    value={this.state.email}
                    handleChange={this.handleChange}
                    name="email"
                />
                <InputControlled
                    value={this.state.login}
                    handleChange={this.handleChange}
                    name="login"
                />
                <td>
                    <button className="button small green" onClick={this.saveEditation}>Save</button>
                    <button className="button small" onClick={toogleEditation}>Cancel</button> 
                </td>
            </tr>
        )
    }
}

OperatorEditation.propTypes = {
    editOperator: PropTypes.func,
    operator: PropTypes.object,
    toogleEditation: PropTypes.func
};

export default OperatorEditation;
