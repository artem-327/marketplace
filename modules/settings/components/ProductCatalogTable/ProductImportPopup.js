import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Modal, Icon, Step, ModalContent, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportEchoProductCSV,
  postImportProductOfferCSV
} from '../../actions'

import Upload from './Steps/UploadCSV'
import Map from './Steps/Map'
import Preview from './Steps/Preview'
import ConfirmationPage from './Steps/ConfirmationPage'

const StyledModal = styled(ModalContent)`
  height: 500px;
  overflow: auto;
`

class ProductImportPopup extends Component {
  state = {
    currentStep: 'upload',
    isFinishUpload: false,
    isFinishMap: false,
    isFinishPreview: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.csvFileId !== prevProps.csvFileId && this.props.csvFileId) {
      this.props.getStoredCSV(this.props.csvFileId)
    }
  }

  toUpload = () => {
    this.setState({
      currentStep: 'upload',
      isFinishUpload: false,
      isFinishMap: false,
      isFinishPreview: false
    })
    this.props.clearDataOfCSV()
  }

  steps = {
    upload: <Upload />,
    map: (
      <Map productOffer={this.props.productOffer && this.props.productOffer} echoProduct={this.props.echoProduct && this.props.echoProduct} />
    ),
    preview: (
      <Preview
        productOffer={this.props.productOffer && this.props.productOffer}
        echoProduct={this.props.echoProduct && this.props.echoProduct}
      />
    ),
    confirmation: <ConfirmationPage toUpload={this.toUpload} productOffer={this.props.productOffer && this.props.productOffer} />
  }

  render() {
    const { closeImportPopup, csvFileId, closeImportPopupCancel, intl: { formatMessage } } = this.props
    const {
      currentStep,
      isFinishUpload,
      isFinishMap,
      isFinishPreview
    } = this.state

    return (
      <Modal closeIcon onClose={() => closeImportPopupCancel(csvFileId)} open centered={false}>
        <Modal.Header><FormattedMessage id='global.csvMapping' defaultMessage='.CSV Mapping' /></Modal.Header>
        <StyledModal>
          <Step.Group widths={3}>
            <Step active={currentStep === 'upload'} completed={isFinishUpload}>
              <Icon name='upload' />
              <Step.Content>
                <Step.Title><FormattedMessage id='global.upload' defaultMessage='Upload' /></Step.Title>
              </Step.Content>
            </Step>

            <Step active={currentStep === 'map'} completed={isFinishMap}>
              <Icon name='table' />
              <Step.Content>
                <Step.Title><FormattedMessage id='global.map' defaultMessage='Map' /></Step.Title>
              </Step.Content>
            </Step>

            <Step
              active={currentStep === 'preview'}
              completed={isFinishPreview} >
              <Icon name='eye' />
              <Step.Content>
                <Step.Title><FormattedMessage id='global.preview' defaultMessage='Preview' /></Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          {this.steps[currentStep]}
        </StyledModal>
        <Modal.Actions>
          {currentStep !== 'confirmation' && (
            <div style={{ textAlign: 'right' }}>
              <Button basic onClick={() => closeImportPopupCancel(csvFileId)} data-test='settings_product_import_cancel_btn'>
                {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
              </Button>
              <Button
                primary
                onClick={this.submitHandler}
                disabled={!csvFileId}
                data-test='settings_product_import_submit_btn'>
                {formatMessage({ id: `global.${currentStep === 'preview' ? 'save' : 'next'}`, defaultMessage: currentStep === 'preview' ? 'Save' : 'Next' })}
              </Button>
            </div>
          )}
        </Modal.Actions>
      </Modal>
    )
  }

  submitHandler = () => {
    const { mappedDataHeaderCSV, csvFileId } = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      case 'upload':
        this.setState({ currentStep: 'map', isFinishUpload: true })
        break
      case 'map':
        this.setState({ currentStep: 'preview', isFinishMap: true })
        break
      case 'preview':
        this.props.productOffer
          ? this.props.postImportProductOfferCSV(mappedDataHeaderCSV, csvFileId) :
        this.props.echoProduct
          ? this.props.postImportEchoProductCSV(mappedDataHeaderCSV, csvFileId)
          : this.props.postImportProductCSV(mappedDataHeaderCSV, csvFileId)

        this.setState({ currentStep: 'confirmation', isFinishPreview: true })
        break
    }
  }
}

const mapDispatchToProps = {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportEchoProductCSV,
  postImportProductOfferCSV
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    mappedDataHeaderCSV: state.settings.dataHeaderCSV
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductImportPopup))
