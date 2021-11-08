import * as Yup from 'yup'
import moment from 'moment'
// Services
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { removeEmpty } from '../../../../../utils/functions'
import { getStringISODate } from '../../../../../components/date-format'

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
    maximumPricePerUOM: Yup.number(),
    assayMin: Yup.number(),
    assayMax: Yup.number()
})

export const getInitialFormValues = (popupValue, primaryBranch) => {
  return {
    productSearchPattern: popupValue?.productSearchPattern,
    quantity: popupValue?.rawData?.quantity,
    unit: popupValue?.rawData?.unit?.id,
    deliveryCountry: popupValue?.rawData?.deliveryCountry?.id
      ? JSON.stringify({countryId: popupValue?.rawData?.deliveryCountry?.id, hasProvinces: popupValue?.rawData?.deliveryCountry?.hasProvinces})
      : (primaryBranch ? JSON.stringify({countryId: primaryBranch.country.id, hasProvinces: primaryBranch.country.hasProvinces}) : ''),
    deliveryProvince: popupValue?.rawData?.deliveryCountry?.id
      ? (popupValue?.rawData?.deliveryCountry?.hasProvinces ? popupValue?.rawData?.deliveryProvince?.id : '')
      : (primaryBranch.country.hasProvinces ? primaryBranch.province.id : ''),
    neededAt: popupValue?.neededAt ? popupValue?.neededAt : '',
    specialNotes: popupValue?.rawData?.notes,
    gradeFilter: popupValue?.rawData?.grades?.length ? popupValue?.rawData?.grades.map(el => el.id) : [],
    packaingFilter: popupValue?.rawData?.packagingTypes?.length ? popupValue?.rawData?.packagingTypes.map(el => el.id) : [],
    conditionFilter: popupValue?.rawData?.condition?.length ? popupValue?.rawData?.condition.map(el => el.id) : [],
    originCountryFilter: popupValue?.rawData?.origins?.length ? popupValue?.rawData?.origins.map(el => el.id) : [],
    formFilter: popupValue?.rawData?.forms?.length ? popupValue?.rawData?.forms.map(el => el.id) : [],
    acceptEquivalents: popupValue?.rawData?.acceptEquivalents ? popupValue?.rawData?.acceptEquivalents : '',
    maximumPricePerUOM: popupValue?.rawData?.maximumPricePerUOM ? popupValue?.rawData?.maximumPricePerUOM : '',
    assayMin: popupValue?.rawData?.element?.assayMin ? popupValue?.rawData?.element.assayMin : '',
    assayMax: popupValue?.rawData?.element?.assayMax ? popupValue?.rawData?.element.assayMax : '',
    manufacturers: []// ! ! TODO ! !
  }
}

export const submitHandler = async (values, {setSubmitting}, props) => {
  let payload = {
    "deliveryCountry": values.deliveryCountry ? JSON.parse(values.deliveryCountry).countryId : '',
    "deliveryProvince": values.deliveryCountry && JSON.parse(values.deliveryCountry).hasProvinces ? values.deliveryProvince : null,
    "neededAt": values.neededAt ? getStringISODate(values.neededAt) : '',
    "notes": values.specialNotes,
    "origins": values.originCountryFilter ? values.originCountryFilter : [],
    "packagingTypes": values.packaingFilter ? values.packaingFilter : [],
    "productSearchPattern": values.productSearchPattern,
    "quantity": parseInt(values.quantity),
    "unit": values.unit,
    "forms": values.formFilter,
    "grades": values.gradeFilter,
    "conditions": values.conditionFilter,
    "maximumPricePerUOM": values.maximumPricePerUOM ? parseFloat(values.maximumPricePerUOM) : null,
    element: {
      "assayMin": values.assayMin !== '' ? parseFloat(values.assayMin) : null,
      "assayMax": values.assayMax !== '' ? parseFloat(values.assayMax) : null
    }
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