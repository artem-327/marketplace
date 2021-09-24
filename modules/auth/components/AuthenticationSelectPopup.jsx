import { connect } from 'react-redux'
import { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Checkbox, Grid, GridRow, GridColumn, Dimmer, Loader } from 'semantic-ui-react'
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
    loading,
    description,
    message,
    timeoutSeconds,
    intl: { formatMessage }
  } = props

  const [selectedOption, setSelectedOption] = useState(0)

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
          <DivOptions>
            <Grid>
              {options.map((option, index) => (
                <GridRow key={index}>
                  <GridColumn width={16}>
                    <Checkbox
                      checked={selectedOption === index}
                      onClick={() => setSelectedOption(index)}
                      label={`${option.label} - ${option.value}`}
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
                onClick={() => onAccept(options[selectedOption].option)}
                disabled={timeoutSeconds > 0}
              >
                {timeoutSeconds > 0
                  ? (
                      <FormattedMessage
                        id='checkout.sendTimeout'
                        defaultMessage={`Send (${timeoutSeconds})`}
                        values={{ value: timeoutSeconds }}
                      />
                    )
                  : (<FormattedMessage id='global.send' defaultMessage='Send' />)
                }
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
  loading: PropTypes.bool,
  options: PropTypes.array,
  onAccept: PropTypes.func,
  message: PropTypes.any,
  timeoutSeconds: PropTypes.number
}

AuthenticationSelectPopup.defaultProps = {
  description: (<>Description</>),
  loading: false,
  options: [],
  onAccept: () => {},
  message: '',
  timeoutSeconds: 0
}

export default injectIntl(connect(null, Actions)(AuthenticationSelectPopup))