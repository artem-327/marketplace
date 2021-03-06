import { Component } from 'react'
import { Modal, Button, Checkbox, Divider } from 'semantic-ui-react'
import { func, oneOfType, string, node, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getSafe } from '~/utils/functions'
import { logout } from '~/modules/auth/actions'
import { triggerAgreementModal } from '~/modules/settings/actions'
import { FormattedMessage, injectIntl } from 'react-intl'
//Constants
import { URL_TERMS, URL_PRIVACY } from '../../constants'

const TopMargedDiv = styled.div`
  margin-top: 15px;
`

class AgreementModal extends Component {
  state = { checked: false }

  render() {
    const {
      open,
      logout,
      triggerAgreementModal,
      modalHeader,
      modalContent,
      declineButtonContent,
      acceptButtonContent,
      isOpen,
      onAccept,
      additionalProps,
      tos,
      isCompanyAdmin,
      applicationName,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal {...additionalProps} open={open || isOpen} onClose={logout} closeIcon>
        <Modal.Header>{modalHeader}</Modal.Header>
        <Modal.Content>
          {modalContent}
          {tos &&
            (isCompanyAdmin ? (
              <>
                <Divider hidden />
                <FormattedMessage
                  id='agree.withTOS.companyAdmin'
                  values={{
                    echosTermsOfService: (
                      <a href={URL_TERMS} target='_blank'>
                        {formatMessage({ id: 'verification.echosTOS' }, { companyName: applicationName })}
                      </a>
                    ),
                    echosTermsOfUse: (
                      <a href={URL_TERMS} target='_blank'>
                        {formatMessage({ id: 'verification.termsOfUse' })}
                      </a>
                    ),
                    echosPrivacyPolicy: (
                      <a href={URL_PRIVACY} target='_blank'>
                        {formatMessage({ id: 'verification.privacyPolicy' })}
                      </a>
                    ),
                    dwollasTermsOfService: (
                      <a href={URL_TERMS} target='_blank'>
                        {formatMessage({ id: 'verification.dwollasTOS' })}
                      </a>
                    ),
                    dwollasPrivacyPolicy: (
                      <a href={URL_PRIVACY} target='_blank'>
                        {formatMessage({ id: 'verification.privacyPolicy' })}
                      </a>
                    )
                  }}
                />
              </>
            ) : (
              <>
                <Divider hidden />
                <FormattedMessage
                  id='agree.withTOS.nonCompanyAdmin'
                  values={{
                    echosTermsOfService: (
                      <a href={URL_TERMS} target='_blank'>
                        {formatMessage({ id: 'verification.echosTOS' }, { companyName: applicationName })}
                      </a>
                    ),
                    echosTermsOfUse: (
                      <a href={URL_TERMS} target='_blank'>
                        {formatMessage({ id: 'verification.termsOfUse' })}
                      </a>
                    ),
                    echosPrivacyPolicy: (
                      <a href={URL_PRIVACY} target='_blank'>
                        {formatMessage({ id: 'verification.privacyPolicy' })}
                      </a>
                    )
                  }}
                />
              </>
            ))}
          <TopMargedDiv>
            <Checkbox
              checked={this.state.checked}
              onChange={() => this.setState({ checked: !this.state.checked })}
              name='accept'
              label='Accept'
            />
          </TopMargedDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={logout}>{declineButtonContent}</Button>
          <Button
            disabled={!this.state.checked}
            onClick={() => {
              onAccept()
              // triggerAgreementModal(false)
            }}
            primary>
            {acceptButtonContent}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

AgreementModal.propTypes = {
  onAccept: func,
  modalHeader: oneOfType([string, node]),
  modalContent: oneOfType([string, node]),
  acceptButtonContent: oneOfType([string, node]),
  declineButtonContent: oneOfType([string, node]),
  open: bool, // Via redux
  isOpen: bool, // Direct child in render,
  additionalProps: object,
  tos: bool
}

AgreementModal.defaultProps = {
  onAccept: () => {},
  additionalProps: {},
  tos: true
}

const mapStateToProps = ({ auth, settings }) => {
  return {
    ...settings.agreementModal,
    applicationName: auth?.identity?.appInfo?.applicationName,
    isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, false)
  }
}

const mapDispatchToProps = {
  logout,
  triggerAgreementModal
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(AgreementModal))
