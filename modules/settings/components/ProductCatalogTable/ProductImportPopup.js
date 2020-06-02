import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Header, Modal, Grid, Icon, Step, ModalContent, Button, Checkbox } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/dist/client/router'

import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportCompanyGenericProductCSV,
  postImportProductOfferCSV,
  handleSaveMapCSV,
  postImportCompaniesCSV,
  changeCsvHeader
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

const StyledHeader = styled(Header)`
  margin-bottom: 0;
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
      <Map
        productOffer={this.props.productOffer && this.props.productOffer}
        companyGenericProduct={this.props.companyGenericProduct && this.props.companyGenericProduct}
        companies={this.props.companies && this.props.companies}
      />
    ),
    preview: (
      <Preview
        productOffer={this.props.productOffer && this.props.productOffer}
        companyGenericProduct={this.props.companyGenericProduct && this.props.companyGenericProduct}
        companies={this.props.companies && this.props.companies}
      />
    ),
    confirmation: (
      <ConfirmationPage
        toUpload={this.toUpload}
        productOffer={this.props.productOffer && this.props.productOffer}
        companyGenericProduct={this.props.companyGenericProduct && this.props.companyGenericProduct}
        companies={this.props.companies && this.props.companies}
      />
    )
  }

  render() {
    const {
      closeImportPopup,
      csvFileId,
      CSV,
      closeImportPopupCancel,
      intl: { formatMessage },
      csvImportError,
      reloadFilter,
      csvWithoutHeader
    } = this.props

    const { currentStep, isFinishUpload, isFinishMap, isFinishPreview } = this.state

    return (
      <Modal
        closeIcon
        onClose={() => {
          csvImportError && (csvImportError.recordsCreated || csvImportError.recordsUpdated)
            ? closeImportPopup(reloadFilter)
            : closeImportPopupCancel(csvFileId)
        }}
        closeOnDimmerClick={false}
        open
        centered={false}>
        <Modal.Header>
          <StyledHeader as='h2'>
            <FormattedMessage id='global.importMapping' defaultMessage='Import Mapping' />
          </StyledHeader>
          <Step.Group widths={3}>
            <Step active={currentStep === 'upload'} completed={isFinishUpload}>
              <Icon name='upload' />
              <Step.Content>
                <Step.Title>
                  <FormattedMessage id='global.upload' defaultMessage='Upload' />
                </Step.Title>
              </Step.Content>
            </Step>

            <Step active={currentStep === 'map'} completed={isFinishMap}>
              <Icon name='table' />
              <Step.Content>
                <Step.Title>
                  <FormattedMessage id='global.map' defaultMessage='Map' />
                </Step.Title>
              </Step.Content>
            </Step>

            <Step active={currentStep === 'preview'} completed={isFinishPreview}>
              <Icon name='eye' />
              <Step.Content>
                <Step.Title>
                  <FormattedMessage id='global.preview' defaultMessage='Preview' />
                </Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

          <Checkbox
            label={formatMessage({
              id: 'import.CSVwithoutHeader',
              defaultMessage: 'CSV without header (Column Name)?'
            })}
            name='csvWithoutHeader'
            inputProps={{ 'data-test': 'import_checkbox_csv_without_header' }}
            checked={csvWithoutHeader}
            onChange={() => this.props.changeCsvHeader()}
          />
        </Modal.Header>
        <StyledModal>{this.steps[currentStep]}</StyledModal>
        <Modal.Actions>
          {currentStep !== 'confirmation' && (
            <Grid>
              <Grid.Column width={5} textAlign='left'>
                {currentStep === 'preview' ? (
                  <Button
                    basic
                    onClick={() => this.setState({ currentStep: 'map' })}
                    data-test='settings_product_import_back_btn'>
                    {formatMessage({ id: 'settings.previous', defaultMessage: 'Previous' })}
                  </Button>
                ) : null}
              </Grid.Column>
              <Grid.Column width={11} textAlign='right'>
                <Button
                  basic
                  onClick={() => closeImportPopupCancel(csvFileId)}
                  data-test='settings_product_import_cancel_btn'>
                  {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                </Button>
                <Button
                  primary
                  onClick={this.submitHandler}
                  disabled={!csvFileId || !CSV}
                  data-test='settings_product_import_submit_btn'>
                  {formatMessage({
                    id: `global.${currentStep === 'preview' ? 'import' : 'next'}`,
                    defaultMessage: currentStep === 'preview' ? 'Import' : 'Next'
                  })}
                </Button>
              </Grid.Column>
            </Grid>
          )}
        </Modal.Actions>
      </Modal>
    )
  }

  submitHandler = () => {
    const {
      isSaveMapCSV,
      mappedDataHeaderCSV,
      mappedHeaders,
      missingRequired,
      csvFileId,
      intl: { formatMessage },
      toastManager
    } = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      case 'upload':
        this.setState({ currentStep: 'map', isFinishUpload: true })
        break
      case 'map':
        const { selectedSavedMap } = this.props // mapper (header): csvHeader (content)
        if (missingRequired.length) {
          toastManager.add(
            generateToastMarkup(
              formatMessage({ id: 'notifications.importMissingRequired.header', defaultMessage: 'Required Options' }),
              formatMessage(
                {
                  id: 'notifications.importMissingRequired.content',
                  defaultMessage: `To continue, you need to apply all required attribute mappings: ${missingRequired.join(
                    ', '
                  )}`
                },
                { missingRequired: missingRequired.join(', ') }
              )
            ),
            { appearance: 'error' }
          )
          return false
        }
        if (selectedSavedMap && !isSaveMapCSV) {
          const invertedSavedMap = _invert(selectedSavedMap) // csvHeader (content): mapper (header)
          const foundModification = mappedHeaders.find(mapHead => {
            if (!mapHead.header) {
              return !!invertedSavedMap[mapHead.content]
            }
            return (
              mapHead.content !== selectedSavedMap[mapHead.header] ||
              mapHead.header !== invertedSavedMap[mapHead.content]
            )
          })
          if (foundModification) {
            confirm(
              formatMessage({ id: 'confirm.selectedMapChange', defaultMessage: 'Possible Map Modification' }),
              formatMessage(
                {
                  id: 'confirm.selectedMapChanged.description',
                  defaultMessage: `Mapped header do not properly correspond to selected map '${selectedSavedMap.mapName}'. Would you like to save changes to this map?`
                },
                { mapName: selectedSavedMap.mapName }
              )
            )
              .then(() => {
                this.props.handleSaveMapCSV()
              })
              .finally(() => {
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
          ? this.props.postImportProductOfferCSV(mappedDataHeaderCSV, csvFileId)
          : this.props.companyGenericProduct
          ? this.props.postImportCompanyGenericProductCSV(mappedDataHeaderCSV, csvFileId)
          : this.props.companies
          ? this.props.postImportCompaniesCSV(mappedDataHeaderCSV, csvFileId)
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
  postImportCompanyGenericProductCSV,
  postImportProductOfferCSV,
  handleSaveMapCSV,
  postImportCompaniesCSV,
  changeCsvHeader
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    CSV: state.settings.CSV,
    isSaveMapCSV: state.settings.isSaveMapCSV,
    mappedDataHeaderCSV: state.settings.dataHeaderCSV,
    mappedHeaders: state.settings.mappedHeaders,
    missingRequired: state.settings.missingRequired,
    selectedSavedMap: state.settings.selectedSavedMap,
    csvImportError: state.settings.csvImportError,
    reloadFilter: {
      props: {
        currentTab:
          Router && Router.router
            ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
            : state.settings.tabsNames[0],
        productsFilter: state.settings.productsFilter
      },
      value: state.settings.filterValue
    },
    csvWithoutHeader: state.settings.csvWithoutHeader
  }
}

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(ProductImportPopup)))
)
