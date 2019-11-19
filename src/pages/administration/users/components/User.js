import React, { Component } from 'react'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import Spinner from '../../../../components/Spinner/Spinner'

//Mode
const NEW = 'New'
const MERCHANT = 'Merchant'
const OPERATOR = 'Operator'

class User extends Component {
  constructor() {
    super()
    this.state = {
      mode: NEW,
      office: null,
      operator: '',
      approved: false
    }
  }

  componentDidMount() {
    this.props.getOffices()
  }

  renderMode() {
    let user = {
      email: this.props.email,
      firstname: this.props.firstname,
      middlename: this.props.middlename,
      lastname: this.props.lastname
    }
    switch (this.state.mode) {
      case MERCHANT: {
        user = { ...user, approved: this.state.approved, office: this.state.office }
        return this.props.isFetching ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Dropdown
              opns={this.props.offices}
              placeholder='Select Office'
              onChange={value => this.setState({ office: value })}
              data-test='administration_users_merchant_drpdn'
            />
            {this.state.office ? (
              <React.Fragment>
                <button
                  className='button small'
                  onClick={() => this.setState({ approved: !this.state.approved })}
                  data-test='administration_users_merchant_approve_btn'>
                  {this.state.approved ? 'Approved!' : 'Approve'}
                </button>
                <button
                  className='button small green'
                  onClick={() => this.props.putPromoteToMerchant(this.props.id, { ...user })}
                  data-test='administration_users_merchant_save_btn'>
                  Save
                </button>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )
      }
      case OPERATOR: {
        user = { ...user, login: this.state.operator }
        return this.props.isFetching ? (
          <Spinner />
        ) : (
          <React.Fragment data-test='administration_users_login_inp'>
            <input
              placeholder='Login'
              onChange={e => this.setState({ operator: e.target.value })}
              value={this.state.operator}
            />
            {this.state.operator !== '' ? (
              <button
                className='button small green'
                onClick={() => this.props.putPromoteToOperator(this.props.id, { ...user })}
                data-test='administration_users_operator_save_btn'>
                Save
              </button>
            ) : null}
          </React.Fragment>
        )
      }
      default:
        return null
    }
  }

  render() {
    let { firstname, middlename, lastname, email } = this.props
    return (
      <tr className='admin-users-new-item'>
        <td>{firstname}</td>
        <td>{middlename}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>
          <Dropdown
            opns={[
              { id: MERCHANT, name: 'Merchant' },
              { id: OPERATOR, name: 'Operator' }
            ]}
            onChange={value => this.setState({ mode: value })}
            currentValue={this.state.mode}
            data-test='administration_users_drpdn'
          />
          {this.renderMode()}
        </td>
      </tr>
    )
  }
}

export default User
