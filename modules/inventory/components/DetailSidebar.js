import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import { DateInput } from '~/components/custom-formik'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'
import confirm from '~/src/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'

import {
  Sidebar,
  Segment,
  Dimmer,
  Loader,
  Tab,
  Menu,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Popup,
  FormField,
  Button as ButtonSemantic
} from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import {
  sidebarDetailTrigger,
  getAutocompleteData,
  getWarehouses,
  addProductOffer,
  getProductGrades,
  searchOrigins,
  getProductForms,
  getProductConditions,
  searchManufacturers,
  getDocumentTypes,
  addAttachment,
  loadFile,
  removeAttachmentLink,
  removeAttachment,
  downloadAttachment,
  closeSidebarDetail,
  getProductOffer
} from '../actions'
import { Broadcast } from '~/modules/broadcast'
import { openBroadcast } from '~/modules/broadcast/actions'
import ProdexGrid from '~/components/table'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import moment from 'moment'
import UploadLot from './upload/UploadLot'
import { withDatagrid } from '~/modules/datagrid'
import { AttachmentManager } from '~/modules/attachments'
import _ from 'lodash'

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
`

export const FlexTabs = styled.div`
  height: 100%;
  margin: 0;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: 400;
  font-size: 1.1rem;

  > .tab-menu,
  > .tab-menu > .tab {
    height: 100%;
  }
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

const TopMargedColumn = styled(GridColumn)`
  margin-top: 6px !important;
`

export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`

export const HighSegment = styled(Segment)`
  padding-top: 0px !important;
  height: 100%;
`
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

const CustomGridRow = styled(GridRow)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`

const CustomGridColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

const initValues = {
  edit: {
    broadcasted: false,
    condition: null,
    conditionNotes: '',
    conforming: true,
    costPerUOM: '',
    externalNotes: '',
    fobPrice: '',
    inStock: false,
    internalNotes: '',
    leadTime: 1,
    lotNumber: '',
    lotExpirationDate: '',
    lotManufacturedDate: '',
    minimum: 1, // minPkg
    origin: null,
    pkgAvailable: '',
    product: null,
    productCondition: null,
    productForm: null,
    productGrades: [],
    splits: 1, // splitPkg
    doesExpire: false,
    expirationDate: '',
    warehouse: null,
    documentType: ''
  },
  priceTiers: {
    priceTiers: 1,
    pricingTiers: []
  },
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
    width: 200
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 160
  }
]

const optionsYesNo = [
  {
    key: 1,
    text: <FormattedMessage id='global.yes' defaultMessage='Yes' />,
    value: true
  },
  {
    key: 0,
    text: <FormattedMessage id='global.no' defaultMessage='No' />,
    value: false
  }
]

const listConforming = [
  {
    key: 1,
    text: <FormattedMessage id='global.conforming' defaultMessage='Conforming' />,
    value: true
  },
  {
    key: 0,
    text: <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />,
    value: false
  }
]

val.addMethod(val.number, 'divisibleBy', function(ref, message) {
  return this.test({
    name: 'divisibleBy',
    exclusive: false,
    message: message || '${path} must be divisible by ${reference}',
    params: {
      reference: ref.path
    },
    test: function(value) {
      const divisedBy = parseInt(this.resolve(ref))
      if (!divisedBy || isNaN(divisedBy)) return false

      return !(value % divisedBy)
    }
  })
})

val.addMethod(val.object, 'uniqueProperty', function(propertyName, message) {
  return this.test('unique', message, function(value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some(option => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      })
    }

    return true
  })
})

const validationScheme = val.object().shape({
  edit: val.object().shape({
    product: val
      .number()
      .typeError(errorMessages.requiredMessage)
      .required(errorMessages.requiredMessage),
    fobPrice: val
      .number()
      .min(0.001, errorMessages.minimum(0.001))
      .typeError(errorMessages.mustBeNumber)
      .test('maxdec', errorMessages.maxDecimals(3), val => {
        return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
      })
      .required(errorMessages.requiredMessage),
    costPerUOM: val
      .string()
      .test('v', errorMessages.mustBeNumber, function(v) {
        return v === null || v === '' || !isNaN(v)
      })
      .test('v', errorMessages.minimum(0), function(v) {
        return v === null || v === '' || isNaN(v) || Number(v) >= 0
      }),
    lotNumber: val
      .string()
      .typeError(errorMessages.invalidString)
      .nullable(),
    inStock: val.bool().required(errorMessages.requiredMessage),
    minimum: val
      .number()
      .min(1, errorMessages.minimum(1))
      .typeError(errorMessages.mustBeNumber)
      .divisibleBy(
        val.ref('splits'),
        <FormattedMessage id='inventory.notDivisibleBySplits' defaultMessage='Value is not divisible by Splits' />
      )
      .required(errorMessages.requiredMessage),
    pkgAvailable: val
      .number()
      .positive(errorMessages.positive)
      .typeError(errorMessages.mustBeNumber)
      .required(errorMessages.requiredMessage),
    leadTime: val
      .number()
      .min(1, errorMessages.minimum(1))
      .typeError(errorMessages.mustBeNumber),
    splits: val
      .number()
      .min(1, errorMessages.minimum(1))
      .typeError(errorMessages.mustBeNumber)
      .required(errorMessages.requiredMessage),
    warehouse: val
      .number(errorMessages.requiredMessage)
      .nullable(errorMessages.requiredMessage)
      .moreThan(0, errorMessages.requiredMessage)
      .required(errorMessages.requiredMessage),
    conforming: val.boolean(),
    conditionNotes: val.string().when('conforming', {
      is: false,
      then: val.string().required(errorMessages.requiredNonConforming)
    }),
    expirationDate: val.string().when('doesExpire', {
      is: true,
      then: val
        .string()
        .test(
          'min-date',
          errorMessages.mustBeInFuture,
          val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
        )
    })
  }),
  priceTiers: val.object().shape({
    priceTiers: val.number(),
    pricingTiers: val.array().of(
      val
        .object()
        .uniqueProperty('quantityFrom', 'Quantity has to be unique')
        .shape({
          quantityFrom: val
            .number()
            .typeError(errorMessages.mustBeNumber)
            .required(errorMessages.requiredMessage)
            .moreThan(0, errorMessages.greaterThan(0)),
          price: val
            .number()
            .typeError(errorMessages.mustBeNumber)
            .required(errorMessages.requiredMessage)
            .moreThan(0, errorMessages.greaterThan(0))
            .test('maxdec', errorMessages.maxDecimals(3), val => {
              return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
            }),
          manuallyModified: val
            .number()
            .min(0)
            .max(1)
        })
    )
  })
})

