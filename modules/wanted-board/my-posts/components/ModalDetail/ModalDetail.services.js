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
  expiryDate: dateValidation(true).concat(
    Yup.string().test(
      'min-date',
      errorMessages.mustBeInFuture,
      val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
    )
  ),
  conformingFilter: Yup.string().required(errorMessages.requiredMessage)
})

export const getInitialFormValues = (popupValue, primaryBranch) => {
  return {
    productName: popupValue?.productName,
    quantityNeeded: popupValue?.rawData?.quantity,
    weightUnitFilter: popupValue?.rawData?.unit?.id,
    deliveryCountry: popupValue?.rawData?.deliveryCountry?.id
      ? JSON.stringify({countryId: popupValue?.rawData?.deliveryCountry?.id, hasProvinces: popupValue?.rawData?.deliveryCountry?.hasProvinces})
      : (primaryBranch ? JSON.stringify({countryId: primaryBranch.country.id, hasProvinces: primaryBranch.country.hasProvinces}) : ''),
    statesFilter: popupValue?.rawData?.deliveryCountry?.hasProvinces
      ? popupValue?.rawData?.deliveryProvince?.id
      : (primaryBranch.country.hasProvinces ? primaryBranch.province.id : ''),
    expiryDate: popupValue?.postExpiry,
    conformingFilter: popupValue?.conforming,
    specialNotes: popupValue?.rawData?.notes,
    gradeFilter: popupValue?.rawData?.grades?.length ? popupValue?.rawData?.grades[0].id : null,
    packaingFilter: popupValue?.rawData?.packagingTypes?.length ? popupValue?.rawData?.packagingTypes[0].id : null,
    conditionFilter: popupValue?.rawData?.condition?.id,
    originCountryFilter: popupValue?.rawData?.origins?.length ? popupValue?.rawData?.origins[0].id : null,
    formFilter: popupValue?.rawData?.forms?.length ? popupValue?.rawData?.forms[0].id : null,
  }
}

export const submitHandler = async (values, {setSubmitting}, props) => {
  let payload = {
    "conforming": values.conformingFilter == 'Yes' ? true : false,
    "deliveryCountry": values.deliveryCountry ? JSON.parse(values.deliveryCountry).countryId : '',
    "deliveryProvince": values.deliveryCountry && JSON.parse(values.deliveryCountry).hasProvinces ? values.statesFilter : null,
    "expiresAt": values.expiryDate ? getStringISODate(values.expiryDate) : '',
    "notes": values.specialNotes,
    "origins": values.originCountryFilter ? [values.originCountryFilter] : [],
    "packagingTypes": values.packaingFilter ? [values.packaingFilter] : [],
    "productSearchPattern": values.productName,
    "quantity": values.quantityNeeded,
    "unit": values.weightUnitFilter,
    "forms": values.formFilter ? [values.formFilter] : [],
    "grades": values.gradeFilter ? [values.gradeFilter] : [],
    "condition": values.conditionFilter,
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