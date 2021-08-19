import moment from 'moment'
import * as val from 'yup'
import { FormattedMessage } from 'react-intl'
import {
  Grid,
  GridRow,
  GridColumn,
  Label
} from 'semantic-ui-react'
import { Trash2 } from 'react-feather'
import _, { debounce } from 'lodash'
import { Input } from 'formik-semantic-ui-fixed-validation'
// Components
import { Required } from '../../../../../components/constants/layout'
// Services
import { getStringISODate, getLocaleDateFormat } from '../../../../../components/date-format'
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { getSafe } from '../../../../../utils/functions'
// Styles
import { PriceField } from '../../../../../styles/styledComponents'
import {
  InputWrapper,
  SmallGrid,
  InputLabeledWrapper,
} from '../../../styles'
import {
  DivLevel,
  DivTrash,
  PricingIcon,
} from './ModalDetail.styles'
// Constants
import { INDEX_TAB_PRICE_BOOK } from '../MyListings.constants'
import { INIT_VALUES } from './ModalDetail.constants'

/**
 * Validates divisibleBy in form
 * @category Inventory - My Listings
 * @method
 */
val.addMethod(val.number, 'divisibleBy', function (ref, message) {
  return this.test({
    name: 'divisibleBy',
    exclusive: false,
    message: message || '${path} must be divisible by ${reference}',
    params: {
      reference: ref.path
    },
    test: function (value) {
      const divisedBy = parseInt(this.resolve(ref))
      if (!divisedBy || isNaN(divisedBy)) return false

      return !(value % divisedBy)
    }
  })
})

/**
 * Validates uniqueProperty in form
 * @category Inventory - My Listings
 * @method
 */