class DetailSidebar extends Component {
  state = {
    tabs: ['edit', 'documents', 'priceBook', 'priceTiers'],
    activeTab: 0,
    broadcastLoading: true,
    saveBroadcast: 0,
    changedForm: false,
    documentType: 1,
    openUploadLot: false,
    edited: false,
    sidebarValues: null,
    initValues: initValues
  }

  componentDidMount = async () => {
    if (this.props.sidebarValues) {
      await this.loadProductOffer(this.props.sidebarValues.id) // Start editing, reload product offer
    } else {
      this.props.searchOrigins('', 200)
    }
    this.fetchIfNoData('listConditions', this.props.getProductConditions)
    this.fetchIfNoData('listForms', this.props.getProductForms)
    this.fetchIfNoData('listGrades', this.props.getProductGrades)
    this.fetchIfNoData('warehousesList', this.props.getWarehouses)
    this.fetchIfNoData('listDocumentTypes', this.props.getDocumentTypes)
    this.props.searchManufacturers('', 200)
    this.switchTab(this.props.sidebarActiveTab)
  }

  fetchIfNoData = (name, fn) => {
    if (this.props[name].length === 0) fn()
  }

  loadProductOffer = async (id, shouldSwitchTab) => {
    const data = await this.props.getProductOffer(id)
    if (shouldSwitchTab) {
      this.switchTab(this.props.sidebarActiveTab, data.value.data)
    }

    this.props.searchOrigins(
      getSafe(() => data.value.data.origin.name, ''),
      200
    )
    if (data.value.data.companyProduct) {
      this.searchProducts(data.value.data.companyProduct.intProductName)
    }
    this.setState(
      {
        sidebarValues: data.value.data,
        initValues: { ...initValues, ...this.getEditValues(data.value.data) }
      },
      () => this.resetForm()
    )
  }

  validateSaveOrSwitchToErrors = async (callback = null) => {
    const { touched, validateForm, submitForm, values, setSubmitting, setTouched } = this.formikProps

    //! !if (Object.keys(touched).length || this.state.edited && !this.state.saved) {
    if (this.state.edited) {
      // Form edited and not saved yet
      validateForm().then(err => {
        const errors = Object.keys(err)
        if (errors.length && errors[0] !== 'isCanceled') {
          // Edited, Errors found
          submitForm() // to show errors
          this.switchToErrors(Object.keys(err))
          return
        } else {
          // Edited, Errors not found, try to save
          confirm(
            <FormattedMessage id='confirm.global.unsavedChanges.header' defaultMessage='Unsaved changes' />,
            <FormattedMessage
              id='confirm.global.unsavedChanges.content'
              defaultMessage='You have unsaved changes. Do you wish to save them?'
            />
          )
            .then(
              async () => {
                // Confirm
                if (await this.submitForm(values, setSubmitting, setTouched)) {
                  if (callback) callback()
                }
              },
              () => {
                // Cancel
                if (callback) callback()
              }
            )
            .catch(() => {})
            .finally(() => this.setState({ edited: false }))
          return
        }
      })
    } else {
      // Form not modified
      if (callback) callback()
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.editProductOfferInitTrig !== this.props.editProductOfferInitTrig) {
      const shouldSwitchTab =
        this.props.sidebarActiveTab > -1 && prevProps.sidebarActiveTab !== this.props.sidebarActiveTab

      if (this.props.sidebarValues) {
        // Edit mode
        if (!prevProps.sidebarValues) {
          // Add new to Edit mode
          this.validateSaveOrSwitchToErrors(() => {
            this.loadProductOffer(this.props.sidebarValues.id, shouldSwitchTab)
          })
        } else {
          // Edit to Edit mode
          this.validateSaveOrSwitchToErrors(() => {
            this.loadProductOffer(this.props.sidebarValues.id, shouldSwitchTab)
          })
        }
      } else {
        // Add new mode
        this.validateSaveOrSwitchToErrors(() => {
          this.setState({ sidebarValues: null, initValues: initValues }, () => {
            this.resetForm()
            this.props.searchOrigins('', 200)
            if (shouldSwitchTab) {
              this.switchTab(this.props.sidebarActiveTab)
            }
          })
        })
      }
    }
  }

  changedForm = () => {
    this.setState({ changedForm: true })
  }

  getPriceTiers = max => {
    let priceTiers = []

    for (let i = 1; i <= max; i++) {
      priceTiers.push({
        value: i,
        key: i,
        text: i
      })
    }

    return priceTiers
  }

  handleQuantities = (setFieldValue, values, splits, quantity = 0) => {
    // be sure that splits is integer and larger than 0
    splits = parseInt(splits)
    if (splits < 1 || isNaN(splits)) return false

    // correct quantity before anchor calculation
    if (quantity > 0) quantity -= splits

    const prices = getSafe(() => values.priceTiers.pricingTiers, [])

    for (let i = 0; i < prices.length; i++) {
      const qtyFrom = parseInt(prices[i].quantityFrom)

      // get level quantity (must be larger than previous level quantity)
      let anchor = Math.max(qtyFrom, ++quantity)
      if (!parseInt(values.priceTiers.pricingTiers[i].manuallyModified)) {
        // if not manually modified then change quantity value
        quantity = Math.ceil(anchor / splits) * splits
        setFieldValue(`priceTiers.pricingTiers[${i}].quantityFrom`, quantity)
      } else {
        // if manually modified or loaded from BE then do not change already set value - just remember largest anchor
        quantity = Math.max(qtyFrom, quantity)
      }
    }
  }

  handleChange = (e, name, value) => {
    this.setState({ openUploadLot: true, documentType: value })
  }

