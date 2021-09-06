import { connect } from 'react-redux'
import { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image, Checkbox, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Images
import Icon from '../../../assets/images/login/icon-bluepallet.svg'

// Actions
import * as Actions from '../actions'

// Components
import { LogoWrapper, LoginContainer, LoginSegment, InstructionsDiv, LoginHeader, StyledMessage, LogoImage, LogoIcon, LoginField, ToggleLabel, VersionWrapper } from '../../password/constants/layout'

// Services


// Styles
import {


  DivDescription,


  DivCenteredWrapper,
  DivButtons,
  DivButtonColumn,
  LoginButton
} from '../styles'

const AuthenticationEnterPopup = props => {
  const {
    onCancel,
    onAccept,
    intl: { formatMessage }
  } = props

  const [value, setValue] = useState('      ')

  const handleValueChanged = ( enteredValue, index) => {
    let newValue = ''
    if (!enteredValue) {
      // deleted value
      newValue = value.slice(0, index) + ' ' + value.slice(index + 1)
      console.log('!!!!!!!!!! null, newValue', newValue)
      setValue(newValue)
    } else {
      if (enteredValue.length === 1) {
        newValue = value.slice(0, index) + enteredValue
      } else if (enteredValue.length === 2) {
        newValue = value.slice(0, index) + enteredValue[1] + value.slice(index + 1)
      } else if (index === 0) { // clipboard paste case
        newValue = (enteredValue + "0000").slice(0, 6)
      }

      console.log('!!!!!!!!!! not null, newValue', newValue)

      setValue(newValue)
    }

    console.log('!!!!!!!!!! aaaaa enteredValue', enteredValue)
    console.log('!!!!!!!!!! aaaaa index', index)

  }



  console.log('!!!!!!!!!! aaaaa value[0]', value[0])
  console.log('!!!!!!!!!! aaaaa value[1]', value[1])
  console.log('!!!!!!!!!! aaaaa value[2]', value[2])
  console.log('!!!!!!!!!! aaaaa value[3]', value[3])
  console.log('!!!!!!!!!! aaaaa value[4]', value[4])
  console.log('!!!!!!!!!! aaaaa value[5]', value[5])

  return (
    <Modal
      open
      size='tiny'
      onClose={() => onCancel()}
    >
      <Modal.Content>
        <DivCenteredWrapper>
          <LoginHeader as='h1'>
            <LogoIcon src={Icon} />
            <FormattedMessage id='auth.twoFactorAuthentication' defaultMessage='Two-Factor Authentication' />
          </LoginHeader>

          <DivDescription>
            <FormattedMessage
              id='auth.pleaseEnterSixDigits'
              defaultMessage='Please Enter the six-digit code sent to your email.'
            />
          </DivDescription>





          <Input
            value={value[0]}
            onChange={( _, { value }) => handleValueChanged(value, 0)}
          />
          <Input
            value={value[1]}
            onChange={( _, { value }) => handleValueChanged(value, 1)}
          />
          <Input
            value={value[2]}
            onChange={( _, { value }) => handleValueChanged(value, 2)}
          />
          <Input
            value={value[3]}
            onChange={( _, { value }) => handleValueChanged(value, 3)}
          />
          <Input
            value={value[4]}
            onChange={( _, { value }) => handleValueChanged(value, 4)}
          />
          <Input
            value={value[5]}
            onChange={( _, { value }) => handleValueChanged(value, 5)}
          />



          <DivButtons>
            <DivButtonColumn>
              <LoginButton
                type='submit'
                primary
                fluid
                size='large'
                data-test='login_submit_btn'

                onClick={() => {
                  console.log('!!!!!!!!!! onClick')
                  onAccept()
                }}

              >
                <FormattedMessage id='global.send' defaultMessage='Send' />
              </LoginButton>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = store => {


  return {

  }
}

AuthenticationEnterPopup.propTypes = {
  //asModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func
}

AuthenticationEnterPopup.defaultProps = {
  onCancel: () => {},
  onAccept: () => {}
}

export default injectIntl(connect(mapStateToProps, Actions)(AuthenticationEnterPopup))
