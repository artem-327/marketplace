import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Modal, Grid, Icon, Step, ModalContent, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportEchoProductCSV,
  postImportProductOfferCSV,
  handleSaveMapCSV
} from '../../actions'

import Upload from './Steps/UploadCSV'
import Map from './Steps/Map'
import Preview from './Steps/Preview'
import ConfirmationPage from './Steps/ConfirmationPage'
import _invert from 'lodash/invert'
import confirm from '~/src/components/Confirmable/confirm'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'

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
            <Grid>
              <Grid.Column width={5} textAlign='left'>
                {currentStep === 'preview' ? (
                  <Button basic onClick={() => this.setState({ currentStep: 'map' })} data-text='settings_product_import_back_btn'>
                    {formatMessage({ id: 'global.back', defaultMessage: 'Back' })}
                  </Button>
                ) : null}
              </Grid.Column>
              <Grid.Column width={11} textAlign='right'>
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
              </Grid.Column>
            </Grid>
          )}
        </Modal.Actions>
      </Modal>
    )
  }

  submitHandler = () => {
    const { isSaveMapCSV, mappedDataHeaderCSV, mappedHeaders, missingRequired, csvFileId, intl: { formatMessage }, toastManager} = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      case 'upload':
        this.setState({ currentStep: 'map', isFinishUpload: true })
        break
      case 'map':
        const { selectedSavedMap } = this.props // mapper (header): csvHeader (content)
        if (missingRequired.length) {
          toastManager.add(generateToastMarkup(
            formatMessage({ id: 'notifications.importMissingRequired.header', defaultMessage: 'Required Options' }),
            formatMessage({ id: 'notifications.importMissingRequired.content', defaultMessage: `First, you have to select all the required options: ${missingRequired.join(', ')}` }, { missingRequired: missingRequired.join(', ') })
          ), { appearance: 'error' })
          return false
        }
        if (selectedSavedMap && !isSaveMapCSV) {
          const invertedSavedMap = _invert(selectedSavedMap) // csvHeader (content): mapper (header)
          const foundModification = mappedHeaders.find(mapHead => {
            if (!mapHead.header) {
              return !!invertedSavedMap[mapHead.content]
            }
            return (mapHead.content !== selectedSavedMap[mapHead.header] || mapHead.header !== invertedSavedMap[mapHead.content])
          })
          if (foundModification) {
            confirm(
              formatMessage({ id: 'confirm.selectedMapChange', defaultMessage: 'Possible Map Modification' }),
              formatMessage(
                { id: 'confirm.selectedMapChanged.description', defaultMessage: `Mapped header do not properly correspond to selected map '${selectedSavedMap.mapName}'. Would you like to save changes to this map?` },
                { mapName: selectedSavedMap.mapName })
            ).then(() => {
              this.props.handleSaveMapCSV()
            }).finally(() => {
              this.setState({ currentStep: 'preview', isFinishMap: true })
            })
          } else {
            this.setState({ currentStep: 'preview', isFinishMap: true })
          }
        } else {
          this.setState({ currentStep: 'preview', isFinishMap: true })
        }
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
  postImportProductOfferCSV,
  handleSaveMapCSV
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    isSaveMapCSV: state.settings.isSaveMapCSV,
    mappedDataHeaderCSV: state.settings.dataHeaderCSV,
    mappedHeaders: state.settings.mappedHeaders,
    missingRequired: state.settings.missingRequired,
    selectedSavedMap: state.settings.selectedSavedMap
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withToastManager(ProductImportPopup))))
