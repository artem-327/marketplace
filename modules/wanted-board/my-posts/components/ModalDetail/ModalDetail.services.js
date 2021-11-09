import * as Yup from 'yup'
import moment from 'moment'
// Services
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { removeEmpty } from '../../../../../utils/functions'
import { getStringISODate, getLocaleDateFormat } from '../../../../../components/date-format'

export const formValidation = (provinceRequired) =>
  Yup.object().shape({
    productSearchPattern: Yup.string().required(errorMessages.requiredMessage),
    quantity: Yup.number().required(errorMessages.requiredMessage),
    unit: Yup.number().required(errorMessages.requiredMessage),
    deliveryCountry: Yup.string().required(errorMessages.requiredMessage),
    ...(provinceRequired && { deliveryProvince: Yup.string().required(errorMessages.requiredMessage)}),
    neededAt: dateValidation(false).concat(
      Yup.string().test(
        'min-date',
        errorMessages.mustBeInFuture,
        val => !val || moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
      )
    ),
    maximumPricePerUOM: Yup.number().positive(errorMessages.positive),
    /* Temporary disabled - https://bluepallet.atlassian.net/browse/DT-1196
    assayMin: Yup.string()
      .test('v', errorMessages.minUpToMax, function (v) {
        const { assayMax: v2 } = this.parent
        if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
        if (v2 === null || v2 === '' || isNaN(v2)) return true // No max limit value - can not be tested
        return Number(v) <= v2
      })
      .test('v', errorMessages.minimum(0), function (v) {
        if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
        return Number(v) >= 0
      })
      .test('v', errorMessages.maximum(100), function (v) {
        if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
        return Number(v) <= 100
      })
      .test('v', errorMessages.mustBeNumber, function (v) {
        return v === null || v === '' || !isNaN(v)
      }),
    assayMax: Yup.string()
      .test('v', errorMessages.maxAtLeastMin, function (v) {
        const { assayMin: v2 } = this.parent
        if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
        if (v2 === null || v2 === '' || isNaN(v2)) return true // No min limit value - can not be tested
        return Number(v) >= v2
      })
      .test('v', errorMessages.minimum(0), function (v) {
        if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
        return Number(v) >= 0
      })
      .test('v', errorMessages.maximum(100), function (v) {
        if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
        return Number(v) <= 100
      })
      .test('v', errorMessages.mustBeNumber, function (v) {
        return v === null || v === '' || !isNaN(v)
      })
    */
})

export const getInitialFormValues = (popupValue, primaryBranch) => {
  return {
    productSearchPattern: popupValue?.rawData?.productSearchPattern,
    quantity: popupValue?.rawData?.quantity,
    unit: popupValue?.rawData?.unit?.id,
    deliveryCountry: popupValue?.rawData?.deliveryCountry?.id
      ? JSON.stringify({countryId: popupValue?.rawData?.deliveryCountry?.id, hasProvinces: popupValue?.rawData?.deliveryCountry?.hasProvinces})
      : (primaryBranch ? JSON.stringify({countryId: primaryBranch.country.id, hasProvinces: primaryBranch.country.hasProvinces}) : ''),
    deliveryProvince: popupValue?.rawData?.deliveryCountry?.id
      ? (popupValue?.rawData?.deliveryCountry?.hasProvinces ? popupValue?.rawData?.deliveryProvince?.id : '')
      : (primaryBranch.country.hasProvinces ? primaryBranch.province.id : ''),
    neededAt: popupValue?.rawData?.expiresAt ? moment(popupValue?.rawData?.expiresAt).format(getLocaleDateFormat()) : '', // ! ! TODO should be neededAt not expiresAt
    specialNotes: popupValue?.rawData?.notes,
    gradeFilter: popupValue?.rawData?.grades?.length ? popupValue?.rawData?.grades.map(el => el.id) : [],
    packaingFilter: popupValue?.rawData?.packagingTypes?.length ? popupValue?.rawData?.packagingTypes.map(el => el.id) : [],
    conditionFilter: popupValue?.rawData?.conditions?.length ? popupValue?.rawData?.conditions.map(el => el.id) : [],
    originCountryFilter: popupValue?.rawData?.origins?.length ? popupValue?.rawData?.origins.map(el => el.id) : [],
    formFilter: popupValue?.rawData?.forms?.length ? popupValue?.rawData?.forms.map(el => el.id) : [],
    acceptEquivalents: popupValue?.rawData?.acceptEquivalents ? popupValue?.rawData?.acceptEquivalents : '',
    maximumPricePerUOM: popupValue?.rawData?.maximumPricePerUOM ? popupValue?.rawData?.maximumPricePerUOM : '',
    /* Temporary disabled - https://bluepallet.atlassian.net/browse/DT-1196
    assayMin: popupValue?.rawData?.element?.assayMin ? popupValue?.rawData?.element.assayMin : '',
    assayMax: popupValue?.rawData?.element?.assayMax ? popupValue?.rawData?.element.assayMax : '',
    */
    manufacturers: popupValue?.rawData?.manufacturers?.length ? popupValue?.rawData?.manufacturers.map(el => el.id) : []
  }
}

export const submitHandler = async (values, {setSubmitting}, props) => {
  let payload = {
    "deliveryCountry": values.deliveryCountry ? JSON.parse(values.deliveryCountry).countryId : '',
    "deliveryProvince": values.deliveryCountry && JSON.parse(values.deliveryCountry).hasProvinces ? values.deliveryProvince : null,
    "expiresAt": values.neededAt ? getStringISODate(values.neededAt) : '', // ! ! TODO "expiresAt" ??
    "notes": values.specialNotes,
    "origins": values.originCountryFilter ? values.originCountryFilter : null,
    "packagingTypes": values.packaingFilter ? values.packaingFilter : null,
    "productSearchPattern": values.productSearchPattern,
    "quantity": parseInt(values.quantity),
    "unit": values.unit,
    "forms": values.formFilter ? values.formFilter : null,
    "grades": values.gradeFilter ? values.gradeFilter : null,
    "conditions": values.conditionFilter ? values.conditionFilter : null,
    "maximumPricePerUOM": values.maximumPricePerUOM ? parseFloat(values.maximumPricePerUOM) : null,
    "acceptEquivalents": values.acceptEquivalents,
    "manufacturers": values.manufacturers ? values.manufacturers : null,
    /* Temporary disabled - https://bluepallet.atlassian.net/browse/DT-1196
    element: {
      "assayMin": values.assayMin !== '' ? parseFloat(values.assayMin) : null,
      "assayMax": values.assayMax !== '' ? parseFloat(values.assayMax) : null
    }
    */
  }

  const { popupValues, updateWantedBoard, postNewWantedBoard, datagrid, openGlobalAddForm } = props
  try {
    removeEmpty(payload)

    if (popupValues) {
      await updateWantedBoard(popupValues.id, payload)
      !openGlobalAddForm && datagrid.loadData()
    } else {
      await postNewWantedBoard(payload)
      !openGlobalAddForm && datagrid.loadData()
    }
    if (openGlobalAddForm) {
      openGlobalAddForm('')
    } else {
      props.closeAddEditPopup()
    }
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}