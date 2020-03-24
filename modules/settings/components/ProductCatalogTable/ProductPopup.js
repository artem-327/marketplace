import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Modal, FormGroup, FormField, Popup, Grid, GridRow, GridColumn, Divider, Icon } from 'semantic-ui-react'

import { CompanyProductMixtures } from '~/components/shared-components/'
import { generateToastMarkup, getSafe, uniqueArrayByKey, getDesiredCasProductsProps } from '~/utils/functions'
import { DisabledButtonWrapped } from '~/utils/components'
import confirm from '~/src/components/Confirmable/confirm'
import { Required } from '~/components/constants/layout'

import {
  closePopup,
  getProductsCatalogRequest,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchUnNumber,
  getDocumentTypes,
  searchEchoProducts,
  getNmfcNumbersByString,
  addNmfcNumber,
  removeAttachmentLinkCompanyProduct,
  loadFile,
  removeAttachment
} from '../../actions'
import { addAttachment } from '~/modules/inventory/actions'

import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import './styles.scss'

import { UnitOfPackaging } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'
import { AttachmentManager } from '~/modules/attachments'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import styled from 'styled-components'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { changeTutorialTab } from '~/modules/tutorial/actions'
import { setTutorialCookies } from '~/modules/tutorial/components/Tutorial'

export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

const CloceIcon = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

const initialValues = {
  echoProduct: null,
  intProductName: '',
  intProductCode: '',
  packagingSize: '',
  packagingUnit: '',
  packagingType: '',
  nmfcNumber: '',
  stackable: false,
  freezeProtect: false,
  hazardous: false,
  freightClass: '',
  packageWeight: '',
  packageWeightUnit: '',
  packagesPerPallet: '',
  inciName: '',
  documents: {
    documentType: null,
    attachments: []
  }
}

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 300
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 300
  }
]

const formValidation = Yup.object().shape({
  intProductName: Yup.string()
    .trim()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage),
  intProductCode: Yup.string()
    .trim()
    .min(1, errorMessages.minLength(1))
    .required(errorMessages.requiredMessage),
  packagingSize: Yup.number(errorMessages.invalidNumber)
    .typeError(errorMessages.mustBeNumber)
    .required(errorMessages.requiredMessage)
    .positive(errorMessages.positive),
  packagingUnit: Yup.number(errorMessages.invalidNumber).required(errorMessages.requiredMessage),
  packagingType: Yup.number(errorMessages.invalidNumber).required(errorMessages.requiredMessage),
  nmfcNumber: Yup.number().required(errorMessages.requiredMessage),
  freightClass: Yup.number(errorMessages.invalidNumber).required(errorMessages.requiredMessage),
  packageWeight: Yup.number()
    .typeError(errorMessages.mustBeNumber)
    .required(errorMessages.requiredMessage)
    .positive(errorMessages.positive),
  packageWeightUnit: Yup.number().required(errorMessages.requiredMessage),
  packagesPerPallet: Yup.number()
    .typeError(errorMessages.mustBeNumber)
    .positive(errorMessages.positive)
    .integer(errorMessages.integer)
})

class ProductPopup extends React.Component {
  state = {
    advanced: false,
    openUpload: false,
    documentType: null,
    changedForm: false,
    attachments: []
  }
  componentDidMount() {
    this.props.getProductsCatalogRequest()

    if (this.props.popupValues && this.props.popupValues.nmfcNumber)
      this.props.addNmfcNumber(this.props.popupValues.nmfcNumber)

    if (this.props.documentTypes.length === 0) this.props.getDocumentTypes()

    if (this.props.popupValues) {
      const attachments = this.props.popupValues.attachments.map(att => ({
        id: att.id,
        name: att.name,
        documentType: att.documentType.name,
        linked: true
      }))
      this.setState({ changedForm: true, attachments })
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popupValues && nextProps.popupValues.packagingUnit) {
      this.filterPackagingTypes(nextProps.popupValues.packagingUnit, nextProps.unitsAll, nextProps.packagingTypesAll)
    } else this.setState({ packagingTypesReduced: nextProps.packagingType })
  }