  onSplitsChange = debounce(async (value, values, setFieldValue, validateForm) => {
    value = parseInt(value)
    const minimum = parseInt(values.edit.minimum)

    this.handleQuantities(setFieldValue, values, value)

    if (isNaN(value) || isNaN(minimum)) return false

    if (minimum !== value && minimum % value !== 0) {
      await setFieldValue('edit.minimum', value)
    }

    validateForm()
  }, 250)

  renderPricingTiers = (count, setFieldValue) => {
    let tiers = []

    for (let i = 0; i < count; i++) {
      tiers.push(
        <Grid>
          <TopMargedColumn computer={2} textAlign='center'>
            <label name={`priceTiers.pricingTiers[${i}].level`}>{i + 1}</label>
          </TopMargedColumn>

          <TopMargedColumn computer={2}>
            <Icon className='greater than equal' />
          </TopMargedColumn>

          <GridColumn computer={5} data-test={`add_inventory_quantityFrom_${i}_inp`}>
            <Input
              name={`priceTiers.pricingTiers[${i}].quantityFrom`}
              inputProps={{
                type: 'number',
                min: 1,
                value: null,
                onChange: (e, { value }) => {
                  setFieldValue(`priceTiers.pricingTiers[${i}].manuallyModified`, 1)
                  if (i === 0) setFieldValue('edit.minimum', value)
                }
              }}
            />
          </GridColumn>

          <GridColumn computer={5} data-test={`add_inventory_price_${i}_inp`}>
            <Input
              name={`priceTiers.pricingTiers[${i}].price`}
              inputProps={{
                type: 'number',
                step: '0.001',
                min: 0.001,
                value: null
              }}
            />
          </GridColumn>

          <GridColumn computer={1} data-test={`add_inventory_manuallyModified_${i}_inp`}>
            <Input name={`priceTiers.pricingTiers[${i}].manuallyModified`} inputProps={{ type: 'hidden', value: 0 }} />
          </GridColumn>
        </Grid>
      )
    }

    return (
      <>
        <Grid key={0}>
          <GridColumn computer={2}>
            <FormattedMessage id='addInventory.level' defaultMessage='Level' />
          </GridColumn>
          <GridColumn computer={2} />
          <GridColumn computer={5}>
            <FormattedMessage id='global.quantity' defaultMessage='Quantity' />
          </GridColumn>
          <GridColumn computer={5}>
            <FormattedMessage id='addInventory.fobPrice' defaultMessage='FOB Price' />
          </GridColumn>
        </Grid>
        {tiers}
      </>
    )
  }

  saveBroadcastRules = async () => {
    this.setState({ saveBroadcast: this.state.saveBroadcast + 1 })
  }

  searchProducts = debounce(text => {
    this.props.getAutocompleteData({
      searchUrl: `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`
    })
  }, 250)

  submitForm = async (values, setSubmitting, setTouched, savedButtonClicked = false) => {
    const { addProductOffer, datagrid, toastManager } = this.props
    const { sidebarValues } = this.state
    let isEdit = getSafe(() => sidebarValues.id, null)
    let isGrouped = getSafe(() => sidebarValues.grouped, false)
    let sendSuccess = false

    await new Promise(resolve => this.setState({ edited: false }, resolve))

    setSubmitting(false)
    let props = {}
    switch (this.state.activeTab) {
      case 0:
      case 1:
      case 3:
        props = {
          ...values.edit,
          ...values.documents,
          expirationDate: values.edit.doesExpire ? getStringISODate(values.edit.expirationDate) : null,
          leadTime: values.edit.leadTime,
          lotExpirationDate: values.edit.lotExpirationDate ? getStringISODate(values.edit.lotExpirationDate) : null,
          lotNumber: values.edit.lotNumber,
          lotManufacturedDate: values.edit.lotManufacturedDate
            ? getStringISODate(values.edit.lotManufacturedDate)
            : null,
          pkgAvailable: parseInt(values.edit.pkgAvailable),
          pricingTiers: values.priceTiers.pricingTiers.length
            ? values.priceTiers.pricingTiers
            : [
                {
                  quantityFrom: values.edit.minimum,
                  price: values.edit.fobPrice
                }
              ],
          productGrades: values.edit.productGrades.length ? values.edit.productGrades : [],
          costPerUOM:
            values.edit.costPerUOM === null || values.edit.costPerUOM === '' ? null : Number(values.edit.costPerUOM)
        }
        break
      case 2:
        this.saveBroadcastRules()
        setTouched({})
        this.setState({ changedForm: false, edited: false })
        break
    }
    if (Object.keys(props).length) {
      try {
        let data = await addProductOffer(props, isEdit, false, isGrouped)
        if (isEdit) {
          datagrid.updateRow(data.value.id, () => data.value)
        } else {
          datagrid.loadData()
        }
        this.setState({
          sidebarValues: data.value,
          initValues: { ...initValues, ...this.getEditValues(data.value) },
          edited: false
        })
        sendSuccess = true
      } catch (e) {
        console.error(e)
        let entityId = getSafe(() => e.response.data.entityId, null)

        if (entityId) {
          confirm(
            <FormattedMessage
              id='notifications.productOffer.alreadyExists.header'
              defaultMessage='Product Offer already exists'
            />,
            <FormattedMessage
              id='notifications.productOffer.alreadyExists.content'
              defaultMessage={`Product offer with given Lot number, warehouse and company product already exists. \n Would you like to overwrite it?`}
            />
          )
            .then(async () => {
              let po = await addProductOffer(props, entityId, false, isGrouped)
              datagrid.updateRow(entityId, () => po.value)
              this.setState({
                sidebarValues: po.value,
                initValues: { ...initValues, ...this.getEditValues(po.value) },
                edited: false
              })
              sendSuccess = true
            })
            .catch(_)
        }
      } finally {
        setTouched({})
        this.setState({ changedForm: false })
      }
    }
    return sendSuccess
  }

