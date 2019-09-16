import React, { Component } from 'react'
import { string, object, bool, func } from "prop-types"
import { FormField, Dropdown } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
//import { InputMask } from 'react-input-mask'
const InputMask = require("react-input-mask")
import get from 'lodash/get'

const StyledDropdown = styled(Dropdown)`
  min-width: 120px !important;
  cursor: pointer !important;
  word-wrap: normal;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  min-width: 14em;
  min-height: 2.71428571em;
  background: #FFFFFF;
  display: inline-block;
  padding: 0.78571429em 0.78571429em 0.78571429em 0.78571429em;
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
  let i = phoneCountryCodes.findIndex(d => (
    d.value === phone.slice(0, d.value.length)
  ))

  if (i >= 0) {
    return {
      phoneCountryCode: phoneCountryCodes[i].value,
      phoneNumber: phone.slice(phoneCountryCodes[i].value.length)
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
  }

  componentDidMount = async () => {
    let phone = get(this.props.values, this.props.name, '')
    if (!this.props.phoneCountryCodes.length) await this.props.getCountryCodes()

    phone = splitPhoneNumber(phone, this.props.phoneCountryCodes)
    this.setState({ phoneCountryCode: phone.phoneCountryCode, phoneNumber: phone.phoneNumber })
  }

  handleChange = async (fieldName, value) => {
    const { name, setFieldValue } = this.props

    if (fieldName === 'phoneNumber') value = value.replace(/\s+/g, '')

    this.setState({ [fieldName]: value })
    const phone = { ...this.state, ...{ [fieldName]: value } }

    setFieldValue(name, phone.phoneCountryCode ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber)
  }

  render() {
    let {
      phoneCountryCodes,
      intl: { formatMessage }
    } = this.props

    let {
      phoneCountryCode,
      phoneNumber,
    } = this.state

    return (
      <FormField>
        <label><FormattedMessage id='global.phone' defaultMessage='Phone' /></label>
        <span style={{ display: 'flex'}}>
          <StyledDropdown
            options={phoneCountryCodes}
            onChange={(e, data) => this.handleChange('phoneCountryCode', data.value)}
            search
            placeholder={formatMessage({ id: 'global.phoneCCC', defaultMessage: '+XXX' })}
            value={phoneCountryCode}
          />
          <StyledInputMask
            mask="999 999 9999"
            maskChar=" "
            compact
            type='text'
            value={phoneNumber}
            onChange={(data) => this.handleChange('phoneNumber', data.target.value)}
            placeholder={formatMessage({ id: 'global.phoneNumber', defaultMessage: 'Phone Number' })}
          />
        </span>
      </FormField>
    )
  }
}

PhoneNumber.propTypes = {
  setFieldValue: func,
  name: string.isRequired,
  values: object,
  label: string,
  search: bool,
}

PhoneNumber.defaultProps = {
  setFieldValue: () => console.warn('setFieldValue not supplied in PhoneNumber!'),
  name: null,
  values: null,
  search: true,
}