  filterPackagingTypes(id, unitsAll, packagingTypesAll) {
    if (!unitsAll) return
    const unit = unitsAll.find(unit => unit.id === id)
    if (!unit) return
    const measureType = unit.measureType
    if (!measureType) return

    const packagingTypesReduced = packagingTypesAll.filter(p => p.measureType && p.measureType.id === measureType.id)

    this.setState({
      packagingTypesReduced: packagingTypesReduced.map((type, id) => {
        return {
          key: id,
          text: <UnitOfPackaging value={type.name} />,
          value: type.id
        }
      })
    })
  }

  handleUnitChange(id, unitsAll, packagingTypesAll) {
    this.filterPackagingTypes(id, unitsAll, packagingTypesAll)
  }

  handlerSubmit = async (values, actions) => {
    const {
      popupValues,
      handleSubmitProductEditPopup,
      handleSubmitProductAddPopup,
      datagrid,
      changeTutorialTab,
      tutorialCompleted
    } = this.props
    delete values.casProducts

    let formValues = {
      intProductName: values.intProductName,
      intProductCode: values.intProductCode,
      packagingUnit: values.packagingUnit,
      packagingType: values.packagingType,
      nmfcNumber: values.nmfcNumber,
      stackable: values.stackable,
      freightClass: values.freightClass,
      packageWeightUnit: values.packageWeightUnit,
      echoProduct: values.echoProduct === null || values.echoProduct === '' ? null : values.echoProduct,
      freezeProtect: values.freezeProtect,
      hazardous: values.hazardous,
      inciName: values.inciName === null || values.inciName === '' ? null : values.inciName,
      packagingSize: Number(values.packagingSize),
      packageWeight: Number(values.packageWeight),
      packagesPerPallet:
        values.packagesPerPallet === null || values.packagesPerPallet === '' ? null : Number(values.packagesPerPallet),
      attachments: this.state.attachments
    }

    try {
      if (popupValues) {
        await handleSubmitProductEditPopup(formValues, popupValues.id)
      } else {
        await handleSubmitProductAddPopup(formValues)
        if (!tutorialCompleted) {
          await setTutorialCookies(changeTutorialTab)
        }
      }
      let status = popupValues ? 'productUpdated' : 'productCreated'
      datagrid.loadData()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  resetComponent = () => {
    const { popupValues } = this.props
    this.setState({
      isLoading: false,
      isUnLoading: false,
      results: [],
      value: (popupValues && popupValues.casProduct) || '',
      unNumber: null,
      selectedList: []
    })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result, selectedList: [result].concat(this.state.selectedList) })
  }

  handleSearchChange = debounce(searchQuery => {
    this.setState({ isLoading: true, value: searchQuery })

    this.props.searchEchoProducts(searchQuery)
  }, 250)

  handleSearchUnNumber = debounce((e, { value }) => {
    this.setState({ isUnLoading: true, unNumber: value })

    this.props.searchUnNumber(value)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.unNumber), 'i')
      const isMatch = result => re.test(result.unNumberCode)

