import { Component } from 'react'
import { string, object, bool, func } from 'prop-types'
import { Field } from 'formik'
import { FormField, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
//import { InputMask } from 'react-input-mask'
const InputMask = require('react-input-mask')
import get from 'lodash/get'
import { getSafe } from '~/utils/functions'

const StyledDropdown = styled(Dropdown)`
  background: ${({ background }) => (background ? background : '#ffffff;')};
  min-width: 80px !important;
  margin-right: 10px;
  cursor: pointer !important;
  word-wrap: normal;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  min-width: 14em;
  min-height: 2.71428571em;
  display: inline-block;
  padding: 0.78571429em 0.4em 0.78571429em 0.2em;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid rgba(34, 36, 99, 0.15);
  border-radius: 0.28571429rem;
  transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  transition: box-shadow 0.1s ease, width 0.1s ease, -webkit-box-shadow 0.1s ease;
  text-align: right !important;
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
  /* bug in field Phone. In settings - warehouse - sidebar (edit or add) shows dropdown with numbers behind sidebar borders
  /* > .menu {
    left: -100% !important;
  } */
`

const StyledInputMask = styled(InputMask)`
  background: ${({ background }) => (background ? background : '#ffffff;')};
  .default.text {
    font-weight: normal;
  }
`

function splitPhoneNumber(phone, phoneCountryCodes) {
  let filtered = phoneCountryCodes.filter(
    (
      d // filter possible country codes
    ) => d.value === phone.slice(0, d.value.length)
  )

  let sorted = filtered.sort(function (a, b) {
    return b.value.length - a.value.length
  }) // sort by longest

  if (sorted.length > 0) {
    return {
      phoneCountryCode: sorted[0].value,
      phoneNumber: phone.slice(sorted[0].value.length)
    }
  } else {
    return { phoneCountryCode: '', phoneNumber: phone }
  }
}
/**
 *
 * @component
 */
export default class PhoneNumber extends Component {
  state = {
    phoneCountryCode: '',
    phoneNumber: '',
    phoneFull: ''
  }

  componentDidMount = async () => {
    const { defaultCountryCode } = this.props

    if (!this.props.phoneCountryCodes.length) await this.props.getCountryCodes()

    let phone = get(this.props.values, this.props.name, '').replace('+', '')
    phone = splitPhoneNumber(phone, this.props.phoneCountryCodes)
    this.setState({
      phoneCountryCode: phone.phoneCountryCode ? phone.phoneCountryCode : defaultCountryCode,
      phoneNumber: phone.phoneNumber,
      phoneFull: phone.phoneCountryCode.length ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber
    })

    //setFieldValue(name, phone.phoneCountryCode.length ? ('+' + phone.phoneCountryCode + phone.phoneNumber) : phone.phoneNumber)
    // setFieldTouched(name, true, true)
  }

  componentDidUpdate(prevProps, nextProps, snapshot) {
    let phone = get(this.props.values, this.props.name, '').replace('+', '')

    if (phone !== this.state.phoneFull) {
      phone = splitPhoneNumber(phone, this.props.phoneCountryCodes)

      this.setState({
        phoneCountryCode: phone.phoneCountryCode
          ? phone.phoneCountryCode
          : this.state.phoneCountryCode
          ? this.state.phoneCountryCode
          : this.props.defaultCountryCode,
        phoneNumber: phone.phoneNumber,
        phoneFull: phone.phoneCountryCode.length ? phone.phoneCountryCode + phone.phoneNumber : phone.phoneNumber
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.state.phoneFull !== nextState.phoneFull ||
      this.state.phoneCountryCode !== nextState.phoneCountryCode ||
      this.state.phoneNumber !== nextState.phoneNumber ||
      get(this.props.values, this.props.name, '') !== get(nextProps.values, nextProps.name, '') ||
      get(this.props.errors, this.props.name, '') !== get(nextProps.errors, nextProps.name, '') ||
      get(this.props.touched, this.props.name, '') !== get(nextProps.touched, nextProps.name, '') ||
      this.props.phoneCountryCodes.length !== nextProps.phoneCountryCodes.length ||
      this.props.disabled !== nextProps.disabled ||
      this.props.isSubmitting !== nextProps.isSubmitting
    )
  }

  handleChangeDropdown = (e, { value }) => {
    const { name, setFieldValue, setFieldTouched } = this.props
    const phone = { ...this.state, ...{ phoneCountryCode: value } }
    const phoneFull =
      phone.phoneCountryCode && phone.phoneCountryCode.length
        ? phone.phoneCountryCode + phone.phoneNumber
        : phone.phoneNumber

    this.setState({ phoneCountryCode: value, phoneFull })

    setFieldValue(
      name,
      phone.phoneNumber
        ? phone.phoneCountryCode && phone.phoneCountryCode.length
          ? '+' + phone.phoneCountryCode + phone.phoneNumber
          : phone.phoneNumber
        : ''
    )
    setFieldTouched(name, true, true)
  }

  beforeMaskedStateChange = ({ currentState, nextState, previousState }) => {
    let { value } = nextState
    const { name, setFieldValue, setFieldTouched } = this.props

    if (currentState) {
      if (currentState.value && currentState.value.charAt(0) === '+') {
        const enteredNumber = currentState.value.replace(/\D/g, '')

        let phone = splitPhoneNumber(enteredNumber, this.props.phoneCountryCodes)
        if (phone.phoneCountryCode) {
          value = phone.phoneNumber
          const phoneFull = phone.phoneCountryCode + phone.phoneNumber

          this.setState(
            {
              phoneCountryCode: phone.phoneCountryCode,
              phoneNumber: phone.phoneNumber,
              phoneFull
            },
            () => {
              setFieldValue(name, '+' + enteredNumber)
              setFieldTouched(name, true, true)

              return {
                ...nextState,
                value: phone.phoneNumber
              }
            }
          )
        }
      }

      if (previousState && currentState) {
        // same as onChange, not in render

        // Component bug workaround
        const currentNumber = currentState.value.replace(/\D/g, '')
        const nextNumber = nextState.value.replace(/\D/g, '')
        const previousNumber = previousState.value.replace(/\D/g, '')
        const newValue = currentNumber === previousNumber ? nextNumber : currentNumber
        // end of workaround

        const phone = { ...this.state, ...{ phoneNumber: newValue } }
        const phoneFull =
          phone.phoneCountryCode && phone.phoneCountryCode.length
            ? phone.phoneCountryCode + phone.phoneNumber
            : phone.phoneNumber

        this.setState({ phoneNumber: newValue, phoneFull })

        setFieldValue(
          name,
          phone.phoneNumber
            ? phone.phoneCountryCode && phone.phoneCountryCode.length
              ? '+' + phone.phoneCountryCode + phone.phoneNumber
              : phone.phoneNumber
            : ''
        )
        setFieldTouched(name, true, true)
      }
    }
    return { ...nextState, value }
  }

  render() {
    let {
      phoneCountryCodes,
      intl: { formatMessage },
      label,
      errors,
      name,
      touched,
      isSubmitting,
      disabled,
      placeholder,
      background
    } = this.props

    let { phoneCountryCode, phoneNumber } = this.state
    let error = (get(touched, name, null) || isSubmitting) && get(errors, name, null)
    return (
      <Field
        name={name}
        render={() => {
          return (
            <FormField error={!!error}>
              {label && <label>{label}</label>}
              <span style={{ display: 'flex' }} className='phone-number'>
                <StyledDropdown
                  background={background}
                  name={name + 'CountryCode'}
                  className='phone-code'
                  options={phoneCountryCodes}
                  onChange={this.handleChangeDropdown}
                  search
                  disabled={disabled}
                  placeholder={formatMessage({ id: 'global.phoneCCC', defaultMessage: '+CCC' })}
                  value={phoneCountryCode}
                />
                <StyledInputMask
                  background={background}
                  name={name}
                  className='phone-num'
                  beforeMaskedStateChange={this.beforeMaskedStateChange}
                  mask='999 999 9999'
                  maskchar=' '
                  compact='true'
                  disabled={disabled}
                  type='text'
                  value={phoneNumber}
                  placeholder={
                    placeholder || formatMessage({ id: 'global.phoneNumber', defaultMessage: 'Phone Number' })
                  }
                />
              </span>
              {!!error && <span className='sui-error-message'>{error}</span>}
            </FormField>
          )
        }}
      />
    )
  }
}

PhoneNumber.propTypes = {
  setFieldValue: func,
  setFieldTouched: func,
  setErrors: func,
  name: string.isRequired,
  values: object,
  label: object,
  search: bool,
  errors: object,
  isSubmitting: bool,
  touched: object,
  disabled: bool,
  clearable: bool,
  placeholder: string,
  background: string
}

PhoneNumber.defaultProps = {
  setFieldValue: () => console.warn('setFieldValue not supplied in PhoneNumber!'),
  setFieldTouched: () => console.warn('setFieldTouched not supplied in PhoneNumber!'),
  setErrors: () => console.warn('setErrors not supplied in PhoneNumber!'),
  name: null,
  values: null,
  search: true,
  label: 'Phone',
  errors: {},
  isSubmitting: false,
  touched: {},
  disabled: false,
  clearable: false,
  placeholder: null,
  background: null
}
