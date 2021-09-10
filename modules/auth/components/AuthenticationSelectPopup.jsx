import { connect } from 'react-redux'
import { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image, Checkbox } from 'semantic-ui-react'
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

const AuthenticationSelectPopup = props => {
  const {
    onCancel,
    onAccept,
    intl: { formatMessage }
  } = props

  const email = 'emajl'
  const phone = '+420158'

  console.log('!!!!!!!!!! AuthenticationSelectPopup props', props)

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
              id='auth.weDontRecognizeDevice'
              defaultMessage='We don’t recognize this device. For your safety, select which device you would like a verification code to be sent.'
            />
          </DivDescription>


          <Checkbox
            defaultChecked={false}
            onChange={(e, { checked }) => {
              console.log('!!!!!!!!!! aaaaa checked 1', checked)
            }}
            label={
              formatMessage({ id: 'auth.checkboxEmail', defaultMessage: `Email - ${email}` }, { value: email })
            }
          />

          <Checkbox
            defaultChecked={false}
            onChange={(e, { checked }) => {
              console.log('!!!!!!!!!! aaaaa checked 2', checked)
            }}
            label={
              formatMessage({ id: 'auth.checkboxPhone', defaultMessage: `SMS Text - ${phone}` }, { value: phone })
            }
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

AuthenticationSelectPopup.propTypes = {
  //asModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func
}

AuthenticationSelectPopup.defaultProps = {
  onCancel: () => {},
  onAccept: () => {}
}

export default injectIntl(connect(mapStateToProps, Actions)(AuthenticationSelectPopup))