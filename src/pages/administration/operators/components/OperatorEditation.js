import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputControlled from '../../../../components/InputControlled/InputControlled'

class OperatorEditation extends Component {
  state = {
    firstname: this.props.operator.firstname,
    middlename: this.props.operator.middlename,
    lastname: this.props.operator.lastname,
    email: this.props.operator.email,
    login: this.props.operator.login
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveEditation = () => {
    const { putOperatorEdit, operator } = this.props
    putOperatorEdit({ id: operator.id, ...this.state }, this.props.toogleEditation())
  }

  render() {
    const { toogleEditation } = this.props
    return (
      <tr className='admin-operators-new-item'>
        <td>
          <InputControlled
            value={this.state.firstname}
            handleChange={this.handleChange}
            name='firstname'
            data-test='administration_operators_firstname_inp'
          />
        </td>
        <td>
          <InputControlled
            value={this.state.middlename}
            handleChange={this.handleChange}
            name='middlename'
            data-test='administration_operators_middlename_inp'
          />
        </td>
        <td>
          <InputControlled
            value={this.state.lastname}
            handleChange={this.handleChange}
            name='lastname'
            data-test='administration_operators_lastname_inp'
          />
        </td>
        <td>
          <InputControlled
            value={this.state.email}
            handleChange={this.handleChange}
            name='email'
            data-test='administration_operators_email_inp'
          />
        </td>
        <td>
          <InputControlled
            value={this.state.login}
            handleChange={this.handleChange}
            name='login'
            data-test='administration_operators_login_inp'
          />
        </td>
        <td>
          <button
            className='button small green'
            onClick={this.saveEditation}
            data-test='administration_operators_save_btn'>
            Save
          </button>
          <button className='button small' onClick={toogleEditation} data-test='administration_operators_cancel_btn'>
            Cancel
          </button>
        </td>
      </tr>
    )
  }
}

OperatorEditation.propTypes = {
  putOperatorEdit: PropTypes.func,
  operator: PropTypes.object,
  toogleEditation: PropTypes.func
}

export default OperatorEditation
