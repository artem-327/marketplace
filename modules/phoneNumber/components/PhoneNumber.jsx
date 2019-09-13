import React, { Component } from 'react'
import { string, array, object, bool, func } from "prop-types"
import { FormGroup, FormField, Dropdown, Input, Table, TableCell, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
//import { InputMask } from 'react-input-mask'
const InputMask = require("react-input-mask")
import get from 'lodash/get'

const StyledDropdown = styled(Dropdown)`
  min-width: 120px !important;
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

        {true && (
        <span style={{ display: 'flex'}}>
          <StyledDropdown
            options={phoneCountryCodes}
            onChange={(e, data) => this.handleChange('phoneCountryCode', data.value)}
            selection
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
        )}


        {false && (
          <InputMask
          mask="999 999 9999"
          maskChar=" "
          type='text'
          value={phoneNumber}
          onChange={(data) => this.handleChange('phoneNumber', data.target.value)}
          >
          {(inputProps) =>
            <Input
              {...inputProps}
              type='text'
              label={
                <StyledDropdown
                  options={phoneCountryCodes}
                  onChange={(e, data) => this.handleChange('phoneCountryCode', data.value)}
                  selection
                  compact
                  placeholder={formatMessage({ id: 'global.phoneCCC', defaultMessage: '+XXX' })}
                  value={phoneCountryCode}
                />
              }
              labelPosition='left'
              placeholder={formatMessage({ id: 'global.phoneNumber', defaultMessage: 'Phone Number' })}
            />
          }
        </InputMask>
        )}

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