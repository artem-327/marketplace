import * as Yup from 'yup'
import moment from 'moment'
// Services
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { removeEmpty } from '../../../../../utils/functions'
import { getStringISODate } from '../../../../../components/date-format'

export const formValidation = (provinceRequired) =>
  Yup.object().shape({
  productName: Yup.string().required(errorMessages.requiredMessage),
  quantityNeeded: Yup.number().required(errorMessages.requiredMessage),
  weightUnitFilter: Yup.number().required(errorMessages.requiredMessage),
  deliveryCountry: Yup.string().required(errorMessages.requiredMessage),
  ...(provinceRequired && { statesFilter: Yup.string().required(errorMessages.requiredMessage)}),
  neededAt: dateValidation(true).concat(
    Yup.string().test(
      'min-date',
      errorMessages.mustBeInFuture,
      val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
    )
  ),
  maximumPricePerUOM: Yup.number(),
  assayMin: Yup.number(),
  assayMax: Yup.number()
})

export const getInitialFormValues = popupValue => {
  return {
    productName: popupValue?.productName,
    quantityNeeded: popupValue?.rawData?.quantity,
    weightUnitFilter: popupValue?.rawData?.unit?.id,
    deliveryCountry: popupValue?.rawData?.deliveryCountry?.id ? JSON.stringify({countryId: popupValue?.rawData?.deliveryCountry?.id, hasProvinces: popupValue?.rawData?.deliveryCountry?.hasProvinces}) : '',
    statesFilter: popupValue?.rawData?.deliveryCountry?.hasProvinces ? popupValue?.rawData?.deliveryProvince?.id : '',
    neededAt: popupValue?.neededAt,
    specialNotes: popupValue?.rawData?.notes,
    gradeFilter: popupValue?.rawData?.grades?.length ? popupValue?.rawData?.grades.map(el => el.id) : [],
    packaingFilter: popupValue?.rawData?.packagingTypes?.length ? popupValue?.rawData?.packagingTypes[0].id : null,
    conditionFilter: popupValue?.rawData?.condition?.length ? popupValue?.rawData?.condition.map(el => el.id) : [],
    originCountryFilter: popupValue?.rawData?.origins?.length ? popupValue?.rawData?.origins[0].id : null,
    formFilter: popupValue?.rawData?.forms?.length ? popupValue?.rawData?.forms.map(el => el.id) : [],
    willAcceptEquivalents: popupValue?.rawData?.willAcceptEquivalents ? popupValue?.rawData?.willAcceptEquivalents : '', // ! ! TBD
    maximumPricePerUOM: popupValue?.rawData?.maximumPricePerUOM ? popupValue?.rawData?.maximumPricePerUOM : '',
    assayMin: popupValue?.rawData?.element?.assayMin ? popupValue?.rawData?.element.assayMin : '',
    assayMax: popupValue?.rawData?.element?.assayMax ? popupValue?.rawData?.element.assayMax : ''
  }
}

export const submitHandler = async (values, {setSubmitting}, props) => {
  let payload = {
    "deliveryCountry": values.deliveryCountry ? JSON.parse(values.deliveryCountry).countryId : '',
    "deliveryProvince": values.deliveryCountry && JSON.parse(values.deliveryCountry).hasProvinces ? values.statesFilter : null,
    "neededAt": values.neededAt ? getStringISODate(values.neededAt) : '',
    "notes": values.specialNotes,
    "origins": values.originCountryFilter ? [values.originCountryFilter] : [],
    "packagingTypes": values.packaingFilter ? [values.packaingFilter] : [],
    "productSearchPattern": values.productName,
    "quantity": values.quantityNeeded,
    "unit": values.weightUnitFilter,
    "forms": values.formFilter,
    "grades": values.gradeFilter,
    "condition": values.conditionFilter,
    "maximumPricePerUOM": values.maximumPricePerUOM,
    "assayMin": values.assayMin,
    "assayMax": values.assayMax,
    // "manufacturers": [0],
    // "maximumPricePerUOM": 0,
    // "neededAt": "2021-09-14T12:56:38.558Z"
  }

  const { popupValues, updateWantedBoard, postNewWantedBoard, datagrid } = props
  try {
    removeEmpty(payload)

    if (popupValues) {
      await updateWantedBoard(popupValues.id, payload)
      datagrid.loadData()
    } else {
      await postNewWantedBoard(payload)
      datagrid.loadData()
    }
    props.closeAddEditPopup()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}