  switchTab = async (newTab, data = null) => {
    this.setState({
      activeTab: newTab
    })
    try {
      if (newTab === 2) {
        await this.props.openBroadcast(data ? data : this.state.sidebarValues).then(async () => {
          this.setState({ broadcastLoading: false })
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  switchToErrors = errors => {
    const { toastManager } = this.props
    const tabs = Object.keys(errors)

    // switch tab only if there is no error on active tab
    if (tabs.includes(this.state.tabs[this.state.activeTab])) {
      switch (tabs[0]) {
        case 'edit':
          this.switchTab(0)
          document.getElementsByName('edit.' + Object.keys(errors.edit)[0])[0].focus()
          break
        case 'documents':
          this.switchTab(1)
          document.getElementsByName('documents.' + Object.keys(errors.documents)[0])[0].focus()
          break
        case 'priceBook':
          this.switchTab(2)
          document.getElementsByName('priceBook.' + Object.keys(errors.priceBook)[0])[0].focus()
          break
        case 'priceTiers':
          this.switchTab(3)
          const priceErrors = errors.priceTiers[Object.keys(errors.priceTiers)[0]]
          if (Array.isArray(priceErrors)) {
            const index = priceErrors.findIndex(o => typeof o !== 'undefined')
            document
              .getElementsByName(`priceTiers.pricingTiers[${index}].${Object.keys(priceErrors[index])[0]}`)[0]
              .focus()
          } else {
            document.getElementsByName('priceTiers.' + Object.keys(errors.priceTiers)[0])[0].focus()
          }
          break
      }
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='addInventory.saveFirst' defaultMessage='Errors on activated Tab' />,
          <FormattedMessage
            id='addInventory.poDataSaved'
            defaultMessage='Basic properites are incomplete/non-validating, please fix the issues first'
          />
        ),
        {
          appearance: 'warning'
        }
      )
    }
  }

  attachDocumentsManager = (newDocuments, values, setFieldValue) => {
    const docArray = uniqueArrayByKey(values.documents.attachments.concat(newDocuments), 'id')
    setFieldValue(`documents.attachments`, docArray)
    this.setState({ changedForm: true })
  }

  attachDocumentsUploadLot = (newDocument, values, setFieldValue) => {
    const docArray = uniqueArrayByKey(values.documents.attachments.concat([newDocument]), 'id')
    setFieldValue(`documents.attachments`, docArray)
    this.setState({ changedForm: true })
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const fileName = this.extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && this.getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  extractFileName = contentDispositionValue => {
    var filename = ''
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      var matches = filenameRegex.exec(contentDispositionValue)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }
    return filename
  }

  getMimeType = documentName => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)

    switch (documentExtension) {
      case 'doc':
        return 'application/msword'
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      case 'ppt':
        return 'application/vnd.ms-powerpoint'
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      case 'xls':
        return 'application/vnd.ms-excel'
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      case 'pdf':
        return 'application/pdf'
      case '7z':
        return 'application/x-7z-compressed'
      case 'zip':
        return 'application/zip'
      case 'tar':
        return 'application/x-tar'
      case 'rar':
        return 'application/x-rar-compressed'
      case 'xml':
        return 'application/xml'
      default:
        return 'text/plain'
    }
  }
  hasEdited = values => {
    return !_.isEqual(this.getEditValues(this.state.sidebarValues), values)
  }

  getEditValues = sidebarValues => {
    return {
      edit: {
        broadcasted: getSafe(() => sidebarValues.broadcasted, false),
        condition: getSafe(() => sidebarValues.condition, null),
        conditionNotes: getSafe(() => sidebarValues.conditionNotes, ''),
        conforming: getSafe(() => sidebarValues.conforming, true),
        costPerUOM: getSafe(() => sidebarValues.costPerUOM, ''),
        externalNotes: getSafe(() => sidebarValues.externalNotes, ''),
        fobPrice: getSafe(() => sidebarValues.pricingTiers[0].pricePerUOM, ''),
        inStock: getSafe(() => sidebarValues.inStock, false),
        internalNotes: getSafe(() => sidebarValues.internalNotes, ''),
        leadTime: getSafe(() => sidebarValues.leadTime, 1),
        lotNumber: getSafe(() => sidebarValues.lotNumber, ''),
        lotExpirationDate:
          sidebarValues && sidebarValues.lotExpirationDate
            ? moment(sidebarValues.lotExpirationDate).format(getLocaleDateFormat())
            : '',
        lotManufacturedDate:
          sidebarValues && sidebarValues.lotManufacturedDate
            ? moment(sidebarValues.lotManufacturedDate).format(getLocaleDateFormat())
            : '',
        minimum: getSafe(() => sidebarValues.minPkg, 1),
        origin: getSafe(() => sidebarValues.origin.id, null),
        pkgAvailable: getSafe(() => sidebarValues.pkgAvailable, ''),
        product: getSafe(() => sidebarValues.companyProduct.id, null),
        productCondition: getSafe(() => sidebarValues.condition.id, null),
        productForm: getSafe(() => sidebarValues.form.id, null),
        productGrades: getSafe(() => sidebarValues.grades.map(grade => grade.id), []),
        splits: getSafe(() => sidebarValues.splitPkg, 1),
        doesExpire: getSafe(() => sidebarValues.validityDate.length > 0, false),
        expirationDate:
          sidebarValues && sidebarValues.validityDate
            ? moment(sidebarValues.validityDate).format(getLocaleDateFormat())
            : '',
        warehouse: getSafe(() => sidebarValues.warehouse.id, null)
      },
      priceTiers: {
        priceTiers: getSafe(() => sidebarValues.pricingTiers.length, 0),
        pricingTiers: getSafe(
          () =>
            sidebarValues.pricingTiers.map(priceTier => ({
              price: priceTier.pricePerUOM,
              quantityFrom: priceTier.quantityFrom
            })),
          []
        )
      },
      documents: {
        documentType: getSafe(() => sidebarValues.documentType, null),
        attachments: getSafe(() => sidebarValues.attachments.map(att => ({ ...att, linked: true })), [])
      }
    }
  }
  onChange = debounce(() => this.setState({ edited: true }), 200)

  render() {
    let {
      // addProductOffer,
      listConditions,
      listForms,
      listGrades,
      loading,
      // openBroadcast,
      // sidebarDetailOpen,
      // searchedManufacturers,
      // searchedManufacturersLoading,
      searchedOrigins,
      searchedOriginsLoading,
      // searchedProducts,
      // searchedProductsLoading,
      searchOrigins,
      warehousesList,
      listDocumentTypes,
      intl: { formatMessage },
      toastManager,
      removeAttachment
    } = this.props
    const { sidebarValues } = this.state

    const leftWidth = 6
    const rightWidth = 10

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const fileName = this.extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && this.getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  extractFileName = contentDispositionValue => {
    var filename = ''
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      var matches = filenameRegex.exec(contentDispositionValue)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }
    return filename
  }

  getMimeType = documentName => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)

