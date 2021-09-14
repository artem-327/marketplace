import { connect } from 'react-redux'
import { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Checkbox, Grid, GridRow, GridColumn } from 'semantic-ui-react'
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
  DivOptions,
  DivCenteredWrapper,
  DivButtons,
  DivButtonColumn,
  LoginButton
} from '../styles'

const AuthenticationSelectPopup = props => {
  const {
    onAccept,
    options,
    description,
    intl: { formatMessage }
  } = props

  const [selectedOption, setSelectedOption] = useState(0)

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
          <DivOptions>
            <Grid>
              {Object.keys(options).map((key, index) => (
                <GridRow key={index}>
                  <GridColumn width={16}>
                    <Checkbox
                      checked={selectedOption === index}
                      onClick={() => setSelectedOption(index)}
                      label={`${options[key].label} - ${options[key].value}`}
                    />
                  </GridColumn>
                </GridRow>
              ))}
            </Grid>
          </DivOptions>
          <DivButtons>
            <DivButtonColumn>
              <LoginButton
                type='submit'
                primary
                fluid
                size='large'
                data-test='two_factor_auth_send_btn'
                onClick={() => onAccept(Object.keys(options)[selectedOption])}
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

AuthenticationSelectPopup.propTypes = {
  description: PropTypes.object,
  options: PropTypes.object,
  onAccept: PropTypes.func
}

AuthenticationSelectPopup.defaultProps = {
  description: (<>Description</>),
  options: {},
  onAccept: () => {}
}

export default injectIntl(connect(null, Actions)(AuthenticationSelectPopup))