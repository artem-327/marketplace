import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form, Label } from 'semantic-ui-react'
import { Formik, FieldArray } from 'formik'
import { DateInput } from '~/components/custom-formik'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'
import confirm from '~/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { PriceField } from '~/styles/styledComponents'
import ModalTdsSaveAs from './ModalTdsSaveAs'
import ModalTdsList from './ModalTdsList'
//Actions
import { getTemplates } from '~/modules/broadcast/actions'

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
  Modal,
  Button as ButtonSemantic
} from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import {
  SelectTemplates,
  TdsHeader,
  TdsActions,
  TemplateTitle,
  TemplateGrid,
  TemplateRow,
  TemplateColumn,
  TemplateWrapper,
  TemplateApply,
  TemplateDelete
} from './styles'
import { Trash, PlusCircle, X as XIcon, Plus, Trash2, ChevronDown, ChevronUp, Folder } from 'react-feather'

import {
  modalDetailTrigger,
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
  closeModalDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer,
  saveTdsAsTemplate,
  getTdsTemplates,
  deleteTdsTemplate
} from '../../actions'
import { Broadcast } from '~/modules/broadcast'
import { openBroadcast } from '~/modules/broadcast/actions'
import ProdexGrid from '~/components/table'
import * as val from 'yup'
import { errorMessages, dateBefore, dateValidation } from '~/constants/yupValidation'
import moment from 'moment'
import UploadAttachment from '../../components/upload/UploadAttachment'
import { withDatagrid } from '~/modules/datagrid'
import { AttachmentManager } from '~/modules/attachments'
import _ from 'lodash'
import DocumentTab from '~/components/document-tab'
import { Required } from '~/components/constants/layout'

import {
  FlexModal,
  FlexTabs,
  FlexModalContent,
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
  CustomLabel,
  NetworkDropdown,
  NetworkChevronDown,
  DivIconOptions,
  HeaderOptions,
  GridColumnOptionalInformation,
  FormFieldZeroPadding,
  TextAreaField
} from '../../constants/layout'
import ErrorFocus from '~/components/error-focus'

const tdsArray = [
  { property: 'name', specifications: 'value1' },
  { property: 'name2', specifications: 'value1' }
]

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

const CustomGridColumn = styled(Grid.Column)`
  padding-bottom: 0px !important;
  padding-top: 7px !important;
`

const GridColumnRequired = styled(Grid.Column)`
  padding: 0px 10px !important;
  color: #404040 !important;
  font-size: 14px !important;
  line-height: 1.29 !important;
`

const PricingIcon = styled(Icon)`
  line-height: 40px;
`

const DivAddInputTds = styled.div`
  border-radius: 3px;
  border: solid 1px #2599d5;
  background-color: #ddf1fc;
  padding: 8px 0 4px 0;
  cursor: pointer;
`

const IconPlusCircle = styled(PlusCircle)`
  color: #2599d5;
  line-height: 1.11;
  width: 18px;
  height: 20px;
`

const IconTrash = styled(Trash)`
  cursor: pointer;
  color: #f16844;
`

const DivIconPlusCircle = styled.div`
  margin: 0;
`

const DivTrash = styled.div`
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DivButtonPlus = styled.div`
  cursor: pointer;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  height: 40px;
  width: 40px;
  padding-top: 6px;
  text-align: center;
`

const DivLevel = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DivTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: #20273a;
  padding: 20px 20px 0px 20px;
`

const DivRequiredFields = styled.div`
  padding: 10px 10px 30px 10px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  //width: -webkit-fill-available;
`

const GridFields = styled(Grid)`
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;

  > .row:first-child:nth-last-child(2) svg {
    display: none !important;
  }
`

