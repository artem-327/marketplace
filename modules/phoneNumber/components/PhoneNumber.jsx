import React, { Component } from 'react'
import { string, array, object, bool, func } from "prop-types"
import { FormGroup, FormField, Dropdown, Input, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
// stahnout import { InputMask } from 'react-input-mask'

const StyledDropdown = styled(Dropdown)`
  min-width: 150px !important;
`

function deref(obj, s) {
  var i = 0
  s = s.split('.')
  while (obj && i < s.length)
    obj = obj[s[i++]]
  return obj
}

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
    let phone = deref(this.props.values, this.props.name) || ''
    if (!this.props.phoneCountryCodes.length) await this.props.getCountryCodes()

    phone = splitPhoneNumber(phone, this.props.phoneCountryCodes)
    this.setState({ phoneCountryCode: phone.phoneCountryCode, phoneNumber: phone.phoneNumber })
  }

  handleChange = async (fieldName, value) => {
    const { name, setFieldValue } = this.props

    this.setState({ [fieldName]: value })
    const phone = { ...this.state, ...{ [fieldName]: value } }

    setFieldValue(name, phone.phoneCountryCode ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber)
  }

  render() {
    let {
      name,
      dialCodes,
      label,
      search,
      phoneCountryCodes,
      intl: { formatMessage }
    } = this.props

    let {
      phoneCountryCode,
      phoneNumber,
    } = this.state

    console.log('!!!!!!!! phoneCountryCodes', phoneCountryCodes)

    return (
      // <FormGroup>
      //   <FormField width='2'>
      //     <label><FormattedMessage id='global.phoneCCC' defaultMessage='+XXX' /></label>

          
      //   </FormField>
        <FormField width='10'>
          <label><FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' /></label>
          <Input
            type='text'
            label={
              <StyledDropdown
                options={phoneCountryCodes}
                onChange={(e, data) => this.handleChange('phoneCountryCode', data.value)}
                selection
                search
                compact
                placeholder={formatMessage({ id: 'global.phoneCCC', defaultMessage: '+XXX' })}
                value={phoneCountryCode}
              />
            }
            labelPosition='left'
            onChange={(e, data) => this.handleChange('phoneNumber', data.value)}
            value={phoneNumber}
            placeholder={formatMessage({ id: 'global.phoneNumber', defaultMessage: 'Phone Number' })}
          />
        </FormField>
      // </FormGroup>
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