    let editValues = this.getEditValues()
  }
  onChange = debounce(() => this.setState({ edited: true, saved: false, oldProductOffer: this.values }), 200)

  render() {
    let {
      // addProductOffer,
      listConditions,
      listForms,
      listGrades,
      loading,
      // openBroadcast,
      // sidebarDetailOpen,
      sidebarValues,
      // searchedManufacturers,
      // searchedManufacturersLoading,
      searchedOrigins,
      searchedOriginsLoading,
      // searchedProducts,
      // searchedProductsLoading,
      searchOrigins,
      warehousesList,
      listDocumentTypes,
      intl: { formatMessage },
      toastManager,
      removeAttachment
    } = this.props

    const leftWidth = 6
    const rightWidth = 10

    const optionsYesNo = [
      {
        key: 1,
        text: <FormattedMessage id='global.yes' defaultMessage='Yes' />,
        value: true
      },
      {
        key: 0,
        text: <FormattedMessage id='global.no' defaultMessage='No' />,
        value: false
      }
    ]

    const listConforming = [
      {
        key: 1,
        text: <FormattedMessage id='global.conforming' defaultMessage='Conforming' />,
        value: true
      },
      {
        key: 0,
        text: <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />,
        value: false
      }
    ]

    const { toggleFilter } = this.props

    return (
      <Formik
        enableReinitialize
        initialValues={this.state.initValues}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          this.submitForm(values, setSubmitting, setTouched)
        }}>
        {formikProps => {
          let {
            values,
            touched,
            setTouched,
            setFieldValue,
            validateForm,
            submitForm,
            setSubmitting,
            resetForm
          } = formikProps
          this.values = values
          this.resetForm = resetForm
          this.formikProps = formikProps
          return (
            <Form onChange={this.onChange}>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '500px' }}
                direction='right'
                animation='overlay'
                onHide={e => {
                  /*
                  // Workaround, close if you haven't clicked on calendar item or filter icon
                  try {
                    if (
                      e &&
                      !(e.path[0] instanceof HTMLTableCellElement) &&
                      !(e.path[1] instanceof HTMLTableCellElement) &&
                      (!e.target || !e.target.className.includes('submenu-filter'))
                    ) {
                      toggleFilter(false)
                    }
                  } catch (e) {
                    console.error(e)
                  }*/
                }}>
                <Dimmer inverted active={loading}>
                  <Loader />
                </Dimmer>
                <FlexContent>
                  <HighSegment basic>
                    <FlexTabs>
                      <Tab
                        className='inventory-sidebar tab-menu flex stretched'
                        menu={{ secondary: true, pointing: true }}
                        renderActiveOnly={false}
                        activeIndex={this.state.activeTab}
                        panes={[
                          {
                            menuItem: (
                              <Menu.Item
                                key='edit'
                                onClick={() => {
                                  if (Object.keys(touched).length || this.state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        this.switchToErrors(r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      this.switchTab(0)
                                    })
                                    .catch(e => {
                                      console.log('CATCH', e)
                                    })
                                }}
                                data-test='detail_inventory_tab_edit'>
                                {formatMessage({
                                  id: getSafe(() => sidebarValues.id, false) ? 'global.edit' : 'global.add',
                                  defaultMessage: getSafe(() => sidebarValues.id, false) ? 'Edit' : 'Add'
                                })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='edit' style={{ padding: '18px' }}>
                                <Grid>
                                  {sidebarValues && sidebarValues.grouped && (
                                    <CustomGridRow>
                                      <CustomGridColumn>
                                        <FormattedMessage
                                          id='addInventory.virtualProductGroup'
                                          defaultMessage='This Product Offer is part of virtual Product Group, only Lot Number and PKGs Available fields can be edited.'>
                                          {text => text}
                                        </FormattedMessage>
                                      </CustomGridColumn>
                                    </CustomGridRow>
                                  )}
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage
                                        id='addInventory.companyProduct'
                                        defaultMessage='Company Product'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.product'
                                        options={this.props.autocompleteData.map(el => ({
                                          key: el.id,
                                          text: `${getSafe(() => el.intProductCode, '')} ${getSafe(
                                            () => el.intProductName,
                                            ''
                                          )}`,
                                          value: el.id
                                        }))}
                                        inputProps={{
                                          placeholder: (
                                            <FormattedMessage
                                              id='global.startTypingToSearch'
                                              defaultMessage='Start typing to begin search'
                                            />
                                          ),
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          loading: this.props.autocompleteDataLoading,
                                          'data-test': 'new_inventory_product_search_drpdn',
                                          style: { width: '300px' },
                                          size: 'large',
                                          minCharacters: 1,
                                          icon: 'search',
                                          search: options => options,
                                          selection: true,
                                          clearable: true,
                                          onChange: this.onChange,
                                          onSearchChange: (e, { searchQuery }) =>
                                            searchQuery.length > 0 && this.searchProducts(searchQuery)
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='addInventory.pkgsAvailable' defaultMessage='PKGs Available'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Input
                                        inputProps={{
                                          min: 1,
                                          type: 'number'
                                        }}
                                        name='edit.pkgAvailable'
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.warehouse' defaultMessage='Warehouse'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.warehouse'
                                        options={warehousesList}
                                        inputProps={{
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          onChange: this.onChange,
                                          selection: true,
                                          value: 0,
                                          'data-test': 'new_inventory_warehouse_drpdn'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.fobPrice' defaultMessage='FOB Price'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <FormField width={16} data-test='detail_sidebar_fob_price'>
                                        <Input
                                          name='edit.fobPrice'
                                          inputProps={{
                                            disabled: sidebarValues && sidebarValues.grouped,
                                            type: 'number',
                                            min: '0.001',
                                            step: '0.001',
                                            onChange: (e, { value }) => {
                                              if (getSafe(() => values.priceTiers.pricingTiers.length, 0)) {
                                                setFieldValue(`priceTiers.pricingTiers[0].price`, value)
                                              }
                                            }
                                          }}
                                        />
                                      </FormField>
                                    </GridColumn>
                                  </GridRow>

                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.cost' defaultMessage='Cost'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <FormField width={16} data-test='detail_sidebar_cost'>
                                        <Input
                                          name='edit.costPerUOM'
                                          inputProps={{
                                            disabled: sidebarValues && sidebarValues.grouped,
                                            type: 'number',
                                            min: '0'
                                          }}
                                        />
                                      </FormField>
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn>
                                      <Segment style={{ margin: '0 -1em' }}>
                                        <Header as='h3'>
                                          <FormattedMessage id='global.lot' defaultMessage='Lot' />
                                        </Header>
                                        <Grid>
                                          <GridRow>
                                            <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                              <FormattedMessage id='global.lotNumber' defaultMessage='Lot #'>
                                                {text => text}
                                              </FormattedMessage>
                                            </GridColumn>
                                            <GridColumn mobile={rightWidth} computer={rightWidth}>
                                              <Input type='text' name='edit.lotNumber' />
                                            </GridColumn>
                                          </GridRow>
                                          <GridRow>
                                            <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                              <FormattedMessage id='global.expDate' defaultMessage='Exp Date'>
                                                {text => text}
                                              </FormattedMessage>
                                            </GridColumn>
                                            <GridColumn mobile={rightWidth} computer={rightWidth}>
                                              <DateInput
                                                inputProps={{
                                                  'data-test': 'sidebar_detail_lot_exp_date',
                                                  disabled: sidebarValues && sidebarValues.grouped
                                                }}
                                                name='edit.lotExpirationDate'
                                              />
                                            </GridColumn>
                                          </GridRow>
                                          <GridRow>
                                            <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                              <FormattedMessage id='global.mfgDate' defaultMessage='Mfg Date'>
                                                {text => text}
                                              </FormattedMessage>
                                            </GridColumn>
                                            <GridColumn mobile={rightWidth} computer={rightWidth}>
                                              <DateInput
                                                inputProps={{
                                                  'data-test': 'sidebar_detail_lot_mfg_date',
                                                  disabled: sidebarValues && sidebarValues.grouped,
                                                  maxDate: moment()
                                                }}
                                                name='edit.lotManufacturedDate'
                                              />
                                            </GridColumn>
                                          </GridRow>
                                        </Grid>
                                      </Segment>
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='addInventory.grades' defaultMessage='Grades'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.productGrades'
                                        options={listGrades}
                                        inputProps={{
                                          onChange: this.onChange,
                                          'data-test': 'new_inventory_grade_drpdn',
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          selection: true,
                                          multiple: true
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='addInventory.form' defaultMessage='Form'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.productForm'
                                        options={listForms}
                                        inputProps={{
                                          onChange: this.onChange,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          'data-test': 'new_inventory_form_drpdn'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='addInventory.origin' defaultMessage='Origin'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.origin'
                                        options={searchedOrigins}
                                        inputProps={{
                                          onChange: this.onChange,
                                          'data-test': 'new_inventory_origin_drpdn',
                                          size: 'large',
                                          minCharacters: 0,
                                          icon: 'search',
                                          search: true,
                                          selection: true,
                                          clearable: true,
                                          loading: searchedOriginsLoading,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          onSearchChange: debounce(
                                            (e, { searchQuery }) => searchOrigins(searchQuery),
                                            250
                                          )
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.conforming'
                                        options={listConforming}
                                        inputProps={{
                                          onChange: this.onChange,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          'data-test': 'new_inventory_conforming_drpdn'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow style={{ position: 'absolute', top: '-20000px', left: '-20000px' }}>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.productCondition'
                                        options={listConditions}
                                        inputProps={{
                                          onChange: this.onChange,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          'data-test': 'new_inventory_condition_drpdn'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth + rightWidth} computer={leftWidth + rightWidth}>
                                      <FormattedMessage
                                        id='addInventory.conditionNotes'
                                        defaultMessage='Condition Notes'>
                                        {text => text}
                                      </FormattedMessage>
                                      <TextArea
                                        name='edit.conditionNotes'
                                        inputProps={{ disabled: sidebarValues && sidebarValues.grouped }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.inStock' defaultMessage='In Stock'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth - 5} computer={rightWidth - 5}>
                                      <Dropdown
                                        name='edit.inStock'
                                        options={optionsYesNo}
                                        inputProps={{
                                          onChange: this.onChange,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          'data-test': 'add_inventory_instock'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.leadTime' defaultMessage='Lead Time'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth - 5} computer={rightWidth - 5}>
                                      <Input
                                        name='edit.leadTime'
                                        inputProps={{
                                          type: 'number',
                                          min: '0',
                                          disabled: sidebarValues && sidebarValues.grouped
                                        }}
                                      />
                                    </GridColumn>
                                    <GridColumn mobile={5} computer={5} verticalAlign='middle'>
                                      <FormattedMessage id='global.days' defaultMessage='Days'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.offerExpiration' defaultMessage='Offer Expiration'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth - 5} computer={rightWidth - 5}>
                                      <Dropdown
                                        name='edit.doesExpire'
                                        options={optionsYesNo}
                                        inputProps={{
                                          onChange: this.onChange,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          'data-test': 'add_inventory_doesExpire'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage
                                        id='addInventory.offerExpirationDate'
                                        defaultMessage='Offer Expiration Date'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <DateInput
                                        inputProps={{
                                          disabled: !values.edit.doesExpire || (sidebarValues && sidebarValues.grouped),
                                          'data-test': 'sidebar_detail_expiration_date'
                                          //! ! crashes on component calendar open if expirationDate is in past:
                                          //! ! minDate: moment().add(1, 'days')
                                        }}
                                        name='edit.expirationDate'
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.minimumPkgs' defaultMessage='Minimum PKGs' />
                                    </GridColumn>
                                    <GridColumn
                                      mobile={rightWidth}
                                      computer={rightWidth}
                                      data-test='add_inventory_product_minimumOQ_inp'>
                                      <Input
                                        name='edit.minimum'
                                        inputProps={{
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          type: 'number',
                                          min: 1,
                                          onChange: (e, { value }) => {
                                            value = parseInt(value)
                                            if (value > 1 && !isNaN(value)) {
                                              setFieldValue('minimumRequirement', true)
                                              // It seems to do bug when created new inventory
                                              // value is adding in handleSubmit
                                              //setFieldValue('priceTiers.pricingTiers[0].quantityFrom', value)
                                            }
                                          }
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.splitPkgs' defaultMessage='Split PKGs' />
                                    </GridColumn>
                                    <GridColumn
                                      mobile={rightWidth}
                                      computer={rightWidth}
                                      data-test='add_inventory_product_splits_inp'>
                                      <Input
                                        name='edit.splits'
                                        inputProps={{
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          type: 'number',
                                          min: 1,
                                          onChange: (e, { value }) =>
                                            this.onSplitsChange(value, values, setFieldValue, validateForm)
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage id='global.broadcast' defaultMessage='Broadcast'>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <Dropdown
                                        name='edit.broadcasted'
                                        options={optionsYesNo}
                                        inputProps={{
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          onChange: this.onChange,
                                          'data-test': 'add_inventory_broadcast'
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn mobile={leftWidth + rightWidth} computer={leftWidth + rightWidth}>
                                      <FormattedMessage id='addInventory.externalNotes' defaultMessage='External Notes'>
                                        {text => text}
                                      </FormattedMessage>
                                      <TextArea
                                        name='edit.externalNotes'
                                        inputProps={{ disabled: sidebarValues && sidebarValues.grouped }}
                                      />
                                    </GridColumn>
                                  </GridRow>

                                  <GridRow>
                                    <GridColumn mobile={leftWidth + rightWidth} computer={leftWidth + rightWidth}>
                                      <FormattedMessage id='addInventory.internalNotes' defaultMessage='Internal Notes'>
                                        {text => text}
                                      </FormattedMessage>
                                      <TextArea
                                        name='edit.internalNotes'
                                        inputProps={{ disabled: sidebarValues && sidebarValues.grouped }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                </Grid>
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='documents'
                                onClick={() => {
                                  if (Object.keys(touched).length || this.state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        this.switchToErrors(r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      this.switchTab(1)
                                    })
                                    .catch(e => {
                                      console.log('CATCH', e)
                                    })
                                }}
                                data-test='detail_inventory_tab_documents'>
                                {formatMessage({ id: 'global.documents', defaultMessage: 'Documents' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='documents' style={{ padding: '18px' }}>
                                <Grid>
                                  {listDocumentTypes.length ? (
                                    <GridRow>
                                      <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                        <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document: '>
                                          {text => text}
                                        </FormattedMessage>
                                      </GridColumn>
                                      <GridColumn style={{ zIndex: '501' }} mobile={rightWidth} computer={rightWidth}>
                                        <Dropdown
                                          name='documents.documentType'
                                          closeOnChange
                                          options={listDocumentTypes}
                                          inputProps={{
                                            placeholder: (
                                              <FormattedMessage
                                                id='global.documentType.choose'
                                                defaultMessage='Choose document type'
                                              />
                                            ),
                                            onChange: (e, { name, value }) => {
                                              this.handleChange(e, name, value)
                                              this.onChange()
                                            }
                                          }}
                                        />
                                      </GridColumn>
                                    </GridRow>
                                  ) : null}
                                  <GridRow>
                                    <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                      <FormattedMessage
                                        id='global.existingDocuments'
                                        defaultMessage='Existing documents: '>
                                        {text => text}
                                      </FormattedMessage>
                                    </GridColumn>
                                    <GridColumn mobile={rightWidth} computer={rightWidth}>
                                      <AttachmentManager
                                        asModal
                                        returnSelectedRows={rows =>
                                          this.attachDocumentsManager(rows, values, setFieldValue)
                                        }
                                      />
                                    </GridColumn>
                                  </GridRow>

                                  {values.documents.documentType && this.state.openUploadLot ? (
                                    <GridRow>
                                      <GridColumn>
                                        <UploadLot
                                          {...this.props}
                                          header={
                                            <DivIcon
                                              onClick={() =>
                                                this.setState(prevState => ({
                                                  openUploadLot: !prevState.openUploadLot
                                                }))
                                              }>
                                              <CloceIcon name='close' color='grey' />
                                            </DivIcon>
                                          }
                                          hideAttachments
                                          edit={getSafe(() => sidebarValues.id, 0)}
                                          attachments={values.documents.attachments}
                                          name='documents.attachments'
                                          type={this.state.documentType}
                                          filesLimit={1}
                                          fileMaxSize={20}
                                          onChange={files => {
                                            this.attachDocumentsUploadLot(files, values, setFieldValue)
                                          }}
                                          data-test='new_inventory_attachments_drop'
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
                                                      <FormattedMessage
                                                        id='global.clickHere'
                                                        defaultMessage={'click here'}
                                                      />
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
                                                      <FormattedMessage
                                                        id='global.clickHere'
                                                        defaultMessage={'click here'}
                                                      />
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
                                          tableName='inventory_documents'
                                          onTableReady={() => {}}
                                          columns={columns}
                                          normalWidth={false}
                                          rows={values.documents.attachments
                                            .map(row => ({
                                              ...row,
                                              documentTypeName: row.documentType && row.documentType.name
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
                                                    const unlinkResponse = await this.props.removeAttachmentLink(
                                                      false,
                                                      sidebarValues.id,
                                                      row.id
                                                    )
                                                    toastManager.add(
                                                      generateToastMarkup(
                                                        <FormattedMessage
                                                          id='addInventory.success'
                                                          defaultMessage='Success'
                                                        />,
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
                                                  setFieldValue(
                                                    `documents.attachments`,
                                                    values.documents.attachments.filter(o => o.id !== row.id)
                                                  )
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
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='priceBook'
                                disabled={sidebarValues && sidebarValues.grouped}
                                onClick={() => {
                                  if (Object.keys(touched).length || this.state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        this.switchToErrors(r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      this.switchTab(2)
                                    })
                                    .catch(e => {
                                      console.log('CATCH', e)
                                    })
                                }}
                                data-test='detail_inventory_tab_priceBook'>
                                {formatMessage({ id: 'global.priceBook', defaultMessage: 'Price Book' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='priceBook' style={{ padding: '18px' }}>
                                <Broadcast
                                  isPrepared={!this.state.broadcastLoading}
                                  asModal={false}
                                  asSidebar={true}
                                  saveBroadcast={this.state.saveBroadcast}
                                  changedForm={this.changedForm}
                                />
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='priceTiers'
                                disabled={sidebarValues && sidebarValues.grouped}
                                onClick={() => {
                                  if (Object.keys(touched).length || this.state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        this.switchToErrors(r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      this.switchTab(3)
                                    })
                                    .catch(e => {
                                      console.log('CATCH', e)
                                    })
                                }}
                                data-test='detail_inventory_tab_priceTiers'>
                                {formatMessage({ id: 'global.priceTiers', defaultMessage: 'Price Tiers' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='priceTiers' style={{ padding: '18px' }}>
                                <Header as='h3'>
                                  <FormattedMessage
                                    id='addInventory.pricesCount'
                                    defaultMessage='How many price tiers would you like to offer?'>
                                    {text => (
                                      <>
                                        {text}
                                        <Popup
                                          content={
                                            <>
                                              <FormattedMessage
                                                id='addInventory.pricesCount.description1'
                                                defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.'
                                              />
                                              <br /> <br />
                                              <FormattedMessage
                                                id='addInventory.pricesCount.description2'
                                                defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.'
                                              />
                                              <br /> <br />
                                              <FormattedMessage
                                                id='addInventory.pricesCount.description3'
                                                defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.'
                                              />
                                            </>
                                          }
                                          trigger={<Icon name='info circle' color='blue' />}
                                          wide
                                        />
                                      </>
                                    )}
                                  </FormattedMessage>
                                </Header>
                                <Dropdown
                                  label={formatMessage({
                                    id: 'addInventory.priceTiers',
                                    defaultMessage: 'Price Tiers'
                                  })}
                                  name='priceTiers.priceTiers'
                                  options={this.getPriceTiers(10)}
                                  inputProps={{
                                    'data-test': 'new_inventory_price_tiers_drpdn',
                                    fluid: true,
                                    onChange: (e, { value }) => {
                                      this.onChange()
                                      let pricingTiers = values.priceTiers.pricingTiers.slice()
                                      let difference = value - pricingTiers.length
                                      if (difference < 0) pricingTiers.splice(value)
                                      else
                                        for (let i = 0; i < difference; i++)
                                          pricingTiers.push({ price: '', quantityFrom: '' })
                                      setFieldValue('priceTiers.pricingTiers', pricingTiers)
                                    }
                                  }}
                                />
                                <Header as='h3'>
                                  <FormattedMessage
                                    id='addInventory.fobPrice.header'
                                    defaultMessage='What is the FOB price for each tier?'>
                                    {text => (
                                      <>
                                        {text}
                                        <Popup
                                          content={
                                            <FormattedMessage
                                              id='addInventory.fobPrice.description'
                                              defaultMessage='FOB stands for free on board and freight on board and designates that the buyer is responsible for shipping costs. It also represents that ownership and liability is passed from seller to the buyer when the good are loaded at the originating location.'
                                            />
                                          }
                                          trigger={<Icon name='info circle' color='blue' />}
                                          wide
                                        />
                                      </>
                                    )}
                                  </FormattedMessage>
                                </Header>
                                {/* <Grid> */}
                                {this.renderPricingTiers(values.priceTiers.priceTiers, setFieldValue)}
                                {/* </Grid> */}
                              </Tab.Pane>
                            )
                          }
                        ]}
                      />
                    </FlexTabs>
                  </HighSegment>
                </FlexContent>
                <GraySegment
                  basic
                  style={{ position: 'relative', overflow: 'visible', height: '4.57142858em', margin: '0' }}>
                  <Grid>
                    <GridColumn computer={6} textAlign='left'>
                      <Button
                        size='large'
                        inputProps={{ type: 'button' }}
                        onClick={() => {
                          this.setState({ edited: false }, () => this.props.closeSidebarDetail())
                        }}
                        data-test='sidebar_inventory_cancel'>
                        {Object.keys(touched).length || this.state.changedForm
                          ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                          : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                      </Button>
                    </GridColumn>
                    <GridColumn computer={10} textAlign='right'>
                      <Button
                        disabled={!(Object.keys(touched).length || this.state.changedForm)}
                        primary
                        size='large'
                        type='button'
                        onClick={() =>
                          validateForm().then(r => {
                            if (Object.keys(r).length && this.state.activeTab !== 1) {
                              this.switchToErrors(r)
                              submitForm() // to show errors
                            } else {
                              this.submitForm(values, setSubmitting, setTouched)
                            }
                          })
                        }
                        data-test='sidebar_inventory_save_new'>
                        {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                      </Button>
                    </GridColumn>
                  </Grid>
                </GraySegment>
              </FlexSidebar>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  sidebarDetailTrigger,
  getAutocompleteData,
  getDocumentTypes,
  addProductOffer,
  getProductConditions,
  getProductForms,
  getProductGrades,
  getWarehouses,
  searchManufacturers,
  searchOrigins,
  openBroadcast,
  addAttachment,
  loadFile,
  removeAttachmentLink,
  removeAttachment,
  downloadAttachment,
  closeSidebarDetail,
  getProductOffer
}

const mapStateToProps = ({
  simpleAdd: {
    autocompleteData,
    autocompleteDataLoading,
    listConditions,
    listForms,
    listGrades,
    loading,
    sidebarActiveTab,
    sidebarDetailOpen,
    sidebarValues,
    searchedManufacturers,
    searchedManufacturersLoading,
    searchedOrigins,
    searchedOriginsLoading,
    searchedProducts,
    searchedProductsLoading,
    warehousesList,
    listDocumentTypes,
    editProductOfferInitTrig
  }
}) => ({
  autocompleteData,
  autocompleteDataLoading,
  listConditions,
  listForms,
  listGrades,
  loading,
  sidebarActiveTab,
  sidebarDetailOpen,
  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  searchedOrigins,
  searchedOriginsLoading,
  searchedProducts,
  searchedProductsLoading,
  warehousesList,
  listDocumentTypes,
  editProductOfferInitTrig
})

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(DetailSidebar))))