const initValues = {
  edit: {
    broadcasted: true,
    condition: null,
    conditionNotes: '',
    conforming: true,
    costPerUOM: null,
    externalNotes: '',
    pkgAvailable: 1,
    product: null,
    warehouse: null,
    fobPrice: '',
    inStock: false,
    internalNotes: '',
    leadTime: 1,
    lotNumber: '',
    lotExpirationDate: '',
    lotManufacturedDate: '',
    minimum: 1, // minPkg
    origin: null,
    productCondition: null,
    productForm: null,
    productGrades: [],
    splits: 1, // splitPkg
    doesExpire: false,
    expirationDate: '',
    documentType: '',
    broadcastOption: 'FREE_FOR_ALL',
    acceptBids: true
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

const validationScheme = val.lazy(values => {
  let minimumQuantity = getSafe(() => values.edit.minimum, 0) > 0 ? values.edit.minimum - 1 : 0
  if (values.edit.costPerUOM === '') values.edit.costPerUOM = null
  return val.object().shape({
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
        .number()
        .typeError(errorMessages.mustBeNumber)
        .notRequired()
        .nullable()
        .min(0.001, errorMessages.minimum(0.001))
        .test('maxdec', errorMessages.maxDecimals(3), val => {
          return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
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
      //This validation maybe return back. It will be depends on new BE logic.
      // .test('match', errorMessages.greaterOrEqual(values.edit.minimum), function (pkgAvailable) {
      //   return typeof values.edit.minimum === 'undefined' || pkgAvailable >= values.edit.minimum
      // }),
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
      expirationDate: dateValidation(false).concat(
        val.string().when('doesExpire', {
          is: true,
          then: val
            .string()
            .test(
              'min-date',
              errorMessages.mustBeInFuture,
              val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
            )
        })
      ),
      lotExpirationDate: dateValidation(false),
      lotManufacturedDate: dateValidation(false).concat(
        val
          .string()
          .test(
            'max-date',
            errorMessages.mustBeInPast,
            val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') > -1
          )
      )
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
              .moreThan(minimumQuantity, errorMessages.greaterOrEqual(minimumQuantity + 1)),
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
})

class ModalDetail extends Component {
  state = {
    tabs: ['edit', 'tds', 'documents', 'priceBook', 'priceTiers'],
    activeTab: 0,
    broadcastLoading: true,
    saveBroadcast: 0,
    changedForm: false,
    documentType: 1,
    openUploadAttachment: false,
    edited: false,
    detailValues: null,
    initValues: initValues,
    attachmentFiles: [],
    isOpenOptionalInformation: false,
    openedTdsList: false,
    openedTdsSaveAs: false
  }

  componentDidMount = async () => {
    const {
      detailValues,
      broadcastTemplates,
      getProductConditions,
      getProductForms,
      getProductGrades,
      getWarehouses,
      getDocumentTypes,
      searchOrigins,
      searchManufacturers,
      modalActiveTab,
      getTemplates
    } = this.props
    if (detailValues) {
      await this.loadProductOffer(detailValues.id) // Start editing, reload product offer
    } else {
      searchOrigins('', 200)
    }
    this.fetchIfNoData('listConditions', getProductConditions)
    this.fetchIfNoData('listForms', getProductForms)
    this.fetchIfNoData('listGrades', getProductGrades)
    this.fetchIfNoData('warehousesList', getWarehouses)
    this.fetchIfNoData('listDocumentTypes', getDocumentTypes)

    if (broadcastTemplates && !broadcastTemplates.length) {
      getTemplates()
    }

    searchManufacturers('', 200)
    this.switchTab(modalActiveTab)
  }

  fetchIfNoData = (name, fn) => {
    if (this.props[name].length === 0) fn()
  }

  loadProductOffer = async (id, shouldSwitchTab) => {
    const data = await this.props.getProductOffer(id)
    if (shouldSwitchTab) {
      this.switchTab(this.props.modalActiveTab, data.value.data)
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
        detailValues: data.value.data,
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
        (this.props.modalActiveTab > -1 && prevProps.modalActiveTab !== this.props.modalActiveTab) ||
        this.state.activeTab === 3 /* To Reload Broadcast rules */

      if (this.props.detailValues) {
        // Edit mode
        if (!prevProps.detailValues) {
          // Add new to Edit mode
          this.validateSaveOrSwitchToErrors(() => {
            this.loadProductOffer(this.props.detailValues.id, shouldSwitchTab)
          })
        } else {
          // Edit to Edit mode
          this.validateSaveOrSwitchToErrors(() => {
            this.loadProductOffer(this.props.detailValues.id, shouldSwitchTab)
          })
        }
      } else {
        // Add new mode
        this.validateSaveOrSwitchToErrors(() => {
          this.setState({ detailValues: null, initValues: initValues }, () => {
            this.resetForm()
            this.props.searchOrigins('', 200)
            if (shouldSwitchTab) {
              this.switchTab(this.props.modalActiveTab)
            }
          })
        })
      }
    }
  }

  changedForm = (isChanged = true) => {
    this.setState({ changedForm: isChanged })
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
    this.setState({ openUploadAttachment: true, documentType: value })
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

  renderPricingTiers = pricingTiers => {
    if (!pricingTiers || !getSafe(() => pricingTiers.length, '')) return
    const { setFieldValue, values } = this.formikProps
    let tiers = []

    for (let i = 0; i < pricingTiers.length; i++) {
      tiers.push(
        <GridRow>
          <GridColumn computer={1} textAlign='center'>
            <DivLevel name={`priceTiers.pricingTiers[${i}].level`}>{i + 1}</DivLevel>
          </GridColumn>

          <GridColumn computer={2} textAlign='center'>
            <PricingIcon className='greater than equal' />
          </GridColumn>

          <GridColumn computer={1} data-test={`add_inventory_manuallyModified_${i}_inp`}>
            <Input name={`priceTiers.pricingTiers[${i}].manuallyModified`} inputProps={{ type: 'hidden', value: 0 }} />
          </GridColumn>

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
                },
                placeholder: '0',
                disabled: i === 0
              }}
            />
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
          <GridColumn computer={1} textAlign='center'>
            {i > 0 ? (
              <DivTrash
                onClick={() => {
                  let pricingTiers = values.priceTiers.pricingTiers.slice()
                  pricingTiers.splice(i, 1)
                  setFieldValue('priceTiers.pricingTiers', pricingTiers)
                }}>
                <Trash2 color='#f16844' />
              </DivTrash>
            ) : null}
          </GridColumn>
          <GridColumn computer={1}></GridColumn>
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
    const { addProductOffer, datagrid, openGlobalAddForm } = this.props
    const { detailValues, attachmentFiles } = this.state
    let isEdit = getSafe(() => detailValues.id, null)
    let isGrouped = getSafe(() => detailValues.grouped, false)
    let sendSuccess = false
    let data = null
    let tdsFields = []
    if (getSafe(() => values.edit.tdsFields.length, '')) {
      values.edit.tdsFields.forEach((item, index) => {
        if (getSafe(() => item.property, '')) tdsFields.push(item)
      })
    }

    await new Promise(resolve => this.setState({ edited: false }, resolve))

    setSubmitting(false)
    let props = {}
    switch (this.state.activeTab) {
      case 0:
      case 1:
      case 2:
      case 4:
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
            values.edit.costPerUOM === null || values.edit.costPerUOM === '' ? null : Number(values.edit.costPerUOM),
          tdsFields: tdsFields.length ? JSON.stringify(tdsFields) : ''
        }
        break
      case 3:
        this.saveBroadcastRules()
        setTouched({})
        this.setState({ changedForm: false, edited: false })
        break
    }

    if (Object.keys(props).length) {
      try {
        data = await addProductOffer(props, isEdit, false, isGrouped, attachmentFiles)
        if (isEdit) {
          !openGlobalAddForm && datagrid.updateRow(data.id, () => data)
        } else {
          !openGlobalAddForm && datagrid.loadData()
        }

        this.setState({
          detailValues: { ...data, id: isEdit ? data.id : null },
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
              !openGlobalAddForm && datagrid.updateRow(entityId, () => po.value)
              this.setState({
                detailValues: po.value,
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
      if (newTab === 3) {
        await this.props.openBroadcast(data ? data : this.state.detailValues).then(async () => {
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
        case 'priceTiers':
          this.switchTab(4)
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
    }
  }

  attachDocumentsManager = (newDocuments, values, setFieldValue) => {
    const docArray = uniqueArrayByKey(values.documents.attachments.concat(newDocuments), 'id')
    setFieldValue(`documents.attachments`, docArray)
    this.setState({ changedForm: true })
  }

  attachDocumentsUploadAttachment = (newDocument, values, setFieldValue) => {
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
    return !_.isEqual(this.getEditValues(this.state.detailValues), values)
  }

  getEditValues = detailValues => {
    let tdsFields = null
    //Convert tdsFields string array of objects to array
    if (getSafe(() => detailValues.tdsFields, '')) {
      let newJson = detailValues.tdsFields.replace(/([a-zA-Z0-9]+?):/g, '"$1":')
      newJson = newJson.replace(/'/g, '"')
      tdsFields = JSON.parse(newJson)
    }

    return {
      edit: {
        broadcasted: getSafe(() => detailValues.broadcasted, false),
        condition: getSafe(() => detailValues.condition, null),
        conditionNotes: getSafe(() => detailValues.conditionNotes, ''),
        conforming: getSafe(() => detailValues.conforming, true),
        costPerUOM: getSafe(() => detailValues.costPerUOM, null),
        externalNotes: getSafe(() => detailValues.externalNotes, ''),
        fobPrice: getSafe(() => detailValues.pricingTiers[0].pricePerUOM, ''),
        broadcastOption: getSafe(
          () =>
            detailValues.broadcastTemplateResponse
              ? detailValues.broadcastOption + '|' + detailValues.broadcastTemplateResponse.id
              : detailValues.broadcastOption,
          ''
        ),
        inStock: getSafe(() => detailValues.inStock, false),
        internalNotes: getSafe(() => detailValues.internalNotes, ''),
        internalNotes: getSafe(() => detailValues.internalNotes, ''),
        leadTime: getSafe(() => detailValues.leadTime, 1),
        lotNumber: getSafe(() => detailValues.lotNumber, ''),
        lotExpirationDate:
          detailValues && detailValues.lotExpirationDate
            ? moment(detailValues.lotExpirationDate).format(getLocaleDateFormat())
            : '',
        lotManufacturedDate:
          detailValues && detailValues.lotManufacturedDate
            ? moment(detailValues.lotManufacturedDate).format(getLocaleDateFormat())
            : '',
        minimum: getSafe(() => detailValues.minPkg, 1),
        origin: getSafe(() => detailValues.origin.id, null),
        pkgAvailable: getSafe(() => detailValues.pkgAvailable, ''),
        product: getSafe(() => detailValues.companyProduct.id, null),
        productCondition: getSafe(() => detailValues.condition.id, null),
        productForm: getSafe(() => detailValues.form.id, null),
        productGrades: getSafe(() => detailValues.grades.map(grade => grade.id), []),
        splits: getSafe(() => detailValues.splitPkg, 1),
        doesExpire: getSafe(() => detailValues.validityDate.length > 0, false),
        expirationDate:
          detailValues && detailValues.validityDate
            ? moment(detailValues.validityDate).format(getLocaleDateFormat())
            : '',
        warehouse: getSafe(() => detailValues.warehouse.id, null),
        tdsFields: getSafe(() => tdsFields, [{ property: '', specifications: '' }])
      },
      priceTiers: {
        priceTiers: getSafe(() => detailValues.pricingTiers.length, 0),
        pricingTiers: getSafe(
          () =>
            detailValues.pricingTiers.map(priceTier => ({
              price: priceTier.pricePerUOM,
              quantityFrom: priceTier.quantityFrom
            })),
          []
        )
      },
      documents: {
        documentType: getSafe(() => detailValues.documentType, null),
        attachments: getSafe(() => detailValues.attachments.map(att => ({ ...att, linked: true })), [])
      }
    }
  }

  handleChangeProduct = (e, value, setFieldValue) => {
    if (!value) return
    const { autocompleteData } = this.props
    if (getSafe(() => autocompleteData.length, false)) {
      const companyProduct = autocompleteData.find(product => product.id === value)
      if (getSafe(() => companyProduct.palletMinPkgs, false))
        setFieldValue('edit.minimum', companyProduct.palletMinPkgs)
    }
    this.setState({ edited: true })
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

  closeTdsModal = () => {
    this.setState({ openedTdsList: false, openedTdsSaveAs: false })
  }

  render() {
    let {
      // addProductOffer,
      listConditions,
      listForms,
      listGrades,
      loading,
      // openBroadcast,
      // isModalDetailOpen,
      detailValues,
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
      currencySymbol,
      openGlobalAddForm,
      inventoryGrid,
      isLoadingBroadcast,
      autocompleteDataLoading,
      broadcastTemplates,
      tdsTemplatesLoading,
      tdsTemplates
    } = this.props
    const { openedTdsList, openedTdsSaveAs } = this.state

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

    const optionsSeeOffer = [
      {
        icon: (
          <DivIconOptions>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <g fill='none' fill-rule='evenodd'>
                <path
                  d='M0 0L24 0 24 24 0 24z'
                  transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
                />
                <path
                  fill='#20273A'
                  fill-rule='nonzero'
                  d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
                  transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
                />
              </g>
            </svg>
          </DivIconOptions>
        ),
        title: formatMessage({ id: 'myInventory.network', defaultMessage: 'Network' }),
        subtitle: formatMessage({
          id: 'myInventory.networkSubtitle',
          defaultMessage: 'Your accepted Partners and invited Guests'
        }),
        value: 'FREE_FOR_ALL'
      },
      /*{
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1125 -447) translate(1105 295) translate(0 29) translate(20 123)"/>
              <path fill="#848893" fill-rule="nonzero" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z" transform="translate(-1125 -447) translate(1105 295) translate(0 29) translate(20 123)"/>
            </g>
          </svg>
    
        ),
        title: formatMessage({ id: 'myInventory.partners', defaultMessage: 'Partners' }),
        subtitle: formatMessage({ id: 'myInventory.partnersSubtitle', defaultMessage: 'Your accepted Partners' }),
        value: ''
      },*/
      {
        icon: (
          <DivIconOptions>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <g fill='none' fill-rule='evenodd'>
                <path
                  d='M0 0L24 0 24 24 0 24z'
                  transform='translate(-1125 -507) translate(1105 295) translate(0 29) translate(20 183)'
                />
                <path
                  fill='#848893'
                  fill-rule='nonzero'
                  d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z'
                  transform='translate(-1125 -507) translate(1105 295) translate(0 29) translate(20 183)'
                />
              </g>
            </svg>
          </DivIconOptions>
        ),
        title: formatMessage({ id: 'myInventory.guests', defaultMessage: 'Guests' }),
        subtitle: formatMessage({ id: 'myInventory.guestsSubtitle', defaultMessage: 'Your invited Guests' }),
        value: 'CLIENT_COMPANIES'
      },
      {
        icon: (
          <DivIconOptions>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <g fill='none' fill-rule='evenodd'>
                <g>
                  <path
                    d='M0 0L24 0 24 24 0 24z'
                    transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                  />
                  <path
                    d='M0 0L24 0 24 24 0 24z'
                    opacity='.87'
                    transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                  />
                </g>
                <path
                  fill='#848893'
                  fill-rule='nonzero'
                  d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
                  transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                />
              </g>
            </svg>
          </DivIconOptions>
        ),
        title: formatMessage({ id: 'myInventory.justMe', defaultMessage: 'Just Me' }),
        subtitle: formatMessage({ id: 'myInventory.justMeSubtitle', defaultMessage: 'Only my Company' }),
        value: 'NO_BROADCAST'
      },
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
      }),
      {
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
        title: formatMessage({ id: 'myInventory.custom', defaultMessage: 'Custom' }),
        subtitle: formatMessage({ id: 'myInventory.customSubtitle', defaultMessage: 'Create Custom Rule' }),
        value: 'CUSTOM_RULES'
      }
    ]

    // const { toggleFilter } = this.props

    return (
      <>
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
              setValues,
              setFieldValue,
              validateForm,
              validateField,
              submitForm,
              setSubmitting,
              resetForm
            } = formikProps
            this.values = values
            this.resetForm = resetForm
            this.formikProps = formikProps

            return (
              <Form onChange={this.onChange}>
                <FlexModal
                  open={true}
                  closeIcon
                  onClose={e => {
                    e.stopPropagation()
                    this.setState({ edited: false }, () =>
                      openGlobalAddForm ? openGlobalAddForm('') : this.props.closeModalDetail()
                    )
                  }}>
                  <FlexModalContent>
                    <Dimmer inverted active={loading || autocompleteDataLoading || searchedOriginsLoading}>
                      <Loader active={loading || autocompleteDataLoading || searchedOriginsLoading} />
                    </Dimmer>
                    <HighSegment basic>
                      <DivTitle>
                        {formatMessage({
                          id: getSafe(() => this.state.detailValues.id, false)
                            ? 'inventory.modal.editListing'
                            : 'inventory.modal.addListing',
                          defaultMessage: getSafe(() => this.state.detailValues.id, false)
                            ? 'Edit Listing'
                            : 'Add Listing'
                        })}
                      </DivTitle>
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
                                        console.error(e)
                                      })
                                  }}
                                  data-test='detail_inventory_tab_edit'>
                                  {formatMessage({
                                    id: getSafe(() => this.state.detailValues.id, false)
                                      ? 'addInventory.editHeader'
                                      : 'addInventory.addHeader',
                                    defaultMessage: getSafe(() => this.state.detailValues.id, false) ? 'EDIT' : 'ADD'
                                  })}
                                </Menu.Item>
                              ),
                              pane: (
                                <Tab.Pane key='edit' style={{ padding: '18px', margin: '0' }}>
                                  <Grid>
                                    {detailValues && detailValues.grouped && (
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

                                    <CustomGridRow>
                                      <GridColumnRequired>
                                        <FormattedMessage id='global.required' defaultMessage='Required' />
                                      </GridColumnRequired>
                                    </CustomGridRow>
                                    <GridRow>
                                      <GridColumn>
                                        <DivRequiredFields>
                                          <Grid>
                                            <CustomGridRow>
                                              <CustomGridColumn>
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
                                                    options={this.props.autocompleteData.map((el, i) => {
                                                      const code = getSafe(() => el.intProductCode, '')
                                                      const name = getSafe(() => el.intProductName, '')
                                                      const dispName =
                                                        code && name ? `${name} (${code})` : code ? code : name
                                                      const packagingSize = getSafe(() => el.packagingSize, '')
                                                      const packagingUnit = getSafe(
                                                        () => el.packagingUnit.nameAbbreviation,
                                                        ''
                                                      )
                                                      const packagingType = getSafe(() => el.packagingType.name, '')
                                                      return {
                                                        key: i,
                                                        text: (
                                                          <>
                                                            {`${dispName}: ${packagingSize} ${packagingUnit} `}
                                                            <span style={{ textTransform: 'capitalize' }}>
                                                              {packagingType}
                                                            </span>
                                                          </>
                                                        ),
                                                        value: el.id
                                                      }
                                                    })}
                                                    inputProps={{
                                                      placeholder: (
                                                        <FormattedMessage
                                                          id='addInventory.searchByProductName'
                                                          defaultMessage='Search by product name'
                                                        />
                                                      ),
                                                      disabled: detailValues && detailValues.grouped,
                                                      loading: this.props.autocompleteDataLoading,
                                                      'data-test': 'new_inventory_product_search_drpdn',
                                                      minCharacters: 1,
                                                      icon: 'search',
                                                      fluid: true,
                                                      search: options => options,
                                                      selection: true,
                                                      clearable: true,
                                                      onChange: (e, { value }) =>
                                                        this.handleChangeProduct(e, value, setFieldValue),
                                                      onSearchChange: (e, { searchQuery }) =>
                                                        searchQuery.length > 0 && this.searchProducts(searchQuery)
                                                    }}
                                                  />
                                                </FormField>
                                              </CustomGridColumn>
                                            </CustomGridRow>
                                            <CustomGridRow>
                                              <CustomGridColumn>
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
                                                      disabled: detailValues && detailValues.grouped,
                                                      onChange: this.onChange,
                                                      selection: true,
                                                      value: 0,
                                                      fluid: true,
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
                                              </CustomGridColumn>
                                            </CustomGridRow>
                                            <CustomGridRow>
                                              <CustomGridColumn width={8}>
                                                <FormField width={8}>
                                                  <FormattedMessage
                                                    id='addInventory.pkgsAvailable'
                                                    defaultMessage='PKGs Available'>
                                                    {text => (
                                                      <label>
                                                        {text}
                                                        <Required />
                                                      </label>
                                                    )}
                                                  </FormattedMessage>
                                                  <Input
                                                    name='edit.pkgAvailable'
                                                    inputProps={{
                                                      placeholder: '0',
                                                      type: 'number',
                                                      min: 1,
                                                      fluid: true
                                                    }}
                                                  />
                                                </FormField>
                                              </CustomGridColumn>
                                              <CustomGridColumn
                                                width={4}
                                                data-test='add_inventory_product_minimumOQ_inp'>
                                                <FormField width={4}>
                                                  <FormattedMessage
                                                    id='global.minimumPkgs'
                                                    defaultMessage='Minimum PKGs'>
                                                    {text => (
                                                      <label>
                                                        {text}
                                                        <Required />
                                                      </label>
                                                    )}
                                                  </FormattedMessage>
                                                  <Input
                                                    name='edit.minimum'
                                                    inputProps={{
                                                      placeholder: '0',
                                                      disabled: detailValues && detailValues.grouped,
                                                      type: 'number',
                                                      fluid: true,
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
                                                </FormField>
                                              </CustomGridColumn>
                                              <CustomGridColumn width={4} data-test='add_inventory_product_splits_inp'>
                                                <FormField width={4}>
                                                  <FormattedMessage id='global.splitPkgs' defaultMessage='Split PKGs'>
                                                    {text => (
                                                      <label>
                                                        {text}
                                                        <Required />
                                                      </label>
                                                    )}
                                                  </FormattedMessage>
                                                  <Input
                                                    name='edit.splits'
                                                    inputProps={{
                                                      placeholder: '0',
                                                      disabled: detailValues && detailValues.grouped,
                                                      type: 'number',
                                                      min: 1,
                                                      fluid: true,
                                                      onChange: (e, { value }) =>
                                                        this.onSplitsChange(value, values, setFieldValue, validateForm)
                                                    }}
                                                  />
                                                </FormField>
                                              </CustomGridColumn>
                                            </CustomGridRow>
                                            <CustomGridRow>
                                              <CustomGridColumn width={8}>
                                                <FormField width={4}>
                                                  {this.inputWrapper(
                                                    'edit.fobPrice',
                                                    {
                                                      disabled: detailValues && detailValues.grouped,
                                                      type: 'number',
                                                      min: '0',
                                                      onChange: (e, { value }) => {
                                                        if (getSafe(() => values.priceTiers.pricingTiers.length, 0)) {
                                                          setFieldValue(`priceTiers.pricingTiers[0].price`, value)
                                                        }
                                                      },
                                                      placeholder: '0.000',
                                                      fluid: true
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
                                              </CustomGridColumn>
                                              <CustomGridColumn width={4}>
                                                <FormField width={4}>
                                                  <FormattedMessage id='global.inStock' defaultMessage='In Stock'>
                                                    {text => (
                                                      <label>
                                                        {text}
                                                        <Required />
                                                      </label>
                                                    )}
                                                  </FormattedMessage>
                                                  <Dropdown
                                                    name='edit.inStock'
                                                    options={optionsYesNo}
                                                    inputProps={{
                                                      onChange: this.onChange,
                                                      disabled: detailValues && detailValues.grouped,
                                                      'data-test': 'add_inventory_instock',
                                                      fluid: true
                                                    }}
                                                  />
                                                </FormField>
                                              </CustomGridColumn>
                                              <CustomGridColumn width={4}>
                                                <FormField width={4}>
                                                  {this.inputLabeledWrapper(
                                                    'edit.leadTime',
                                                    {
                                                      label: formatMessage({
                                                        id: 'filter.days',
                                                        defaultMessage: 'days'
                                                      }),
                                                      labelPosition: 'right',
                                                      type: 'number',
                                                      min: '0',
                                                      disabled: detailValues && detailValues.grouped
                                                    },
                                                    <>
                                                      <FormattedMessage id='global.leadTime' defaultMessage='Lead Time'>
                                                        {text => text}
                                                      </FormattedMessage>
                                                      <Required />
                                                    </>
                                                  )}
                                                </FormField>
                                              </CustomGridColumn>
                                            </CustomGridRow>
                                          </Grid>
                                        </DivRequiredFields>
                                      </GridColumn>
                                    </GridRow>
                                    <CustomGridRow>
                                      <GridColumn width={8}>
                                        <FormField width={8}>
                                          <FormattedMessage
                                            id='myInventory.whoShouldSee'
                                            defaultMessage='Who should see this offer?'>
                                            {text => <label>{text}</label>}
                                          </FormattedMessage>
                                          <Dropdown
                                            name='edit.broadcastOption'
                                            inputProps={{
                                              onChange: this.onChange,
                                              'data-test': 'add_inventory_whoShouldSee',
                                              fluid: true,
                                              closeOnChange: true
                                            }}
                                            options={optionsSeeOffer.map((option, optIndex) => {
                                              return {
                                                key: option.id ? option.id : optIndex * -1 - 1,
                                                text: (
                                                  <HeaderOptions
                                                    icon={option.icon}
                                                    content={option.title}
                                                    subheader={option.subtitle}
                                                  />
                                                ),
                                                value: option.value,
                                                content: (
                                                  <HeaderOptions
                                                    icon={option.icon}
                                                    content={option.title}
                                                    subheader={option.subtitle}
                                                  />
                                                )
                                              }
                                            })}
                                          />
                                        </FormField>
                                      </GridColumn>
                                    </CustomGridRow>
                                    {/* It's not supported yet */}
                                    {false && (
                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage
                                              id='myInventory.acceptBids'
                                              defaultMessage='Accept bids on offer?'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Dropdown
                                              name='edit.acceptBids'
                                              options={optionsYesNo}
                                              inputProps={{
                                                onChange: this.onChange,
                                                'data-test': 'add_inventory_acceptBids',
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                      </CustomGridRow>
                                    )}
                                    <CustomGridRow>
                                      <GridColumnOptionalInformation
                                        onClick={() =>
                                          this.setState(old => ({
                                            isOpenOptionalInformation: !old.isOpenOptionalInformation
                                          }))
                                        }>
                                        <FormattedMessage
                                          id='myInventory.optionalInformation'
                                          defaultMessage='Optional Information'
                                        />
                                        {this.state.isOpenOptionalInformation ? <ChevronUp /> : <ChevronDown />}
                                      </GridColumnOptionalInformation>
                                    </CustomGridRow>
                                    {this.state.isOpenOptionalInformation ? (
                                      <>
                                        <CustomGridRow>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              {this.inputWrapper(
                                                'edit.costPerUOM',
                                                {
                                                  disabled: detailValues && detailValues.grouped,
                                                  type: 'number',
                                                  min: '0',
                                                  placeholder: '0.000',
                                                  fluid: true
                                                },
                                                <FormattedMessage id='global.cost' defaultMessage='Cost'>
                                                  {text => text}
                                                </FormattedMessage>,
                                                currencySymbol
                                              )}
                                            </FormField>
                                          </GridColumn>
                                          <GridColumn width={3}>
                                            <FormField width={3}>
                                              <FormattedMessage
                                                id='global.offerExpiration'
                                                defaultMessage='Offer Expiration'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <Dropdown
                                                name='edit.doesExpire'
                                                options={optionsYesNo}
                                                inputProps={{
                                                  onChange: this.onChange,
                                                  disabled: detailValues && detailValues.grouped,
                                                  'data-test': 'add_inventory_doesExpire',
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                          <GridColumn width={5}>
                                            <DateInput
                                              label={
                                                <FormattedMessage
                                                  id='addInventory.offerExpirationDate'
                                                  defaultMessage='Offer Expiration Date'
                                                />
                                              }
                                              inputProps={{
                                                disabled:
                                                  !values.edit.doesExpire || (detailValues && detailValues.grouped),
                                                'data-test': 'modal_detail_expiration_date',
                                                fluid: true
                                                //! ! crashes on component calendar open if expirationDate is in past:
                                                // minDate: moment().add(1, 'days') TypeError: Cannot read property 'position' of undefined
                                              }}
                                              name='edit.expirationDate'
                                            />
                                          </GridColumn>
                                        </CustomGridRow>
                                        <CustomGridRow>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage id='addInventory.form' defaultMessage='Form'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <Dropdown
                                                name='edit.productForm'
                                                options={listForms}
                                                inputProps={{
                                                  onChange: this.onChange,
                                                  disabled: detailValues && detailValues.grouped,
                                                  'data-test': 'new_inventory_form_drpdn',
                                                  placeholder: (
                                                    <FormattedMessage
                                                      id='addInventory.selectForm'
                                                      defaultMessage='Select Form'
                                                    />
                                                  ),
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage id='addInventory.grades' defaultMessage='Grades'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <Dropdown
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
                                                  disabled: detailValues && detailValues.grouped,
                                                  selection: true,
                                                  multiple: true,
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                        </CustomGridRow>
                                        <CustomGridRow>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage id='global.lotNumber' defaultMessage='Lot Number'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <Input
                                                type='text'
                                                name='edit.lotNumber'
                                                inputProps={{
                                                  placeholder: '0',
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage
                                                id='addInventory.origin'
                                                defaultMessage='Country of Origin'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
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
                                                  disabled: detailValues && detailValues.grouped,
                                                  onSearchChange: debounce(
                                                    (e, { searchQuery }) => searchOrigins(searchQuery),
                                                    250
                                                  ),
                                                  placeholder: (
                                                    <FormattedMessage
                                                      id='addInventory.selectCountry'
                                                      defaultMessage='Select Country'
                                                    />
                                                  ),
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                        </CustomGridRow>
                                        <CustomGridRow>
                                          <GridColumn width={8}>
                                            <DateInput
                                              label={
                                                <FormattedMessage
                                                  id='global.lotExpiredDate'
                                                  defaultMessage='Lot Expired Date'>
                                                  {text => text}
                                                </FormattedMessage>
                                              }
                                              inputProps={{
                                                'data-test': 'modal_detail_lot_exp_date',
                                                disabled: detailValues && detailValues.grouped,
                                                fluid: true
                                              }}
                                              name='edit.lotExpirationDate'
                                            />
                                          </GridColumn>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <Dropdown
                                                name='edit.conforming'
                                                options={listConforming}
                                                inputProps={{
                                                  onChange: this.onChange,
                                                  disabled: detailValues && detailValues.grouped,
                                                  'data-test': 'new_inventory_conforming_drpdn',
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                        </CustomGridRow>
                                        <CustomGridRow>
                                          <GridColumn width={8}>
                                            <DateInput
                                              label={
                                                <FormattedMessage id='global.mfgDate' defaultMessage='Mfg Date'>
                                                  {text => text}
                                                </FormattedMessage>
                                              }
                                              inputProps={{
                                                'data-test': 'modal_detail_lot_mfg_date',
                                                disabled: detailValues && detailValues.grouped,
                                                maxDate: moment(),
                                                fluid: true
                                              }}
                                              name='edit.lotManufacturedDate'
                                            />
                                          </GridColumn>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
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
                                                  disabled: detailValues && detailValues.grouped,
                                                  placeholder: formatMessage({
                                                    id: 'addInventory.writeShortNotesHere',
                                                    defaultMessage: 'Write short notes here'
                                                  }),
                                                  fluid: true
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                        </CustomGridRow>

                                        <CustomGridRow>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage
                                                id='addInventory.externalNotes'
                                                defaultMessage='External Notes'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <TextAreaField
                                                name='edit.externalNotes'
                                                inputProps={{
                                                  disabled: detailValues && detailValues.grouped,
                                                  placeholder: formatMessage({
                                                    id: 'addInventory.writeExternalNotesHere',
                                                    defaultMessage: 'Write external notes here'
                                                  })
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                          <GridColumn width={8}>
                                            <FormField width={8}>
                                              <FormattedMessage
                                                id='addInventory.internalNotes'
                                                defaultMessage='Internal Notes'>
                                                {text => <label>{text}</label>}
                                              </FormattedMessage>
                                              <TextAreaField
                                                name='edit.internalNotes'
                                                inputProps={{
                                                  disabled: detailValues && detailValues.grouped,
                                                  placeholder: formatMessage({
                                                    id: 'addInventory.writeInternalNotesHere',
                                                    defaultMessage: 'Write internal notes here'
                                                  })
                                                }}
                                              />
                                            </FormField>
                                          </GridColumn>
                                        </CustomGridRow>
                                      </>
                                    ) : null}
                                  </Grid>
                                </Tab.Pane>
                              )
                            },
                            {
                              menuItem: (
                                <Menu.Item
                                  key='tds'
                                  disabled={detailValues && detailValues.grouped}
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
                                        console.error(e)
                                      })
                                  }}
                                  data-test='detail_inventory_tab_documents'>
                                  {formatMessage({ id: 'addInventory.tds', defaultMessage: 'TDS' })}
                                </Menu.Item>
                              ),
                              pane: (
                                <Tab.Pane key='tds' style={{ padding: '16px' }}>
                                  <Grid>
                                    <Grid.Row>
                                      <Grid.Column width={6}>
                                        <ModalTdsList
                                          open={openedTdsList}
                                          tdsTemplates={tdsTemplates}
                                          tdsTemplatesLoading={tdsTemplatesLoading}
                                          closeTdsModal={this.closeTdsModal}
                                          deleteTdsTemplate={this.props.deleteTdsTemplate}
                                          values={values}
                                          setValues={setValues}
                                          setFieldTouched={setFieldTouched}
                                        />
                                        <SelectTemplates
                                          onClick={() => {
                                            this.props.getTdsTemplates()
                                            this.setState({ openedTdsList: true })
                                          }}>
                                          <Folder />
                                          <FormattedMessage
                                            id='addInventory.selectFromTemplates'
                                            defaultMessage='Select From Templates'
                                          />
                                        </SelectTemplates>
                                      </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                      <Grid.Column width={4}>
                                        <FormattedMessage id='addInventory.property' defaultMessage='Property' />
                                      </Grid.Column>
                                      <Grid.Column width={6}>
                                        <FormattedMessage
                                          id='addInventory.specifications'
                                          defaultMessage='Specifications'
                                        />
                                      </Grid.Column>
                                      <Grid.Column width={4}>
                                        <FormattedMessage id='addInventory.testMethod' defaultMessage='Test Method' />
                                      </Grid.Column>
                                    </Grid.Row>
                                    <GridFields>
                                      <FieldArray
                                        name='edit.tdsFields'
                                        render={arrayHelpers => (
                                          <>
                                            {getSafe(() => values.edit.tdsFields.length, '')
                                              ? values.edit.tdsFields.map((property, index) => {
                                                  return (
                                                    <>
                                                      <GridRow>
                                                        <GridColumn width={4}>
                                                          <Input
                                                            type='text'
                                                            name={`edit.tdsFields[${index}].property`}
                                                            inputProps={{
                                                              placeholder: formatMessage({
                                                                id: 'addInventory.tdsFields.enterProperty',
                                                                defaultMessage: 'Enter Property'
                                                              })
                                                            }}
                                                          />
                                                        </GridColumn>
                                                        <GridColumn width={6}>
                                                          <Input
                                                            type='text'
                                                            name={`edit.tdsFields[${index}].specifications`}
                                                            inputProps={{
                                                              placeholder: formatMessage({
                                                                id: 'addInventory.tdsFields.enterSpecifications',
                                                                defaultMessage: 'Enter Specifications'
                                                              }),
                                                              fluid: true
                                                            }}
                                                          />
                                                        </GridColumn>
                                                        <GridColumn width={4}>
                                                          <Input
                                                            type='text'
                                                            name={`edit.tdsFields[${index}].testMethods`}
                                                            inputProps={{
                                                              placeholder: formatMessage({
                                                                id: 'addInventory.tdsFields.enterTestMethod',
                                                                defaultMessage: 'Enter Test Method'
                                                              }),
                                                              fluid: true
                                                            }}
                                                          />
                                                        </GridColumn>
                                                        <GridColumn
                                                          width={2}
                                                          verticalAlign='middle'
                                                          textAlign='center'
                                                          onClick={e => {
                                                            arrayHelpers.remove(index)
                                                            this.setState({ changedForm: true })
                                                          }}>
                                                          <IconTrash />
                                                        </GridColumn>
                                                      </GridRow>
                                                      {index === getSafe(() => values.edit.tdsFields.length, 0) - 1 ? (
                                                        <GridRow>
                                                          <GridColumn
                                                            width={2}
                                                            verticalAlign='middle'
                                                            textAlign='center'
                                                            onClick={e => {
                                                              arrayHelpers.push({ property: '', specifications: '' })
                                                              this.setState({ changedForm: true })
                                                            }}>
                                                            <DivAddInputTds>
                                                              <DivIconPlusCircle>
                                                                <IconPlusCircle />
                                                              </DivIconPlusCircle>
                                                            </DivAddInputTds>
                                                          </GridColumn>
                                                        </GridRow>
                                                      ) : null}
                                                    </>
                                                  )
                                                })
                                              : null}
                                          </>
                                        )}
                                      />
                                    </GridFields>
                                  </Grid>
                                </Tab.Pane>
                              )
                            },
                            {
                              menuItem: (
                                <Menu.Item
                                  key='documents'
                                  disabled={detailValues && detailValues.grouped}
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
                                        console.error(e)
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
                                    idForm={getSafe(() => detailValues.id, 0)}
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
                                  disabled={detailValues && detailValues.grouped}
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
                                        console.error(e)
                                      })
                                  }}
                                  data-test='detail_inventory_tab_priceBook'>
                                  {formatMessage({ id: 'addInventory.priceBook', defaultMessage: 'PRICE BOOK' })}
                                </Menu.Item>
                              ),
                              pane: (
                                <Tab.Pane
                                  loading={
                                    isLoadingBroadcast &&
                                    !loading &&
                                    !autocompleteDataLoading &&
                                    !searchedOriginsLoading
                                  }
                                  key='priceBook'
                                  style={{ padding: '18px' }}>
                                  <Broadcast
                                    isPrepared={!this.state.broadcastLoading}
                                    asModal={true}
                                    saveBroadcast={this.state.saveBroadcast}
                                    changedForm={this.changedForm}
                                    close={this.props.closeModalDetail}
                                    detailValues={detailValues}
                                    inventoryGrid={inventoryGrid}
                                  />
                                </Tab.Pane>
                              )
                            },
                            {
                              menuItem: (
                                <Menu.Item
                                  key='priceTiers'
                                  disabled={detailValues && detailValues.grouped}
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
                                        this.switchTab(4)
                                      })
                                      .catch(e => {
                                        console.error(e)
                                      })
                                  }}
                                  data-test='detail_inventory_tab_priceTiers'>
                                  {formatMessage({
                                    id: 'addInventory.priceTiersHeader',
                                    defaultMessage: 'PRICE TIERS'
                                  })}
                                </Menu.Item>
                              ),
                              pane: (
                                <Tab.Pane key='priceTiers' style={{ padding: '18px' }}>
                                  <Grid>
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
                                      <GridColumn>{this.renderPricingTiers(values.priceTiers.pricingTiers)}</GridColumn>
                                    </GridRow>
                                    <GridRow>
                                      <GridColumn verticalAlign='middle'>
                                        <DivButtonPlus
                                          onClick={() => {
                                            let pricingTiers = values.priceTiers.pricingTiers
                                            pricingTiers.push({ quantityFrom: '', price: '' })
                                            setFieldValue('priceTiers.pricingTiers', pricingTiers)
                                          }}>
                                          <Plus size='18' color='#20273a' />
                                        </DivButtonPlus>
                                      </GridColumn>
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
                  </FlexModalContent>
                  {this.state.activeTab !== 3 && (
                    <Modal.Actions>
                      <div>
                        <Button
                          size='large'
                          inputProps={{ type: 'button' }}
                          onClick={() => {
                            this.setState({ edited: false }, () =>
                              openGlobalAddForm ? openGlobalAddForm('') : this.props.closeModalDetail()
                            )
                          }}
                          data-test='modal_inventory_cancel'>
                          {Object.keys(touched).length || this.state.changedForm
                            ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                            : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                        </Button>
                        <Button
                          primary
                          size='large'
                          type='button'
                          onClick={() => {
                            this.setState({ openedTdsSaveAs: true })
                          }}
                          data-test='modal_inventory_save_as'>
                          {formatMessage({ id: 'global.saveAs', defaultMessage: 'Save as' })}
                        </Button>
                        <ModalTdsSaveAs
                          open={openedTdsSaveAs}
                          closeTdsModal={this.closeTdsModal}
                          saveTdsAsTemplate={this.props.saveTdsAsTemplate}
                          tdsFields={values.edit.tdsFields}
                        />
                        <Button
                          disabled={!(Object.keys(touched).length || this.state.changedForm)}
                          primary
                          size='large'
                          type='button'
                          onClick={() => {
                            // Dont validate if it is a broadcast tab
                            if (this.state.activeTab === 3) {
                              this.submitForm(values, setSubmitting, setTouched)
                              return true
                            }

                            return validateForm().then(async r => {
                              if (Object.keys(r).length && this.state.activeTab !== 2) {
                                this.switchToErrors(r)
                                submitForm() // to show errors
                              } else {
                                let { data } = await this.submitForm(values, setSubmitting, setTouched)
                                if (data && !getSafe(() => this.state.detailValues.id, false)) {
                                  confirm(
                                    formatMessage({
                                      id: 'confirm.editOrAddNew.header',
                                      defaultMessage: 'Edit or Add New'
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
                                        detailValues: { ...state.detailValues, id: null }
                                      }))
                                    })
                                    .catch(() => {
                                      this.setState(state => ({
                                        ...state,
                                        detailValues: { ...state.detailValues, id: data.id }
                                      }))
                                    })
                                }
                              }
                            })
                          }}
                          data-test='modal_inventory_save_new'>
                          {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                        </Button>
                      </div>
                    </Modal.Actions>
                  )}
                </FlexModal>
                <ErrorFocus />
              </Form>
            )
          }}
        </Formik>
      </>
    )
  }
}

const mapDispatchToProps = {
  modalDetailTrigger,
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
  closeModalDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer,
  getTemplates,
  saveTdsAsTemplate,
  getTdsTemplates,
  deleteTdsTemplate
}

const mapStateToProps = (
  {
    simpleAdd: {
      autocompleteData,
      autocompleteDataLoading,
      listConditions,
      listForms,
      listGrades,
      loading,
      modalActiveTab,
      isModalDetailOpen,
      detailValues,
      searchedManufacturers,
      searchedManufacturersLoading,
      searchedOrigins,
      searchedOriginsLoading,
      searchedProducts,
      searchedProductsLoading,
      warehousesList,
      listDocumentTypes,
      editProductOfferInitTrig,
      tdsTemplatesLoading,
      tdsTemplates
    },
    broadcast
  },
  { inventoryGrid }
) => ({
  autocompleteData,
  autocompleteDataLoading,
  listConditions,
  listForms,
  listGrades,
  loading,
  modalActiveTab,
  isModalDetailOpen,
  detailValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  searchedOrigins,
  searchedOriginsLoading,
  searchedProducts,
  searchedProductsLoading,
  warehousesList,
  listDocumentTypes,
  editProductOfferInitTrig,
  currencySymbol: '$',
  inventoryGrid,
  isLoadingBroadcast: getSafe(() => broadcast.loading, false),
  broadcastTemplates: getSafe(() => broadcast.templates, []),
  tdsTemplatesLoading,
  tdsTemplates
})

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(ModalDetail))))
