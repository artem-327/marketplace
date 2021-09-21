import { connect } from 'react-redux'
import { getSafe } from '~/utils/functions'
import { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Images
import Icon from '../../../assets/images/login/icon-bluepallet.svg'

// Actions
import * as Actions from '../actions'

// Components
import { LoginHeader, LogoIcon, StyledMessage } from '../../password/constants/layout'

// Styles
import {
  DivDescription,
  DivRow,
  InputCode,
  DivCenteredWrapper,
  DivButtons,
  DivButtonColumn,
  LoginButton
} from '../styles'

const AuthenticationEnterPopup = props => {
  const {
    onAccept,
    loading,
    description,
    message,
    intl: { formatMessage }
  } = props

  const [value, setValue] = useState('      ')

  const handleValueChanged = ( e, data, index) => {
    let newValue = value
    const enteredValue = data.trim()

    if (!enteredValue) {
      // deleted value
      newValue = value.slice(0, index) + ' ' + value.slice(index + 1)
      setValue(newValue)
    } else {
      if (enteredValue.length === 1) {
        newValue = value.slice(0, index) + enteredValue + value.slice(index + 1)
      } else if (enteredValue.length === 2) {
        if (value[index] !== enteredValue[0]) newValue = value.slice(0, index) + enteredValue[0] + value.slice(index + 1)
        else newValue = value.slice(0, index) + enteredValue[1] + value.slice(index + 1)
      } else if (index === 0) { // clipboard paste case
        if (enteredValue.length === 6) newValue = enteredValue
      } else {
        newValue = value.slice(0, index) + enteredValue[0] + value.slice(index + 1)
      }
      setValue(newValue)
      if (index < 5) {
        const inputElement = document.querySelector(`[name="input2FACode${index + 1}"]`)
        if (inputElement) inputElement.focus()
      }
    }
  }

  return (
    <Modal
      open
      size='tiny'
    >
      <Dimmer inverted active={loading}>
        <Loader />
      </Dimmer>
      <Modal.Content>
        <DivCenteredWrapper>
          <LoginHeader as='h1'>
            <LogoIcon src={Icon} />
            <FormattedMessage id='auth.twoFactorAuthentication' defaultMessage='Two-Factor Authentication' />
          </LoginHeader>
          {message && (<StyledMessage error content={message} />)}
          <DivDescription>{description}</DivDescription>
          <DivRow>
            <InputCode
              name='input2FACode0'
              value={value[0]}
              onChange={( e, { value }) => handleValueChanged(e, value, 0)}
            />
            <InputCode
              name='input2FACode1'
              value={value[1]}
              onChange={( e, { value }) => handleValueChanged(e, value, 1)}
            />
            <InputCode
              name='input2FACode2'
              value={value[2]}
              onChange={( e, { value }) => handleValueChanged(e, value, 2)}
            />
            <InputCode
              name='input2FACode3'
              value={value[3]}
              onChange={( e, { value }) => handleValueChanged(e, value, 3)}
            />
            <InputCode
              name='input2FACode4'
              value={value[4]}
              onChange={( e, { value }) => handleValueChanged(e, value, 4)}
            />
            <InputCode
              name='input2FACode5'
              value={value[5]}
              onChange={( e, { value }) => handleValueChanged(e, value, 5)}
            />
          </DivRow>
          <DivButtons>
            <DivButtonColumn>
              <LoginButton
                type='submit'
                primary
                fluid
                size='large'
                data-test='two_factor_auth_verify_btn'
                onClick={() => onAccept(value)}
              >
                <FormattedMessage id='global.verify' defaultMessage='Verify' />
              </LoginButton>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </Modal>
  )
}

AuthenticationEnterPopup.propTypes = {
  description: PropTypes.object,
  loading: PropTypes.bool,
  onAccept: PropTypes.func,
  message: PropTypes.any
}

AuthenticationEnterPopup.defaultProps = {
  description: (<>Description</>),
  loading: false,
  onAccept: () => {},
  message: ''
}

export default injectIntl(connect(null, Actions)(AuthenticationEnterPopup))
