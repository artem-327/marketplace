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

  const handlePaste = ( data, index) => {
    const enteredValue = data.clipboardData.getData('Text')
    const enteredValueLength = enteredValue ? enteredValue.length : 0

    if (enteredValueLength) {
      const newValue = value.slice(0, index) + enteredValue + value.slice(index + enteredValueLength)
      setValue(newValue.slice(0, 6))
      switchToInput(index + enteredValueLength)
    }
  }

  const handleKeyDown = (e, index) => {
    console.log('!!!!!!!!!! onKeyDown e', e)

    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
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
      if (e.key.length === 1 && e.key.match(/^[0-9a-zA-Z]+$/)) {
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
              onPaste={data => handlePaste(data, 0)}
              onKeyDown={e => handleKeyDown(e, 0)}
              error={viewErrors && !value[0].match(/^[0-9a-zA-Z]+$/)}
            />
            <InputCode
              name='input2FACode1'
              value={value[1]}
              onPaste={data => handlePaste(data, 1)}
              onKeyDown={e => handleKeyDown(e, 1)}
              error={viewErrors && !value[1].match(/^[0-9a-zA-Z]+$/)}
            />
            <InputCode
              name='input2FACode2'
              value={value[2]}
              onPaste={data => handlePaste(data, 2)}
              onKeyDown={e => handleKeyDown(e, 2)}
              error={viewErrors && !value[2].match(/^[0-9a-zA-Z]+$/)}
            />
            <InputCode
              name='input2FACode3'
              value={value[3]}
              onPaste={data => handlePaste(data, 3)}
              onKeyDown={e => handleKeyDown(e, 3)}
              error={viewErrors && !value[3].match(/^[0-9a-zA-Z]+$/)}
            />
            <InputCode
              name='input2FACode4'
              value={value[4]}
              onPaste={data => handlePaste(data, 4)}
              onKeyDown={e => handleKeyDown(e, 4)}
              error={viewErrors && !value[4].match(/^[0-9a-zA-Z]+$/)}
            />
            <InputCode
              name='input2FACode5'
              value={value[5]}
              onPaste={data => handlePaste(data, 5)}
              onKeyDown={e => handleKeyDown(e, 5)}
              error={viewErrors && !value[5].match(/^[0-9a-zA-Z]+$/)}
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
                  if (value.match(/^[0-9a-zA-Z]+$/)) {
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