val.addMethod(val.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('uniqueProperty', message, function (value) {
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

/**
 * Validates form inputs
 * @category Inventory - My Listings
 * @method
 */
export const validationScheme = val.lazy(values => {
  let minimumQuantity = getSafe(() => values.edit.minimum, 0) > 0 ? values.edit.minimum - 1 : 0
  if (values.edit.costPerUOM === '') values.edit.costPerUOM = null
  return val.object().shape({
    edit: val.object().shape({
      product: val.number().typeError(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
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
      lotNumber: val.string().typeError(errorMessages.invalidString).nullable(),
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
      leadTime: val.number().min(1, errorMessages.minimum(1)).typeError(errorMessages.mustBeNumber),
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
            manuallyModified: val.number().min(0).max(1)
          })
      )
    })
  })
})

/**
 * Gets all editable values for form
 * @category Inventory - My Listings
 * @method
 * @param {object} detailValues
 * @returns {object}
 */
const getEditValues = detailValues => {
  let tdsFields = null
  //Convert tdsFields string array of objects to array
  if (getSafe(() => detailValues.tdsFields, '')) {
    let newJson = detailValues.tdsFields.replace(/([a-zA-Z0-9]+?):/g, '"$1":')
    newJson = newJson.replace(/'/g, '"')
    tdsFields = JSON.parse(newJson)
  }

  return {
    edit: {
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
      tdsFields: getSafe(() => tdsFields, [{ property: '', specifications: '' }]),
      shared: getSafe(() => detailValues.shared, false),
      acceptBids: detailValues?.acceptBids ?? false
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

export const fetchIfNoData = (name, fn, props) => {
  if (props[name].length === 0) fn()
}

export const loadProductOffer = async (id, shouldSwitchTab, props, state, setState, formikPropsNew, resetFormNew) => {
  if(props.countriesDropdown.length === 0) await props.getCountries()
  const row = props.datagrid.rows.filter(row => row.id === id)
  const data = row[0]
  await props.getProductOffer(data)
  if (shouldSwitchTab) {
    switchTab(props, state, setState, props.modalActiveTab, data)
  }

  props.searchOrigins(
    props.countriesDropdown,
    getSafe(() => data.origin.name, ''),
    30
  )
  if (data.companyProduct) {
    searchProducts(data.companyProduct.intProductName, props)
  }
  setState(prevState => ({
    ...prevState,
    detailValues: data,
    initValues: { ...INIT_VALUES, ...getEditValues(data) }
  }))
  if(formikPropsNew) resetFormNew()
}

export const validateSaveOrSwitchToErrors = async (props, state, setState, formikPropsNew, callback = null) => {
  const { touched, validateForm, submitForm, values, setSubmitting, setTouched } = formikPropsNew

  //! !if (Object.keys(touched).length || state.edited && !state.saved) {
  if (state.edited) {
    // Form edited and not saved yet
    validateForm().then(err => {
      const errors = Object.keys(err)
      if (errors.length && errors[0] !== 'isCanceled') {
        // Edited, Errors found
        submitForm() // to show errors
        switchToErrors(props, state, setState, Object.keys(err))
        return
      } else {
        // Edited, Errors not found, try to save
        confirm(
          <FormattedMessage id='confirm.global.unsavedChanges.header' defaultMessage='Unsaved changes' />,
          <FormattedMessage
            id='confirm.global.unsavedChanges.content'
            defaultMessage='You have unsaved changes. Do you wish to save them?'
          />
        ).then(
            async () => {
              // Confirm
              if (await submitFormFunc(values, setSubmitting, setTouched, props, state, setState).sendSuccess) {
                if (callback) callback()
              }
            },
            () => {
              // Cancel
              if (callback) callback()
            }
          )
          .catch(() => {})
          .finally(() => setState({ ...state, edited: false }))
        return
      }
    })
  } else {
    // Form not modified
    if (callback) callback()
  }
}

export const changedForm = (isChanged, state, setState) => {
  setState({ ...state, changedForm: isChanged })
}

const handleQuantities = (setFieldValue, values, splits, quantity = 0) => {
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

export const onSplitsChange = debounce(async (value, values, setFieldValue, validateForm) => {
  value = parseInt(value)
  const minimum = parseInt(values.edit.minimum)

  handleQuantities(setFieldValue, values, value)

  if (isNaN(value) || isNaN(minimum)) return false

  if (minimum !== value && minimum % value !== 0) {
    await setFieldValue('edit.minimum', value)
  }

  validateForm()
}, 250)

export const renderPricingTiers = (props, state, setState, formikPropsNew, pricingTiers) => {
  if (!pricingTiers || !getSafe(() => pricingTiers.length, '')) return
  let tiers = []

  if(formikPropsNew) {
    const { setFieldValue, values } = formikPropsNew
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
            {inputWrapper(
              `priceTiers.pricingTiers[${i}].price`,
              {
                type: 'number',
                step: '0.001',
                min: 0.001,
                value: null,
                placeholder: '0.000'
              },
              null,
              props.currencySymbol
            )}
          </GridColumn>
          <GridColumn computer={1} textAlign='center'>
            {i > 0 ? (
              <DivTrash
                onClick={() => {
                  let pricingTiers = values.priceTiers.pricingTiers.slice()
                  pricingTiers.splice(i, 1)
                  setFieldValue('priceTiers.pricingTiers', pricingTiers)
                  setState({...state, changedForm : true})
                }}>
                <Trash2 color='#f16844' />
              </DivTrash>
            ) : null}
          </GridColumn>
          <GridColumn computer={1}></GridColumn>
        </GridRow>
      )
    }
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

export const searchProducts = debounce((text, props) => {
  props.getAutocompleteData({
    searchUrl: `/prodex/api/company-products/own/search?pattern=${encodeURIComponent(text)}&onlyMapped=false`
  })
}, 250)

export const submitFormFunc = async (values, setSubmitting, setTouched, props, state, setState) => {
  const { addProductOffer, datagrid } = props
  const { detailValues, attachmentFiles } = state
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

  await new Promise(resolve => {
    setState({ ...state, edited: false })
    resolve()
  })

  setSubmitting(false)
  let obj = {}
  switch (state.activeTab) {
    case 0:
    case 1:
    case 2:
    case 4:
      obj = {
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
      setTouched({})
      setState(prevState => ({ ...prevState, saveBroadcast: state.saveBroadcast + 1, changedForm: false, edited: false }))
      break
  }

  if (Object.keys(obj).length) {
    try {
      const { value } = await addProductOffer(obj, isEdit, false, isGrouped, attachmentFiles)
      data = value
      if (isEdit) {
        datagrid.updateRow(data.id, () => data)
      } else {
        datagrid.loadData()
      }

      setState({
        ...state,
        detailValues: { ...data, id: isEdit ? data.id : null },
        initValues: { ...INIT_VALUES, ...getEditValues(data) },
        changedForm: false,
        attachmentFiles: [],
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
            let po = await addProductOffer(obj, entityId, false, isGrouped, attachmentFiles)
            datagrid.updateRow(entityId, () => po.value)
            setState({
              ...state,
              detailValues: po.value,
              initValues: { ...INIT_VALUES, ...getEditValues(po.value) },
              changedForm: false,
              attachmentFiles: [],
              edited: false
            })
            sendSuccess = true
          })
          .catch(_)
      }
    } finally {
      setTouched({})
    }
  }

  return { sendSuccess, data }
}

export const switchTab = async (props, state, setState, newTab, data = null) => {
  setState(prevState => ({
    ...prevState,
    activeTab: newTab
  }))
  try {
    if (newTab === INDEX_TAB_PRICE_BOOK) {
      await props.openBroadcast(data ? data : state.detailValues, props.settings).then(async () => {
        setState(prevState => ({ ...prevState, broadcastLoading: false, activeTab: newTab }))
      })
    }
  } catch (err) {
    console.error(err)
  }
}

export const switchToErrors = (props, state, setState, errors) => {
  const tabs = Object.keys(errors)

  // switch tab only if there is no error on active tab
  if (tabs.includes(state.tabs[state.activeTab])) {
    switch (tabs[0]) {
      case 'priceTiers':
        switchTab(props, state, setState, 4)
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

export const handleChangeProduct = (value, setFieldValue, props, state, setState) => {
  if (!value) return
  const { autocompleteData } = props
  if (getSafe(() => autocompleteData.length, false)) {
    const companyProduct = autocompleteData.find(product => product.id === value)
    if (getSafe(() => companyProduct.palletMinPkgs, false))
      setFieldValue('edit.minimum', companyProduct.palletMinPkgs)
  }
  setState({ ...state, edited: true })
}

export const onChange = debounce((state, setState) => setState({ ...state, edited: true }), 200)

export const inputWrapper = (name, inputProps, label, labelText) => {
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

export const inputLabeledWrapper = (name, inputProps, label) => {
  return (
    <InputLabeledWrapper>
      {label && <div className='field-label'>{label}</div>}
      <Input inputProps={inputProps} name={name} />
    </InputLabeledWrapper>
  )
}

export const closeTdsModal = (state, setState) => {
  setState({ ...state, openedTdsList: false, openedTdsSaveAs: false })
}
