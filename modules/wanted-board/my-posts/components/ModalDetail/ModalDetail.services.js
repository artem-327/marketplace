import * as Yup from 'yup'
// Services
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { removeEmpty } from '../../../../../utils/functions'
import { getStringISODate } from '../../../../../components/date-format'

export const formValidation = Yup.object().shape({
  productName: Yup.string().required(errorMessages.requiredMessage),
  quantityNeeded: Yup.number().required(errorMessages.requiredMessage),
  weightUnitFilter: Yup.number().required(errorMessages.requiredMessage),
  deliveryCountry: Yup.string().required(errorMessages.requiredMessage),
  expiryDate: Yup.string().required(errorMessages.requiredMessage),
  conformingFilter: Yup.string().required(errorMessages.requiredMessage)
})

export const getInitialFormValues = popupValue => {
  return {
    productName: popupValue?.productName,
    quantityNeeded: popupValue?.rawData?.quantity,
    weightUnitFilter: popupValue?.rawData?.unit?.id,
    deliveryCountry: popupValue?.rawData?.deliveryCountry?.id ? JSON.stringify({countryId: popupValue?.rawData?.deliveryCountry?.id, hasProvinces: popupValue?.rawData?.deliveryCountry?.hasProvinces}) : null,
    statesFilter: popupValue?.rawData?.deliveryProvince?.id,
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
    "deliveryProvince": values.statesFilter,
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
      const data = await updateWantedBoard(popupValues.id, payload)
      datagrid.updateRow(popupValues.id, () => data.value)
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