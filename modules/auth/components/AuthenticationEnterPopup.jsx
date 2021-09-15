import { connect } from 'react-redux'
import { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Images
import Icon from '../../../assets/images/login/icon-bluepallet.svg'

// Actions
import * as Actions from '../actions'

// Components
import { LoginHeader, LogoIcon } from '../../password/constants/layout'

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
    onCancel,
    onAccept,
    description,
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
    }
  }

  return (
    <Modal
      open
      size='tiny'
    >
      <Modal.Content>
        <DivCenteredWrapper>
          <LoginHeader as='h1'>
            <LogoIcon src={Icon} />
            <FormattedMessage id='auth.twoFactorAuthentication' defaultMessage='Two-Factor Authentication' />
          </LoginHeader>
          <DivDescription>{description}</DivDescription>

          <DivRow>
            <InputCode
              value={value[0]}
              onChange={( e, { value }) => handleValueChanged(e, value, 0)}
            />
            <InputCode
              value={value[1]}
              onChange={( e, { value }) => handleValueChanged(e, value, 1)}
            />
            <InputCode
              value={value[2]}
              onChange={( e, { value }) => handleValueChanged(e, value, 2)}
            />
            <InputCode
              value={value[3]}
              onChange={( e, { value }) => handleValueChanged(e, value, 3)}
            />
            <InputCode
              value={value[4]}
              onChange={( e, { value }) => handleValueChanged(e, value, 4)}
            />
            <InputCode
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
  onCancel: PropTypes.func,
  onAccept: PropTypes.func
}

AuthenticationEnterPopup.defaultProps = {
  description: (<>Description</>),
  onCancel: () => {},
  onAccept: () => {}
}

export default injectIntl(connect(null, Actions)(AuthenticationEnterPopup))
