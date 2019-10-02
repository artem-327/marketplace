import React, { Component } from 'react'
import { string, object, bool, func, oneOfType, node } from 'prop-types'
import { FormField, Dropdown, Label, List, Popup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
//import { InputMask } from 'react-input-mask'
const InputMask = require('react-input-mask')
import get from 'lodash/get'

const StyledDropdown = styled(Dropdown)`
  min-width: 80px !important;
  cursor: pointer !important;
  word-wrap: normal;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  min-width: 14em;
  min-height: 2.71428571em;
  background: #FFFFFF;
  display: inline-block;
  padding: 0.78571429em 0.4em 0.78571429em 0.2em;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid rgba(34, 36, 99, 0.15);
  border-radius: 0.28571429rem;
  transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  transition: box-shadow 0.1s ease, width 0.1s ease, -webkit-box-shadow 0.1s ease;
  text-align:right !important;
  > .search.icon,
  > .delete.icon,
  > .dropdown.icon {
    cursor: pointer !important;
    width: auto;
    height: auto;
    line-height: 1.21428571em;
    z-index: 3;
    opacity: 0.8;
    transition: opacity 0.1s ease;
  }
`

const StyledInputMask = styled(InputMask)`
  .default.text {
    font-weight: normal;
  }
`

function splitPhoneNumber(phone, phoneCountryCodes) {
  let filtered = phoneCountryCodes.filter(d => (    // filter possible country codes
    d.value === phone.slice(0, d.value.length)
  ))

  let sorted = filtered.sort(function (a, b) { return b.value.length - a.value.length }) // sort by longest

  if (sorted.length > 0) {
    return {
      phoneCountryCode: sorted[0].value,
      phoneNumber: phone.slice(sorted[0].value.length)
    }
  }
  else {
    return { phoneCountryCode: '', phoneNumber: phone }
  }
}

export default class PhoneNumber extends Component {
  state = {
    phoneCountryCode: '',
    phoneNumber: '',
    phoneFull: ''
  }

  componentDidMount = async () => {
    if (!this.props.phoneCountryCodes.length) await this.props.getCountryCodes()

    let phone = get(this.props.values, this.props.name, '').replace('+', '')
    phone = splitPhoneNumber(phone, this.props.phoneCountryCodes)
    this.setState({
      phoneCountryCode: phone.phoneCountryCode,
      phoneNumber: phone.phoneNumber,
      phoneFull: phone.phoneCountryCode ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber
    })
  }

  componentDidUpdate(prevProps, nextProps, snapshot) {
    let phone = get(this.props.values, this.props.name, '').replace('+', '')

    if (phone !== this.state.phoneFull) {
      phone = splitPhoneNumber(phone, this.props.phoneCountryCodes)
      this.setState({
        phoneCountryCode: phone.phoneCountryCode,
        phoneNumber: phone.phoneNumber,
        phoneFull: phone.phoneCountryCode ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber
      })
    }
  }

  handleChange = async (fieldName, value) => {
    const { name, setFieldValue } = this.props

    if (fieldName === 'phoneNumber') value = value.replace(/\s+/g, '')

    const phone = { ...this.state, ...{ [fieldName]: value } }
    const phoneFull = phone.phoneCountryCode ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber

    this.setState({ [fieldName]: value, phoneFull })

    setFieldValue(name, phone.phoneCountryCode ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber)
  }

  render() {
    let {
      phoneCountryCodes,
      intl: { formatMessage },
      label, error } = this.props

    let {
      phoneCountryCode,
      phoneNumber,
    } = this.state

    return (
      <FormField error={error}>
        <label>{label}</label>
        <span style={{ display: 'flex' }}>
          <StyledDropdown
            options={phoneCountryCodes}
            onChange={(e, data) => this.handleChange('phoneCountryCode', data.value)}
            search
            placeholder={formatMessage({ id: 'global.phoneCCC', defaultMessage: '+CCC' })}
            value={phoneCountryCode}
          />
          <StyledInputMask
            mask='999 999 9999'
            maskChar=' '
            compact
            type='text'
            value={phoneNumber}
            onChange={(data) => this.handleChange('phoneNumber', data.target.value)}
            placeholder={formatMessage({ id: 'global.phoneNumber', defaultMessage: 'Phone Number' })}
          />
        </span>
        {error && <span className='sui-error-message'>{error}</span>}
      </FormField>
    )
  }
}

PhoneNumber.propTypes = {
  setFieldValue: func,
  name: string.isRequired,
  values: object,
  label: object,
  search: bool,
  error: oneOfType([node, string])
}

PhoneNumber.defaultProps = {
  setFieldValue: () => console.warn('setFieldValue not supplied in PhoneNumber!'),
  name: null,
  values: null,
  search: true,
  label: 'Phone',
  error: null
}