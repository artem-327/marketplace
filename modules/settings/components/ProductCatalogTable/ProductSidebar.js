import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'

import {
  Modal,
  FormGroup,
  FormField,
  Popup,
  Grid,
  GridRow,
  GridColumn,
  Divider,
  Icon,
  Form,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import { Formik } from 'formik'

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

import { Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import './styles.scss'

import { UnitOfPackaging } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'
import { AttachmentManager } from '~/modules/attachments'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import styled from 'styled-components'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'
import { UploadCloud} from 'react-feather'
import { QuantityInput } from '~/components/custom-formik/'

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
  .ui.dropdown > .default.text{
    margin: 0 !important;
  }
`

const CustomHighSegment = styled(Segment)`
  margin: 0 0 1px 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  border: unset !important;
`

const BottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  .ui.button {
    margin: 0 5px;
  }
`

const CustomButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #fff !important;
`

export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

const CloseIcon = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

const StyledUploadIcon = styled(UploadCloud)`
  width: 48px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
`

const StyledGrid = styled(Grid)`
  margin: -10px;
  > .row {
    padding: 7.5px 0 !important;
    .column {
      padding: 0 10px !important;
    }
  }
  
  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
  }
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
  intProductName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  intProductCode: Yup.string().trim().min(1, errorMessages.minLength(1)).required(errorMessages.requiredMessage),
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

class ProductSidebar extends React.Component {
  state = {
    openUpload: false,
    documentType: null,
    changedForm: false,
    attachments: [],
    loadSidebar: false,
    popupValues: null
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
      this.setState({ changedForm: true, attachments, popupValues: this.props.popupValues })
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popupValues && nextProps.popupValues.packagingUnit) {
      this.filterPackagingTypes(nextProps.popupValues.packagingUnit.id, nextProps.unitsAll, nextProps.packagingTypesAll)
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
    const { popupValues, handleSubmitProductEditPopup, handleSubmitProductAddPopup, datagrid } = this.props
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
      }
      let status = popupValues ? 'productUpdated' : 'productCreated'
      datagrid.loadData()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
      this.setState({ loadSidebar: false })
    }
  }

  resetComponent = () => {
    const {popupValues} = this.props
    this.setState({
      isLoading: false,
      isUnLoading: false,
      results: [],
      value: (popupValues && popupValues.casProduct) || '',
      unNumber: null,
      selectedList: [],
      loadSidebar: false,
      popupValues: null
    })
  }

  handleSearchChange = debounce(searchQuery => {
    this.setState({ isLoading: true, value: searchQuery })

    this.props.searchEchoProducts(searchQuery)
  }, 250)

  handleSearchNmfcNumberChange = debounce(searchQuery => {
    this.props.getNmfcNumbersByString(searchQuery)
  }, 250)

  getInitialFormValues = () => {
    const { popupValues } = this.props
    return {
      ...initialValues,
      ...popupValues,
      casProducts: getDesiredCasProductsProps(getSafe(() => popupValues.echoProduct.elements, [])),
      echoProduct: getSafe(() => popupValues.echoProduct.id, ''),
      nmfcNumber: getSafe(() => popupValues.nmfcNumber.id, ''),
      packageWeightUnit: getSafe(() => popupValues.packageWeightUnit.id, ''),
      packagingUnit: getSafe(() => popupValues.packagingUnit.id, ''),
      packagingType: getSafe(() => popupValues.packagingType.id, ''),
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

  attachDocumentsUploadAttachment = (att, values, setFieldValue) => {
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

    return (
      <Formik
        initialValues={this.getInitialFormValues()}
        validationSchema={formValidation}
        enableReinitialize
        onReset={closePopup}
        onSubmit={this.handlerSubmit}
        loading={loading}
      >
        {formikProps => {
          let { setFieldValue, values } = formikProps
          let casProducts = getSafe(() => values.casProducts, [])

          return (
          <>
            <CustomForm>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '640px' }}
                direction='right'
                animation='overlay'
              >
                <Dimmer inverted active={loading || this.state.loadSidebar}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment>
                  {popupValues ? (
                    <FormattedMessage id='global.editCompanyProduct' defaultMessage='Edit Company Product' />
                  ) : (
                    <FormattedMessage id='global.addCompanyProduct' defaultMessage='Add Company Product' />
                  )}
                </CustomHighSegment>
                <FlexContent style={{ padding: '30px' }}>
                  <StyledGrid>
                    <GridRow>
                      <GridColumn>
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
                            onSearchChange: (_, { searchQuery }) => this.handleSearchChange(searchQuery),
                            placeholder: (
                              <FormattedMessage
                                id='productCatalog.enterProductName'
                                defaultMessage='Enter Product Name'
                              />
                            )
                          }}
                          name='echoProduct'
                        />
                      </GridColumn>
                    </GridRow>

                    {casProducts.length > 0 && (
                      <GridRow>
                        <GridColumn>
                          <>
                            <Divider />
                            <Grid>
                              <CompanyProductMixtures casProducts={casProducts} />
                            </Grid>
                            <Divider />
                          </>
                        </GridColumn>
                      </GridRow>
                    )}

                    <GridRow>
                      <GridColumn width={8}>
                        <Input
                          type='text'
                          name='intProductName'
                          label={
                            <>
                              <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.enterProductName',
                                defaultMessage: 'Enter Product Name'
                              })
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Input
                          type='text'
                          name='intProductCode'
                          label={
                            <>
                              <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.enterProductCode',
                                defaultMessage: 'Enter Product Code'
                              })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow columns={3}>
                      <GridColumn>
                        <QuantityInput
                          name='packagingSize'
                          label={
                            <>
                              <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            placeholder: '0',
                            type: 'number',
                            min: 1
                          }}
                        />
                      </GridColumn>
                      <GridColumn>
                        <Dropdown
                          name='packagingUnit'
                          options={productsUnitsType}
                          label={
                            <>
                              <FormattedMessage id='global.packagingUnit' defaultMessage='Unit' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            'data-test': 'settings_product_popup_packagingUnit_drpdn',
                            onChange: (e, d) => {
                              setFieldValue('packagingType', '')
                              this.handleUnitChange(d.value, this.props.unitsAll, this.props.packagingTypesAll)
                            },
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.selectUnit',
                                defaultMessage: 'Select Unit'
                              })
                          }}
                        />

                      </GridColumn>
                      <GridColumn>
                        <Dropdown
                          name='packagingType'
                          options={packagingTypesReduced}
                          label={
                            <>
                              <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            'data-test': 'settings_product_popup_packagingType_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.selectType',
                                defaultMessage: 'Select Type'
                              })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow columns={3}>
                      <GridColumn>
                        <QuantityInput
                          name='packageWeight'
                          label={
                            <>
                              <FormattedMessage id='global.packageWeight' defaultMessage='Package Weight' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            placeholder: '0',
                            type: 'number',
                            min: 1
                          }}
                        />
                      </GridColumn>
                      <GridColumn>
                        <Dropdown
                          name='packageWeightUnit'
                          options={packageWeightUnits}
                          label={
                            <>
                              <FormattedMessage id='global.packageWeightUnit' defaultMessage='Package Weight Unit' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            'data-test': 'settings_product_popup_packageWeightUnit_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.selectWeightUnit',
                                defaultMessage: 'Select Weight Unit'
                              })
                          }}
                        />
                      </GridColumn>
                      <GridColumn>
                        <QuantityInput
                          label={formatMessage({ id: 'global.packagesPerPallet', defaultMessage: 'Packages per Pallet' })}
                          name='packagesPerPallet'
                          inputProps={{
                            placeholder: '0',
                            type: 'number',
                            min: 1
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow columns={3}>
                      <GridColumn>
                        <Dropdown
                          options={nmfcNumbersFiltered}
                          inputProps={{
                            fluid: true,
                            search: val => val,
                            selection: true,
                            loading: nmfcNumbersFetching,
                            onSearchChange: (_, { searchQuery }) => this.handleSearchNmfcNumberChange(searchQuery),
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.selectNmfcCode',
                                defaultMessage: 'Select NMFC Code'
                              })
                          }}
                          name='nmfcNumber'
                          label={
                            <>
                              <FormattedMessage id='global.nmfcCode' defaultMessage='NMFC Code' />
                              <Required />
                            </>
                          }
                        />
                      </GridColumn>
                      <GridColumn>
                        <Input
                          label={formatMessage({ id: 'global.inciName', defaultMessage: 'INCI Name' })}
                          type='string'
                          name='inciName'
                          inputProps={{
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.enterInciName',
                                defaultMessage: 'Enter INCI Name'
                              })
                          }}
                        />
                      </GridColumn>
                      <GridColumn>
                        <Dropdown
                          name='freightClass'
                          options={freightClasses}
                          label={
                            <>
                              <FormattedMessage id='global.freightClass' defaultMessage='Freight Class' />
                              <Required />
                            </>
                          }
                          inputProps={{
                            'data-test': 'settings_product_popup_freightClass_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'productCatalog.selectFreightClass',
                                defaultMessage: 'Select Freight Class'
                              })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={4}>
                        <Checkbox
                          label={formatMessage({ id: 'global.hazardous', defaultMessage: 'Hazardous' })}
                          name='hazardous'
                          inputProps={{ 'data-test': 'settings_product_popup_hazardous_chckb' }}
                        />
                      </GridColumn>
                      <GridColumn width={4}>
                        <Checkbox
                          label={formatMessage({ id: 'global.stackable', defaultMessage: 'Stackable' })}
                          name='stackable'
                          inputProps={{ 'data-test': 'settings_product_popup_stackable_chckb' }}
                        />
                      </GridColumn>
                      <GridColumn width={5}>
                        <Checkbox
                          label={formatMessage({ id: 'global.freezeProtect', defaultMessage: 'Freeze Protect' })}
                          name='freezeProtect'
                        />
                      </GridColumn>
                    </GridRow>

                    {documentTypes.length && (
                      <>
                        <Divider />
                        <GridRow columns={2} style={{ paddingBottom: '12.5px !important'}}>
                          <GridColumn>
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
                              label={
                                <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document' />
                              }
                            />
                          </GridColumn>
                          <GridColumn>
                            <div style={{ marginBottom: '6px' }}>
                              <FormattedMessage id='global.existingDocuments' defaultMessage='Existing documents' />
                            </div>
                            <AttachmentManager
                              asModal
                              returnSelectedRows={rows => this.attachDocumentsManager(rows, values, setFieldValue)}
                              label={'bla'}
                            />
                          </GridColumn>
                        </GridRow>
                      </>
                    )}

                    {values.documents.documentType && this.state.openUpload ? (
                      <GridRow>
                        <GridColumn>
                          <UploadAttachment
                            {...this.props}
                            header={
                              <DivIcon
                                onClick={() =>
                                  this.setState(prevState => ({
                                    openUpload: !prevState.openUpload
                                  }))
                                }>
                                <CloseIcon name='close' color='grey' />
                              </DivIcon>
                            }
                            hideAttachments
                            edit={getSafe(() => popupValues.id, 0)}
                            attachments={values.documents.attachments}
                            name='documents.attachments'
                            type={this.state.documentType}
                            fileMaxSize={20}
                            onChange={files => {
                              this.attachDocumentsUploadAttachment(files, values, setFieldValue)
                            }}
                            data-test='settings_product_catalog_attachments_drop'
                            emptyContent={

                              <div style={{ margin: '25px'}}>
                                <div>
                                  <StyledUploadIcon />
                                </div>
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
                              </div>
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
                  </StyledGrid>
                </FlexContent>

                <BottomButtons>
                  <Button.Reset onClick={closePopup} data-test='settings_product_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <Popup
                    disabled={editable}
                    trigger={
                      <DisabledButtonWrapped>
                        <CustomButtonSubmit
                          disabled={!editable}
                          data-test='settings_product_popup_submit_btn'
                          onClick={() => {
                            formikProps.validateForm().then(err => {
                              const errors = Object.keys(err)
                              if (errors.length && errors[0] !== 'isCanceled') {
                                // Errors found
                                formikProps.submitForm() // to show errors
                              } else {
                                // No errors found
                                this.setState({ loadSidebar: true })
                                this.handlerSubmit(formikProps.values, formikProps)
                              }
                            })
                          }}
                        >
                          <FormattedMessage id='global.save' defaultMessage='Save'>
                            {text => text}
                          </FormattedMessage>
                        </CustomButtonSubmit>
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
                </BottomButtons>
              </FlexSidebar>
            </CustomForm>
          </>
        )}}
      </Formik>
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
  removeAttachment
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
    })
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(ProductSidebar))))











