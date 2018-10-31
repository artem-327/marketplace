import React, { Component } from 'react'
import PropTypes from "prop-types"
import InputControlled from "../../../components/InputControlled/InputControlled";

class OperatorEditation extends Component {
    state = {
        name: this.props.office.name,
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveEditation = () => {
        const {editOffice, office} = this.props;
        editOffice({id: office.id, ...this.state}, this.props.toogleEditation())
    }

    render() {
        const { toogleEditation } = this.props
        return (
            <tr className="admin-operators-new-item">
                <td><InputControlled
                    value={this.state.firstname}
                    handleChange={this.handleChange}
                    name="name"
                /></td>
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
