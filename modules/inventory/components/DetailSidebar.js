import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form, Label } from 'semantic-ui-react'
import { Formik } from 'formik'
import { DateInput } from '~/components/custom-formik'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'
import confirm from '~/src/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { PriceField } from '~/styles/styledComponents'
import { currency } from '~/constants/index'

import {
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
  removeAttachment,
  downloadAttachment,
  closeSidebarDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer
} from '../actions'
import { Broadcast } from '~/modules/broadcast'
import { openBroadcast } from '~/modules/broadcast/actions'
import ProdexGrid from '~/components/table'
import * as val from 'yup'
import { errorMessages, dateBefore } from '~/constants/yupValidation'
import moment from 'moment'
import UploadLot from './upload/UploadLot'
import { withDatagrid } from '~/modules/datagrid'
import { AttachmentManager } from '~/modules/attachments'
import _ from 'lodash'
import DocumentTab from '~/components/document-tab'
import { Required } from '~/components/constants/layout'

import {
  FlexSidebar,
  FlexTabs,
  FlexContent,
  TopMargedColumn,
  GraySegment,
  HighSegment,
  DivIcon,
  CloceIcon,
  InputWrapper,
  QuantityWrapper,
  BottomButtons,
  SmallGrid,
  InputLabeledWrapper,
  CustomLabel
} from '../constants/layout'

const CustomHr = styled.hr`
  border: solid 0.5px #dee2e6;
  margin: 0.642857143em 0 1.071428571em 0;
`

const CustomDropdown = styled(Dropdown)`
  .ui.selection.dropdown.active {
    z-index: 602;
  }
`
const CustomGridRow = styled(GridRow)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`

const CustomGridColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

const PricingLabel = styled.label`
  line-height: 40px;
