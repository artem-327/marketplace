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
  const [viewErrors, setViewErrors] = useState(false)

  const switchToInput = index => {
    const newIndex = index < 0
      ? 0
      : (index > 5 ? 5 : index)
    const inputElement = document.querySelector(`[name="input2FACode${newIndex}"]`)
    if (inputElement) inputElement.focus()
  }

  const handleValueChanged = ( e, data, index) => {
    const enteredValue = data.trim()
    if (!!enteredValue && index === 0 && enteredValue.length === 6) { // clipboard paste case
      setValue(enteredValue)
    }
  }

  const handleKeyDown = (e, index) => {
    if (!e.ctrlKey && !e.altKey) {
      switch (e.keyCode) {
        case 8: // Backspace
          if (index > 0) {
            const newValue = value.slice(0, index - 1) + value.slice(index) + " "
            setValue(newValue)
            switchToInput(index - 1)
          }
          break
        case 46: // Delete
          const newValue = value.slice(0, index) + value.slice(index + 1) + " "
          setValue(newValue)
          break
        case 35: // End
          switchToInput(5)
          break
        case 36: // Home
          switchToInput(0)
          break
        case 37: // Arrow Left
          switchToInput(index - 1)
          break
        case 39: // Arrow Right
          switchToInput(index + 1)
          break
      }
      if (
        (e.keyCode >= 96 && e.keyCode <= 105) ||  // 0 - 9 numerical keyboard
        (e.keyCode >= 65 && e.keyCode <= 90) ||   // a - z / A - Z
        (e.keyCode >= 48 && e.keyCode <= 57 && !e.shiftKey)) {   // 0 - 9 standard keyboard
        const newValue = value.slice(0, index) + e.key + value.slice(index + 1)
        setValue(newValue)
        switchToInput(index + 1)
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
              onKeyDown={e => handleKeyDown(e, 0)}
              error={viewErrors && value[0] === ' '}
            />
            <InputCode
              name='input2FACode1'
              value={value[1]}
              onChange={( e, { value }) => handleValueChanged(e, value, 1)}
              onKeyDown={e => handleKeyDown(e, 1)}
              error={viewErrors && value[1] === ' '}
            />
            <InputCode
              name='input2FACode2'
              value={value[2]}
              onChange={( e, { value }) => handleValueChanged(e, value, 2)}
              onKeyDown={e => handleKeyDown(e, 2)}
              error={viewErrors && value[2] === ' '}
            />
            <InputCode
              name='input2FACode3'
              value={value[3]}
              onChange={( e, { value }) => handleValueChanged(e, value, 3)}
              onKeyDown={e => handleKeyDown(e, 3)}
              error={viewErrors && value[3] === ' '}
            />
            <InputCode
              name='input2FACode4'
              value={value[4]}
              onChange={( e, { value }) => handleValueChanged(e, value, 4)}
              onKeyDown={e => handleKeyDown(e, 4)}
              error={viewErrors && value[4] === ' '}
            />
            <InputCode
              name='input2FACode5'
              value={value[5]}
              onChange={( e, { value }) => handleValueChanged(e, value, 5)}
              onKeyDown={e => handleKeyDown(e, 5)}
              error={viewErrors && value[5] === ' '}
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
                onClick={() => {
                  setViewErrors(true)
                  if (!(value.indexOf(' ') >= 0)) {
                    onAccept(value)
                  }
                }}
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