      this.setState({
        isUnLoading: false,
        unNumbers: filter(this.handleUnNumber(), isMatch)
      })
    }, 300)
  }, 250)

  handleUnNumber = () => {
    return this.props.searchedUnNumbers.map(unNumber => ({
      unNumberCode: unNumber.unNumberCode
    }))
  }

  handleUnNumberSelect = (e, { result }) => {
    this.setState({ unNumber: result })
  }

  handleSearchNmfcNumberChange = debounce(searchQuery => {
    this.props.getNmfcNumbersByString(searchQuery)
  }, 250)

  getInitialFormValues = () => {
    const { popupValues } = this.props
    return {
      ...initialValues,
      ...popupValues,
      casProducts: getDesiredCasProductsProps(getSafe(() => popupValues.echoProduct.elements, [])),
      echoProduct: getSafe(() => popupValues.echoProduct.id),
      nmfcNumber: getSafe(() => popupValues.nmfcNumber.id, ''),
      packageWeightUnit: getSafe(() => popupValues.packageWeightUnit.id, '')
    }
  }

  handleChangeDocumentType = (e, name, value) => {
    this.setState({ openUpload: true, documentType: value })
  }

  attachDocumentsManager = (newDocuments, values, setFieldValue) => {
    const newDocArray = newDocuments.map(att => ({
      id: att.id,
      name: att.name,
      documentType: att.documentType.name,
      linked: false
    }))
    const docArray = uniqueArrayByKey(this.state.attachments.concat(newDocArray), 'id')
    this.setState({ changedForm: true, attachments: docArray })
  }

  attachDocumentsUploadLot = (att, values, setFieldValue) => {
    const newDocArray = [
      {
        id: att.id,
        name: att.name,
        documentType: att.documentType.name,
        linked: false
      }
    ]
    const docArray = uniqueArrayByKey(this.state.attachments.concat(newDocArray), 'id')
    this.setState({ changedForm: true, attachments: docArray })
  }

  render() {
    const {
      closePopup,
      productsUnitsType,
      popupValues,
      freightClasses,
      intl: { formatMessage },
      echoProducts,
      echoProductsFetching,
      nmfcNumbersFetching,
      nmfcNumbersFiltered,
      packageWeightUnits,
      documentTypes,
      toastManager,
      loading,
      datagrid
    } = this.props

    const { packagingTypesReduced } = this.state

    let editable = popupValues ? popupValues.cfProductOfferCount === 0 || !popupValues.cfProductOfferCount : true

    let allEchoProducts = uniqueArrayByKey(
      echoProducts.concat(getSafe(() => popupValues.echoProduct) ? popupValues.echoProduct : []),
      'id'
    )

    const leftWidth = 6
    const rightWidth = 10

    return (
      <Modal closeIcon onClose={() => closePopup()} size='small' open centered={false}>
        <Modal.Header>
          {popupValues ? (
            <FormattedMessage id='global.editCompanyProduct' defaultMessage='Edit Company Product' />
          ) : (
            <FormattedMessage id='global.addCompanyProduct' defaultMessage='Add Company Product' />
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            loading={loading}
            onSubmit={this.handlerSubmit}>
            {({ setFieldValue, values }) => {
              let casProducts = getSafe(() => values.casProducts, [])

              return (
                <>
                  <Dropdown
                    label={
                      <FormattedMessage
                        id='settings.associatedEchoProducts'
                        defaultMessage='What is the Associated External Product that you would like to map to?'
                      />
                    }
                    options={allEchoProducts.map(echo => ({
                      key: echo.id,
                      text: echo.name,
                      value: echo.id
                    }))}
                    inputProps={{
                      fluid: true,
                      search: val => val,
                      clearable: true,
                      selection: true,
                      loading: echoProductsFetching,
                      onChange: (_, { value }) =>
                        setFieldValue(
                          'casProducts',
                          getDesiredCasProductsProps(
                            getSafe(() => allEchoProducts.find(el => el.id === value).elements, [])
                          )
                        ),
                      onSearchChange: (_, { searchQuery }) => this.handleSearchChange(searchQuery)
                    }}
                    name='echoProduct'
                  />
                  {casProducts.length > 0 && (
                    <>
                      <Divider />
                      <Grid>
                        <CompanyProductMixtures casProducts={casProducts} />
                      </Grid>
                      <Divider />
                    </>
                  )}
                  <FormGroup widths='equal' data-test='settings_product_popup_nameCodeInci_inp'>
                    <FormField>
                      <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name' />
                      <Required />
                      <Input type='text' name='intProductName' />
                    </FormField>
                    <FormField>
                      <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code' />
                      <Required />
                      <Input type='text' name='intProductCode' />
                    </FormField>
                  </FormGroup>

                  <FormGroup data-test='settings_product_popup_packagingSize_inp'>
                    <FormField width='4'>
                      <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />
                      <Required />
                      <Input type='number' name='packagingSize' />
                    </FormField>
                    <FormField width='6'>
                      <FormattedMessage id='global.packagingUnit' defaultMessage='Unit' />
                      <Required />
                      <Dropdown
                        name='packagingUnit'
                        options={productsUnitsType}
                        inputProps={{
                          'data-test': 'settings_product_popup_packagingUnit_drpdn',
                          onChange: (e, d) => {
                            setFieldValue('packagingType', '')
                            this.handleUnitChange(d.value, this.props.unitsAll, this.props.packagingTypesAll)
                          }
                        }}
                      />
                    </FormField>
                    <FormField width='6'>
                      <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />
                      <Required />
                      <Dropdown
                        name='packagingType'
                        options={packagingTypesReduced}
                        inputProps={{ 'data-test': 'settings_product_popup_packagingType_drpdn' }}
                      />
                    </FormField>
                  </FormGroup>

                  <FormGroup data-test='settings_product_popup_packageWeight_inp'>
                    <FormField width='4'>
                      <FormattedMessage id='global.packageWeight' defaultMessage='Package Weight' />
                      <Required />
                      <Input type='text' name='packageWeight' />
                    </FormField>
                    <FormField width='6'>
                      <FormattedMessage id='global.packageWeightUnit' defaultMessage='Package Weight Unit' />
                      <Required />
                      <Dropdown
                        name='packageWeightUnit'
                        options={packageWeightUnits}
                        inputProps={{
                          'data-test': 'settings_product_popup_packageWeightUnit_drpdn'
                        }}
                      />
                    </FormField>
                    <Input
                      fieldProps={{
                        width: 6
                      }}
                      type='text'
                      label={formatMessage({ id: 'global.packagesPerPallet', defaultMessage: 'Packages per Pallet' })}
                      name='packagesPerPallet'
                    />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <FormField>
                      <FormattedMessage id='global.nmfcCode' defaultMessage='NMFC Code'>
                        {text => text}
                      </FormattedMessage>{' '}
                      <Required />
                      <Dropdown
                        options={nmfcNumbersFiltered}
                        inputProps={{
                          fluid: true,
                          search: val => val,
                          selection: true,
                          loading: nmfcNumbersFetching,
                          onSearchChange: (_, { searchQuery }) => this.handleSearchNmfcNumberChange(searchQuery)
                        }}
                        name='nmfcNumber'
                      />
                    </FormField>
                    <Input
                      label={formatMessage({ id: 'global.inciName', defaultMessage: 'INCI Name' })}
                      type='string'
                      name='inciName'
                    />
                    <FormField>
                      <FormattedMessage id='global.freightClass' defaultMessage='Freight Class' />
                      <Required />
                      <Dropdown
                        name='freightClass'
                        options={freightClasses}
                        inputProps={{ 'data-test': 'settings_product_popup_freightClass_drpdn' }}
                      />
                    </FormField>
                  </FormGroup>

                  <FormGroup>
                    <Checkbox
                      fieldProps={{ width: 4 }}
                      label={formatMessage({ id: 'global.hazardous', defaultMessage: 'Hazardous' })}
                      name='hazardous'
                      inputProps={{ 'data-test': 'settings_product_popup_hazardous_chckb' }}
                    />
                    <Checkbox
                      fieldProps={{ width: 4 }}
                      label={formatMessage({ id: 'global.stackable', defaultMessage: 'Stackable' })}
                      name='stackable'
                      inputProps={{ 'data-test': 'settings_product_popup_stackable_chckb' }}
                    />
                    <Checkbox
                      fieldProps={{ width: 4 }}
                      label={formatMessage({ id: 'global.freezeProtect', defaultMessage: 'Freeze Protect' })}
                      name='freezeProtect'
                    />
                  </FormGroup>
                  <Grid>
                    {documentTypes.length ? (
                      <GridRow>
                        <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                          <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document: '>
                            {text => text}
                          </FormattedMessage>
                        </GridColumn>
                        <GridColumn mobile={rightWidth} computer={rightWidth}>
                          <Dropdown
                            name='documents.documentType'
                            closeOnChange
                            options={documentTypes}
                            inputProps={{
                              placeholder: (
                                <FormattedMessage
                                  id='global.documentType.choose'
                                  defaultMessage='Choose document type'
                                />
                              ),
                              onChange: (e, { name, value }) => {
                                this.handleChangeDocumentType(e, name, value)
                              }
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                    ) : null}

                    <GridRow>
                      <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                        <FormattedMessage id='global.existingDocuments' defaultMessage='Existing documents: '>
                          {text => text}
                        </FormattedMessage>
                      </GridColumn>
                      <GridColumn mobile={rightWidth} computer={rightWidth}>
                        <AttachmentManager
                          asModal
                          returnSelectedRows={rows => this.attachDocumentsManager(rows, values, setFieldValue)}
                        />
                      </GridColumn>
                    </GridRow>
                    {values.documents.documentType && this.state.openUpload ? (
                      <GridRow>
                        <GridColumn>
                          <UploadLot
                            {...this.props}
                            header={
                              <DivIcon
                                onClick={() =>
                                  this.setState(prevState => ({
                                    openUpload: !prevState.openUpload
                                  }))
                                }>
                                <CloceIcon name='close' color='grey' />
                              </DivIcon>
                            }
                            hideAttachments
                            edit={getSafe(() => popupValues.id, 0)}
                            attachments={values.documents.attachments}
                            name='documents.attachments'
                            type={this.state.documentType}
                            fileMaxSize={20}
                            onChange={files => {
                              this.attachDocumentsUploadLot(files, values, setFieldValue)
                            }}
                            data-test='settings_product_catalog_attachments_drop'
                            emptyContent={
                              <>
                                {formatMessage({ id: 'addInventory.dragDrop' })}
                                <br />
                                <FormattedMessage
                                  id='addInventory.dragDropOr'
                                  defaultMessage={'or {link} to select from computer'}
                                  values={{
                                    link: (
                                      <a>
                                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                      </a>
                                    )
                                  }}
                                />
                              </>
                            }
                            uploadedContent={
                              <label>
                                <FormattedMessage
                                  id='addInventory.dragDrop'
                                  defaultMessage={'Drag and drop to add file here'}
                                />
                                <br />
                                <FormattedMessage
                                  id='addInventory.dragDropOr'
                                  defaultMessage={'or {link} to select from computer'}
                                  values={{
                                    link: (
                                      <a>
                                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                      </a>
                                    )
                                  }}
                                />
                              </label>
                            }
                          />
                        </GridColumn>
                      </GridRow>
                    ) : null}
                    {values.documents.attachments && (
                      <GridRow>
                        <GridColumn>
                          <ProdexGrid
                            virtual={false}
                            tableName='company_product_documents'
                            onTableReady={() => {}}
                            columns={columns}
                            normalWidth={true}
                            rows={this.state.attachments
                              .map(row => ({
                                ...row,
                                documentTypeName: row.documentType
                              }))
                              .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))}
                            rowActions={[
                              {
                                text: (
                                  <FormattedMessage id='global.unlink' defaultMessage='Unlink'>
                                    {text => text}
                                  </FormattedMessage>
                                ),
                                callback: async row => {
                                  try {
                                    if (row.linked) {
                                      const unlinkResponse = await this.props.removeAttachmentLinkCompanyProduct(
                                        popupValues.id,
                                        row.id
                                      )
                                      datagrid.loadData() // Reload product with updated attachments
                                      toastManager.add(
                                        generateToastMarkup(
                                          <FormattedMessage id='addInventory.success' defaultMessage='Success' />,
                                          <FormattedMessage
                                            id='addInventory.unlinkeAttachment'
                                            defaultMessage='Attachment was successfully unlinked.'
                                          />
                                        ),
                                        {
                                          appearance: 'success'
                                        }
                                      )
                                      if (unlinkResponse.value.data.lastLink) {
                                        confirm(
                                          formatMessage({
                                            id: 'confirm.attachments.delete.title',
                                            defaultMessage: 'Delete Attachment'
                                          }),
                                          formatMessage(
                                            {
                                              id: 'confirm.attachments.delete.content',
                                              defaultMessage: `Do you want to delete file ${row.name}?`
                                            },
                                            { fileName: row.name }
                                          )
                                        ).then(
                                          async () => {
                                            // confirm
                                            try {
                                              await this.props.removeAttachment(row.id)
                                              toastManager.add(
                                                generateToastMarkup(
                                                  <FormattedMessage
                                                    id='notifications.attachments.deleted.header'
                                                    defaultMessage='File Deleted'
                                                  />,
                                                  <FormattedMessage
                                                    id='notifications.attachments.deleted.content'
                                                    defaultMessage={`File ${row.name} successfully deleted.`}
                                                    values={{ fileName: row.name }}
                                                  />
                                                ),
                                                {
                                                  appearance: 'success'
                                                }
                                              )
                                            } catch (e) {
                                              console.error(e)
                                            }
                                          },
                                          () => {
                                            // cancel
                                          }
                                        )
                                      }
                                    }
                                    this.setState({
                                      attachments: this.state.attachments.filter(o => o.id !== row.id)
                                    })
                                  } catch (e) {
                                    console.error(e)
                                  }
                                }
                              }
                            ]}
                          />
                        </GridColumn>
                      </GridRow>
                    )}
                  </Grid>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset onClick={closePopup} data-test='settings_product_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Popup
                      disabled={editable}
                      trigger={
                        <DisabledButtonWrapped>
                          <Button.Submit disabled={!editable} data-test='settings_product_popup_submit_btn'>
                            <FormattedMessage id='global.save' defaultMessage='Save'>
                              {text => text}
                            </FormattedMessage>
                          </Button.Submit>
                        </DisabledButtonWrapped>
                      }
                      content={
                        <FormattedMessage
                          id='settings.product.offerExists'
                          defaultMessage='Product cannot be edited, as it already has ProductOffers linked to it.'>
                          {text => text}
                        </FormattedMessage>
                      }
                    />
                  </div>
                </>
              )
            }}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  getProductsCatalogRequest,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchUnNumber,
  getDocumentTypes,
  searchEchoProducts,
  getNmfcNumbersByString,
  addNmfcNumber,
  removeAttachmentLinkCompanyProduct,
  loadFile,
  addAttachment,
  removeAttachment,
  changeTutorialTab
}
const mapStateToProps = ({ settings }) => {
  return {
    attachments: getSafe(() => settings.popupValues.attachments, []),
    popupValues: settings.popupValues,
    echoProducts: settings.echoProducts,
    echoProductsFetching: settings.echoProductsFetching,
    packagingType: settings.productsPackagingType,
    packagingTypesAll: settings.packagingTypes,
    productsUnitsType: settings.productsUnitsType,
    packageWeightUnits: settings.packageWeightUnits,
    unitsAll: settings.units,
    freightClasses: settings.productsFreightClasses,
    hazardClasses: settings.productsHazardClasses,
    packagingGroups: settings.productsPackagingGroups,
    searchedUnNumbers: settings.searchedUnNumbers,
    loading: settings.productDataLoading,
    documentTypes: settings.documentTypes,
    nmfcNumbersFetching: settings.nmfcNumbersFetching,
    nmfcNumbersFiltered: settings.nmfcNumbersFiltered.map(d => {
      return {
        key: d.id,
        text: d.code,
        value: d.id,
        content: (
          <>
            <strong>{d.code}</strong>
            <div>{d.description}</div>
          </>
        )
      }
    }),
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(ProductPopup))))