`

const PricingIcon = styled(Icon)`
  line-height: 40px;
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
    width: 306
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 222
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
    lotManufacturedDate: val.lazy(_value => dateBefore()),
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
    initValues: initValues,
    attachmentFiles: []
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
                if (await this.submitForm(values, setSubmitting, setTouched).sendSuccess) {
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

  renderPricingTiers = count => {
    const { setFieldValue } = this.formikProps
    let tiers = []

    for (let i = 0; i < count; i++) {
      tiers.push(
        <GridRow>
          <GridColumn computer={2} textAlign='center'>
            <PricingLabel name={`priceTiers.pricingTiers[${i}].level`} style={{ verticalAlign: 'middle' }}>
              {i + 1}
            </PricingLabel>
          </GridColumn>

          <GridColumn computer={1}>
            <PricingIcon className='greater than equal' />
          </GridColumn>

          <GridColumn computer={1} data-test={`add_inventory_manuallyModified_${i}_inp`}>
            <Input name={`priceTiers.pricingTiers[${i}].manuallyModified`} inputProps={{ type: 'hidden', value: 0 }} />
          </GridColumn>

          <GridColumn computer={6} data-test={`add_inventory_quantityFrom_${i}_inp`}>
            {this.quantityWrapper(`priceTiers.pricingTiers[${i}].quantityFrom`, {
              type: 'number',
              min: 1,
              value: null,
              onChange: (e, { value }) => {
                setFieldValue(`priceTiers.pricingTiers[${i}].manuallyModified`, 1)
                if (i === 0) setFieldValue('edit.minimum', value)
              },
              placeholder: '0'
            })}
          </GridColumn>

          <GridColumn computer={5} data-test={`add_inventory_price_${i}_inp`}>
            {this.inputWrapper(
              `priceTiers.pricingTiers[${i}].price`,
              {
                type: 'number',
                step: '0.001',
                min: 0.001,
                value: null,
                placeholder: '0.000'
              },
              null,
              this.props.currencySymbol
            )}
          </GridColumn>
        </GridRow>
      )
    }

    return (
      <>
        <Grid key={0}>
          <GridColumn computer={2}>
            <FormattedMessage id='addInventory.level' defaultMessage='Level' />
          </GridColumn>
          <GridColumn computer={2} />
          <GridColumn computer={6}>
            <FormattedMessage id='global.quantity' defaultMessage='Quantity' />
            <Required />
          </GridColumn>
          <GridColumn computer={6}>
            <FormattedMessage id='addInventory.fobPrice' defaultMessage='FOB Price' />
            <Required />
          </GridColumn>
        </Grid>
        <SmallGrid verticalAlign='top'>{tiers}</SmallGrid>
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
    const { addProductOffer, datagrid } = this.props
    const { sidebarValues, attachmentFiles } = this.state
    let isEdit = getSafe(() => sidebarValues.id, null)
    let isGrouped = getSafe(() => sidebarValues.grouped, false)
    let sendSuccess = false
    let data = null
    
    await new Promise(resolve => this.setState({ edited: false }, resolve))

    setSubmitting(false)
    let props = {}
    switch (this.state.activeTab) {
      case 0:
      case 1:
      case 3:
        props = {
          ...values.edit,
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
        data = await addProductOffer(props, isEdit, false, isGrouped, attachmentFiles)
        if (isEdit) {
          datagrid.updateRow(data.value.id, () => data.value)
        } else {
          datagrid.loadData()
        }
        this.setState({
          sidebarValues: { ...data.value, id: isEdit ? data.value.id : null },
          initValues: { ...initValues, ...this.getEditValues(data) },
          edited: false
        })
        sendSuccess = true
      } catch (e) {
        console.error(e)
        let entityId = getSafe(() => e.response.data.entityId, null)

        if (entityId) {
          await confirm(
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
              let po = await addProductOffer(props, entityId, false, isGrouped, attachmentFiles)
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
        this.setState({ changedForm: false, attachmentFiles: [] })
      }
    }

    return { sendSuccess, data }
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

  inputWrapper = (name, inputProps, label, labelText) => {
    return (
      <InputWrapper>
        {label && <div className='field-label'>{label}</div>}
        <div>
          <PriceField inputProps={inputProps} name={name} />
          <Label>{labelText}</Label>
        </div>
      </InputWrapper>
    )
  }

  inputLabeledWrapper = (name, inputProps, label) => {
    return (
      <InputLabeledWrapper>
        {label && <div className='field-label'>{label}</div>}
        <Input inputProps={inputProps} name={name} />
      </InputLabeledWrapper>
    )
  }

  quantityWrapper = (name, inputProps, label = null) => {
    const { values, setFieldTouched, setFieldValue } = this.formikProps
    const value = _.get(values, name)
    return (
      <QuantityWrapper>
        {label && <div className='field-label'>{label}</div>}
        <div>
          <Input name={name} inputProps={inputProps} />
          <div className='sideButtons'>
            <Button
              type='button'
              className='buttonPlus'
              onClick={() => {
                if (isNaN(value) || value === '') {
                  setFieldValue(name, 1)
                  setFieldTouched(name, true, true)
                } else {
                  setFieldValue(name, parseInt(value) + 1)
                  setFieldTouched(name, true, true)
                }
              }}>
              +
            </Button>
            <Button
              type='button'
              className='buttonMinus'
              onClick={() => {
                if (isNaN(value) || value === '') {
                  setFieldValue(name, 1)
                  setFieldTouched(name, true, true)
                } else {
                  const val = parseInt(value)
                  if (val > 1) setFieldValue(name, val - 1) // ! ! fix minimal value - inputProps
                  setFieldTouched(name, true, true)
                }
              }}>
              -
            </Button>
          </div>
        </div>
      </QuantityWrapper>
    )
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
      loadFile,
      addAttachment,
      removeAttachmentLinkProductOffer,
      removeAttachment,
      currencySymbol
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

    // const { toggleFilter } = this.props

    return (
      <Formik
        enableReinitialize
        initialValues={this.state.initValues}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          await this.submitForm(values, setSubmitting, setTouched)
        }}>
        {formikProps => {
          let {
            values,
            touched,
            setTouched,
            setFieldTouched,
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
                style={{ width: '630px' }}
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
                                  id: getSafe(() => this.state.sidebarValues.id, false)
                                    ? 'addInventory.editHeader'
                                    : 'addInventory.addHeader',
                                  defaultMessage: getSafe(() => this.state.sidebarValues.id, false) ? 'EDIT' : 'ADD'
                                })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='edit' style={{ padding: '18px', margin: '0' }}>
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
                                    <GridColumn width={8}>
                                      <FormField>
                                        <FormattedMessage
                                          id='addInventory.companyProduct'
                                          defaultMessage='Company Product'>
                                          {text => (
                                            <label>
                                              {text}
                                              <Required />
                                            </label>
                                          )}
                                        </FormattedMessage>
                                        <Dropdown
                                          name='edit.product'
                                          options={this.props.autocompleteData.map((el, i) => ({
                                            key: i,
                                            text: `${getSafe(() => el.intProductCode, '')} ${getSafe(
                                              () => el.intProductName,
                                              ''
                                            )}`,
                                            value: el.id
                                          }))}
                                          inputProps={{
                                            placeholder: (
                                              <FormattedMessage
                                                id='addInventory.searchByProductName'
                                                defaultMessage='Search by product name'
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
                                      </FormField>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <Dropdown
                                        label={
                                          <FormattedMessage id='addInventory.grades' defaultMessage='Grades'>
                                            {text => text}
                                          </FormattedMessage>
                                        }
                                        name='edit.productGrades'
                                        options={listGrades}
                                        inputProps={{
                                          placeholder: (
                                            <FormattedMessage
                                              id='addInventory.selectGrades'
                                              defaultMessage='Select Grades'
                                            />
                                          ),
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
                                    <GridColumn width={8}>
                                      {this.quantityWrapper(
                                        'edit.pkgAvailable',
                                        {
                                          min: 1,
                                          type: 'number',
                                          placeholder: '0'
                                        },
                                        <>
                                          <FormattedMessage
                                            id='addInventory.pkgsAvailable'
                                            defaultMessage='PKGs Available'>
                                            {text => text}
                                          </FormattedMessage>
                                          <Required />
                                        </>
                                      )}
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <Dropdown
                                        label={
                                          <FormattedMessage id='addInventory.form' defaultMessage='Form'>
                                            {text => text}
                                          </FormattedMessage>
                                        }
                                        name='edit.productForm'
                                        options={listForms}
                                        inputProps={{
                                          onChange: this.onChange,
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          'data-test': 'new_inventory_form_drpdn',
                                          placeholder: (
                                            <FormattedMessage
                                              id='addInventory.selectForm'
                                              defaultMessage='Select Form'
                                            />
                                          )
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn width={8}>
                                      <FormField>
                                        <FormattedMessage id='global.warehouse' defaultMessage='Warehouse'>
                                          {text => (
                                            <label>
                                              {text}
                                              <Required />
                                            </label>
                                          )}
                                        </FormattedMessage>
                                        <Dropdown
                                          name='edit.warehouse'
                                          options={warehousesList}
                                          inputProps={{
                                            disabled: sidebarValues && sidebarValues.grouped,
                                            onChange: this.onChange,
                                            selection: true,
                                            value: 0,
                                            'data-test': 'new_inventory_warehouse_drpdn',
                                            placeholder: (
                                              <FormattedMessage
                                                id='addInventory.selectWarehouse'
                                                defaultMessage='Select Warehouse'
                                              />
                                            )
                                          }}
                                        />
                                      </FormField>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <Dropdown
                                        label={
                                          <FormattedMessage id='addInventory.origin' defaultMessage='Country of Origin'>
                                            {text => text}
                                          </FormattedMessage>
                                        }
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
                                          ),
                                          placeholder: (
                                            <FormattedMessage
                                              id='addInventory.selectCountry'
                                              defaultMessage='Select Country'
                                            />
                                          )
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn width={8}>
                                      <FormField width={16} data-test='detail_sidebar_fob_price'>
                                        {this.inputWrapper(
                                          'edit.fobPrice',
                                          {
                                            disabled: sidebarValues && sidebarValues.grouped,
                                            type: 'number',
                                            min: '0',
                                            onChange: (e, { value }) => {
                                              if (getSafe(() => values.priceTiers.pricingTiers.length, 0)) {
                                                setFieldValue(`priceTiers.pricingTiers[0].price`, value)
                                              }
                                            },
                                            placeholder: '0.000'
                                          },
                                          <>
                                            <FormattedMessage id='global.fobPrice' defaultMessage='FOB Price'>
                                              {text => text}
                                            </FormattedMessage>
                                            <Required />
                                          </>,
                                          currencySymbol
                                        )}
                                      </FormField>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <Dropdown
                                        label={
                                          <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>
                                            {text => text}
                                          </FormattedMessage>
                                        }
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
                                    <GridColumn width={8}>
                                      <Dropdown
                                        label={
                                          <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>
                                            {text => text}
                                          </FormattedMessage>
                                        }
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
                                    <GridColumn width={8}>
                                      <FormField width={16} data-test='detail_sidebar_cost'>
                                        {this.inputWrapper(
                                          'edit.costPerUOM',
                                          {
                                            disabled: sidebarValues && sidebarValues.grouped,
                                            type: 'number',
                                            min: '0',
                                            placeholder: '0.000'
                                          },
                                          <FormattedMessage id='global.cost' defaultMessage='Cost'>
                                            {text => text}
                                          </FormattedMessage>,
                                          currencySymbol
                                        )}
                                      </FormField>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <FormField>
                                        <FormattedMessage
                                          id='addInventory.conditionNotes'
                                          defaultMessage='Condition Notes'>
                                          {text => (
                                            <label>
                                              {text}
                                              {values.edit.conforming ? null : <Required />}
                                            </label>
                                          )}
                                        </FormattedMessage>
                                        <Input
                                          name='edit.conditionNotes'
                                          inputProps={{
                                            disabled: sidebarValues && sidebarValues.grouped,
                                            placeholder: formatMessage({
                                              id: 'addInventory.writeShortNotesHere',
                                              defaultMessage: 'Write short notes here...'
                                            })
                                          }}
                                        />
                                      </FormField>
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn width={8}>
                                      <CustomHr />
                                      <Header as='h3'>
                                        <FormattedMessage id='global.lot' defaultMessage='Lot' />
                                      </Header>
                                      <GraySegment>
                                        <Grid>
                                          <GridRow>
                                            <GridColumn>
                                              <Input
                                                label={
                                                  <FormattedMessage id='global.lotNumber' defaultMessage='Lot Number'>
                                                    {text => text}
                                                  </FormattedMessage>
                                                }
                                                type='text'
                                                name='edit.lotNumber'
                                                inputProps={{
                                                  placeholder: '0'
                                                }}
                                              />
                                            </GridColumn>
                                          </GridRow>
                                          <GridRow>
                                            <GridColumn>
                                              <DateInput
                                                label={
                                                  <FormattedMessage
                                                    id='global.expiredDate'
                                                    defaultMessage='Expired Date'>
                                                    {text => text}
                                                  </FormattedMessage>
                                                }
                                                inputProps={{
                                                  'data-test': 'sidebar_detail_lot_exp_date',
                                                  disabled: sidebarValues && sidebarValues.grouped
                                                }}
                                                name='edit.lotExpirationDate'
                                              />
                                            </GridColumn>
                                          </GridRow>
                                          <GridRow>
                                            <GridColumn>
                                              <DateInput
                                                label={
                                                  <FormattedMessage id='global.mfgDate' defaultMessage='Mfg Date'>
                                                    {text => text}
                                                  </FormattedMessage>
                                                }
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
                                      </GraySegment>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <SmallGrid>
                                        <GridRow>
                                          <GridColumn width={7}>
                                            <Dropdown
                                              label={
                                                <FormattedMessage id='global.inStock' defaultMessage='In Stock'>
                                                  {text => text}
                                                </FormattedMessage>
                                              }
                                              name='edit.inStock'
                                              options={optionsYesNo}
                                              inputProps={{
                                                onChange: this.onChange,
                                                disabled: sidebarValues && sidebarValues.grouped,
                                                'data-test': 'add_inventory_instock'
                                              }}
                                            />
                                          </GridColumn>
                                          <GridColumn width={9}>
                                            {this.inputLabeledWrapper(
                                              'edit.leadTime',
                                              {
                                                label: formatMessage({ id: 'filter.days', defaultMessage: 'days' }),
                                                labelPosition: 'right',
                                                type: 'number',
                                                min: '0',
                                                disabled: sidebarValues && sidebarValues.grouped
                                              },
                                              <>
                                                <FormattedMessage id='global.leadTime' defaultMessage='Lead Time'>
                                                  {text => text}
                                                </FormattedMessage>
                                                <Required />
                                              </>
                                            )}
                                          </GridColumn>
                                        </GridRow>
                                        <GridRow>
                                          <GridColumn width={7}>
                                            <Dropdown
                                              label={
                                                <FormattedMessage
                                                  id='global.offerExpiration'
                                                  defaultMessage='Offer Expiration'>
                                                  {text => text}
                                                </FormattedMessage>
                                              }
                                              name='edit.doesExpire'
                                              options={optionsYesNo}
                                              inputProps={{
                                                onChange: this.onChange,
                                                disabled: sidebarValues && sidebarValues.grouped,
                                                'data-test': 'add_inventory_doesExpire'
                                              }}
                                            />
                                          </GridColumn>
                                          <GridColumn width={9}>
                                            <DateInput
                                              label={
                                                <FormattedMessage
                                                  id='addInventory.offerExpirationDate'
                                                  defaultMessage='Offer Expiration Date'>
                                                  {text => text}
                                                </FormattedMessage>
                                              }
                                              inputProps={{
                                                disabled:
                                                  !values.edit.doesExpire || (sidebarValues && sidebarValues.grouped),
                                                'data-test': 'sidebar_detail_expiration_date'
                                                //! ! crashes on component calendar open if expirationDate is in past:
                                                //! ! minDate: moment().add(1, 'days')
                                              }}
                                              name='edit.expirationDate'
                                            />
                                          </GridColumn>
                                        </GridRow>
                                        <GridRow>
                                          <GridColumn width={8} data-test='add_inventory_product_minimumOQ_inp'>
                                            {this.quantityWrapper(
                                              'edit.minimum',
                                              {
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
                                              },
                                              <>
                                                <FormattedMessage id='global.minimumPkgs' defaultMessage='Minimum PKGs'>
                                                  {text => text}
                                                </FormattedMessage>
                                                <Required />
                                              </>
                                            )}
                                          </GridColumn>
                                          <GridColumn width={8} data-test='add_inventory_product_splits_inp'>
                                            {this.quantityWrapper(
                                              'edit.splits',
                                              {
                                                disabled: sidebarValues && sidebarValues.grouped,
                                                type: 'number',
                                                min: 1,
                                                onChange: (e, { value }) =>
                                                  this.onSplitsChange(value, values, setFieldValue, validateForm)
                                              },
                                              <>
                                                <FormattedMessage id='global.splitPkgs' defaultMessage='Split PKGs'>
                                                  {text => text}
                                                </FormattedMessage>
                                                <Required />
                                              </>
                                            )}
                                          </GridColumn>
                                        </GridRow>
                                        <GridRow>
                                          <GridColumn>
                                            <Dropdown
                                              label={
                                                <FormattedMessage id='global.broadcast' defaultMessage='Broadcast'>
                                                  {text => text}
                                                </FormattedMessage>
                                              }
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
                                      </SmallGrid>
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn>
                                      <TextArea
                                        name='edit.externalNotes'
                                        label={formatMessage({
                                          id: 'addInventory.externalNotes',
                                          defaultMessage: 'External Notes'
                                        })}
                                        inputProps={{
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          placeholder: formatMessage({
                                            id: 'addInventory.writeExternalNotesHere',
                                            defaultMessage: 'Write external notes here...'
                                          })
                                        }}
                                      />
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn>
                                      <TextArea
                                        name='edit.internalNotes'
                                        label={formatMessage({
                                          id: 'addInventory.internalNotes',
                                          defaultMessage: 'Internal Notes'
                                        })}
                                        inputProps={{
                                          disabled: sidebarValues && sidebarValues.grouped,
                                          placeholder: formatMessage({
                                            id: 'addInventory.writeInternalNotesHere',
                                            defaultMessage: 'Write internal notes here...'
                                          })
                                        }}
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
                                      this.switchTab(1)
                                    })
                                    .catch(e => {
                                      console.log('CATCH', e)
                                    })
                                }}
                                data-test='detail_inventory_tab_documents'>
                                {formatMessage({ id: 'addInventory.productDocuments', defaultMessage: 'DOCUMENTS' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='documents' style={{ padding: '16px' }}>
                                <DocumentTab
                                  listDocumentTypes={listDocumentTypes}
                                  values={values.documents}
                                  setFieldValue={setFieldValue}
                                  setFieldNameAttachments='documents.attachments'
                                  dropdownName='documents.documentType'
                                  removeAttachmentLink={removeAttachmentLinkProductOffer}
                                  removeAttachment={removeAttachment}
                                  addAttachment={addAttachment}
                                  loadFile={loadFile}
                                  changedForm={files =>
                                    this.setState(prevState => ({
                                      changedForm: true,
                                      attachmentFiles: prevState.attachmentFiles.concat(files)
                                    }))
                                  }
                                  idForm={getSafe(() => sidebarValues.id, 0)}
                                  attachmentFiles={this.state.attachmentFiles}
                                  removeAttachmentFromUpload={id => {
                                    const attachmentFiles = this.state.attachmentFiles.filter(
                                      attachment => attachment.id !== id
                                    )
                                    this.setState({ attachmentFiles })
                                  }}
                                />
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
                                {formatMessage({ id: 'addInventory.priceBook', defaultMessage: 'PRICE BOOK' })}
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
                                {formatMessage({ id: 'addInventory.priceTiersHeader', defaultMessage: 'PRICE TIERS' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='priceTiers' style={{ padding: '18px' }}>
                                <Grid>
                                  <GridRow>
                                    <GridColumn>
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
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn width={4}>
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
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn>
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
                                    </GridColumn>
                                  </GridRow>
                                  {/* <Grid> */}
                                  <GridRow>
                                    <GridColumn>{this.renderPricingTiers(values.priceTiers.priceTiers)}</GridColumn>
                                  </GridRow>
                                  {/* </Grid> */}
                                </Grid>
                              </Tab.Pane>
                            )
                          }
                        ]}
                      />
                    </FlexTabs>
                  </HighSegment>
                </FlexContent>
                <BottomButtons>
                  <div>
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
                    <Button
                      disabled={!(Object.keys(touched).length || this.state.changedForm)}
                      primary
                      size='large'
                      type='button'
                      onClick={() => {
                        // Dont validate if it is a broadcast tab
                        if (this.state.activeTab === 2) {
                          this.submitForm(values, setSubmitting, setTouched)
                          return true
                        }

                        return validateForm().then(async r => {
                          if (Object.keys(r).length && this.state.activeTab !== 1) {
                            this.switchToErrors(r)
                            submitForm() // to show errors
                          } else {
                            let { data } = await this.submitForm(values, setSubmitting, setTouched)
                            if (!getSafe(() => this.state.sidebarValues.id, false)) {
                              confirm(
                                formatMessage({
                                  id: 'confirm.editOrAddNew.header',
                                  defaultMessage: 'Edit or add New'
                                }),
                                formatMessage({
                                  id: 'confirm.editOrAddNew.content',
                                  defaultMessage:
                                    'If you like to continue editing this product offer by adding documents, price tiers, or price book rules, click Edit. If you would like to add a new Inventory Item, click New.'
                                }),
                                {
                                  cancelText: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
                                  proceedText: formatMessage({ id: 'global.new', defaultMessage: 'New' })
                                }
                              )
                                .then(() => {
                                  this.setState(state => ({
                                    ...state,
                                    sidebarValues: { ...state.sidebarValues, id: null }
                                  }))
                                })
                                .catch(() => {
                                  this.setState(state => ({
                                    ...state,
                                    sidebarValues: { ...state.sidebarValues, id: data.id }
                                  }))
                                })
                            }
                          }
                        })
                      }}
                      data-test='sidebar_inventory_save_new'>
                      {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                    </Button>
                  </div>
                </BottomButtons>
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
  removeAttachment,
  downloadAttachment,
  closeSidebarDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer
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
  editProductOfferInitTrig,
  currencySymbol: '$'
})

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(DetailSidebar))))
