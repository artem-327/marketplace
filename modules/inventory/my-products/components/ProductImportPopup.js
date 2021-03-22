import { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Header, Modal, Grid, Icon, Step, ModalContent, Button, Checkbox, Dropdown } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/dist/client/router'

import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  postImportProductMap,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportCompanyGenericProductCSV,
  postImportCompanyGenericProductMap,
  postImportProductOfferCSV,
  postImportProductOfferMap,
  handleSaveMapCSV,
  postImportCompaniesCSV,
  postImportCompaniesMap,
  changeCsvHeader
} from '~/modules/settings/actions'

import Upload from './Steps/UploadCSV'
import Map from './Steps/Map'
import Preview from './Steps/Preview'
import ConfirmationPage from './Steps/ConfirmationPage'
import _invert from 'lodash/invert'
import confirm from '~/components/Confirmable/confirm'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { OPTIONS_BROADCAST } from '../../my-listings/components/ModalDetail/ModalDetail.constants'
import { getSafe } from '../../../../utils/functions'
import { getTemplates, broadcastChange } from '../../../broadcast/actions'
//Styles
import { DivIconOptions, HeaderOptions } from '../../constants/layout'
//Actions
import { changeBroadcast } from '../../actions'
const StyledModal = styled(ModalContent)`
  height: 500px;
  overflow: auto;
`

const StyledHeader = styled(Header)`
  margin-bottom: 0;
`

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`

const DivSeeOffer = styled.div`
  width: 400px;
`

class ProductImportPopup extends Component {
  state = {
    currentStep: 'upload',
    isFinishUpload: false,
    isFinishMap: false,
    isFinishPreview: false
  }

  async componentDidMount() {
    const { broadcastTemplates, getTemplates, formatMessage, companies, companyGenericProduct } = this.props
    if (broadcastTemplates && !broadcastTemplates.length && !companies && !companyGenericProduct) {
      await getTemplates()
    }
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
      csvWithoutHeader,
      broadcastTemplates,
      companies,
      companyGenericProduct
    } = this.props

    const { currentStep, isFinishUpload, isFinishMap, isFinishPreview } = this.state

    const optionsSeeOffer = OPTIONS_BROADCAST.map(opt => {
      return { ...opt, subtitle: formatMessage({ id: opt.subtitleId, defaultMessage: opt.subtitleText }) }
    }).concat([
      ...broadcastTemplates.map(template => {
        return {
          icon: (
            <DivIconOptions>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <g fill='none' fill-rule='evenodd'>
                  <path
                    d='M0 0L24 0 24 24 0 24z'
                    transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                  />
                  <path
                    fill='#848893'
                    fill-rule='nonzero'
                    d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                    transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                  />
                </g>
              </svg>
            </DivIconOptions>
          ),
          title: template.name,
          subtitle: formatMessage({ id: 'myInventory.customTemplate', defaultMessage: 'Custom Template' }),
          id: template.id,
          tmp: template.name,
          value: `BROADCAST_TEMPLATE|${template.id}`
        }
      })
    ])

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
        </Modal.Header>
        <StyledModal>{this.steps[currentStep]}</StyledModal>
        <CheckboxContainer>
          <Checkbox
            label={formatMessage({
              id: 'import.CSVwithoutHeader',
              defaultMessage: 'File without header (Column Name)?'
            })}
            name='csvWithoutHeader'
            inputProps={{ 'data-test': 'import_checkbox_csv_without_header' }}
            checked={csvWithoutHeader}
            onChange={() => this.props.changeCsvHeader()}
          />
          {currentStep === 'preview' && !companies && !companyGenericProduct && (
            <DivSeeOffer>
              <Dropdown
                name='import.broadcastOption'
                data-test='aimport_inventory_whoShouldSee'
                fluid
                selection
                closeOnChange
                onChange={(e, { value }) => this.props.changeBroadcast(value)}
                value={this.props.broadcastOption}
                options={optionsSeeOffer.map((option, optIndex) => {
                  return {
                    key: option.id ? option.id : optIndex * -1 - 1,
                    text: <HeaderOptions icon={option.icon} content={option.title} subheader={option.subtitle} />,
                    value: option.value,
                    content: <HeaderOptions icon={option.icon} content={option.title} subheader={option.subtitle} />
                  }
                })}
              />
            </DivSeeOffer>
          )}
        </CheckboxContainer>
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
      selectedSavedMap, // mapper (header): csvHeader (content)
      intl: { formatMessage },
      toastManager,
      broadcastOption
    } = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      case 'upload':
        this.setState({ currentStep: 'map', isFinishUpload: true })
        break
      case 'map':
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
        const paramBroadcast =
          broadcastOption.indexOf('|') >= 0
            ? `&broadcastTemplateId=${getSafe(() => parseInt(broadcastOption.split('|')[1]), '')}`
            : broadcastOption
            ? `&broadcastOption=${broadcastOption}`
            : null
        if (selectedSavedMap) {
          this.props.productOffer
            ? this.props.postImportProductOfferMap(csvFileId, selectedSavedMap.id, paramBroadcast)
            : this.props.companyGenericProduct
            ? this.props.postImportCompanyGenericProductMap(csvFileId, selectedSavedMap.id)
            : this.props.companies
            ? this.props.postImportCompaniesMap(csvFileId, selectedSavedMap.id)
            : this.props.postImportProductMap(csvFileId, selectedSavedMap.id)
        } else {
          this.props.productOffer
            ? this.props.postImportProductOfferCSV(mappedDataHeaderCSV, csvFileId, paramBroadcast)
            : this.props.companyGenericProduct
            ? this.props.postImportCompanyGenericProductCSV(mappedDataHeaderCSV, csvFileId)
            : this.props.companies
            ? this.props.postImportCompaniesCSV(mappedDataHeaderCSV, csvFileId)
            : this.props.postImportProductCSV(mappedDataHeaderCSV, csvFileId)
        }

        this.setState({ currentStep: 'confirmation', isFinishPreview: true })
        break
    }
  }
}

const mapDispatchToProps = {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  postImportProductMap,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportCompanyGenericProductCSV,
  postImportCompanyGenericProductMap,
  postImportProductOfferCSV,
  postImportProductOfferMap,
  handleSaveMapCSV,
  postImportCompaniesCSV,
  postImportCompaniesMap,
  changeCsvHeader,
  getTemplates,
  changeBroadcast
}

const mapStateToProps = (state, { companies, companyGenericProduct }) => {
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
    csvWithoutHeader: state.settings.csvWithoutHeader,
    broadcastTemplates: getSafe(() => state.broadcast.templates, []),
    broadcastOption: getSafe(() => state.simpleAdd.broadcastOption, null),
    companies: getSafe(() => companies, false),
    companyGenericProduct: getSafe(() => companyGenericProduct, false)
  }
}

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(ProductImportPopup)))
)
