import React, { Component } from 'react'
import { Modal, Button, Checkbox } from 'semantic-ui-react'
import { func, oneOfType, string, node, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'


import { logout } from '~/modules/auth/actions'
import { triggerAgreementModal } from '~/modules/settings/actions'

const TopMargedDiv = styled.div`
  margin-top: 15px;
`

class AgreementModal extends Component {
  state = { checked: false }

  render() {
    const {
      open, logout, triggerAgreementModal,
      modalHeader, modalContent, declineButtonContent,
      acceptButtonContent, isOpen, onAccept,
      additionalProps } = this.props

    return (
      <Modal {...additionalProps} open={open || isOpen}
      //onClose={logout}
      >
        <Modal.Header>{modalHeader}</Modal.Header>
        <Modal.Content>
          {modalContent}
          <TopMargedDiv>
            <Checkbox value={this.state.checked} onChange={() => this.setState({ checked: !this.state.checked })} name='accept' label='Accept' />
          </TopMargedDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={logout}>{declineButtonContent}</Button>
          <Button disabled={!this.state.checked} onClick={() => {
            onAccept()
            // triggerAgreementModal(false)
          }}
            primary>{acceptButtonContent}</Button>
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
  additionalProps: object
}

AgreementModal.defaultProps = {
  onAccept: () => { },
  additionalProps: {}
}

const mapStateToProps = ({ settings }) => {
  return {
    ...settings.agreementModal
  }
}

const mapDispatchToProps = {
  logout,
  triggerAgreementModal
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementModal)