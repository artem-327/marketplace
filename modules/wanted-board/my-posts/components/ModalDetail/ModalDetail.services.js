import * as Yup from 'yup'
// Services
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { removeEmpty } from '../../../../../utils/functions'
import { getStringISODate } from '../../../../../components/date-format'

/**
 * Validation of form.
 * @category Products - Add/Edit CAS Product
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    productName: Yup.string().required(errorMessages.requiredMessage),
    quantityNeeded: Yup.number().required(errorMessages.requiredMessage),
    weightUnitFilter: Yup.number().required(errorMessages.requiredMessage),
    statesFilter: Yup.number(),
    conformingFilter: Yup.string(),
  })

/**
 * @category Products - Add/Edit CAS Product
 * @param {Object<string, any>} sidebarValues All values for form.
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = popupValue => {
  if(popupValue) {
    return {
      productName: popupValue?.productName,
      quantityNeeded: popupValue?.quantity,
      weightUnitFilter: popupValue?.rawData?.unit?.id,
      deliveryCountry: JSON.stringify({countryId: popupValue?.rawData?.deliveryCountry?.id, hasProvinces: popupValue?.rawData?.deliveryCountry?.hasProvinces}),
      statesFilter: popupValue?.rawData?.deliveryProvince?.id,
      expiryDate: popupValue?.postExpiry,
      conformingFilter: popupValue?.conforming,
      specialNotes: popupValue?.rawData?.notes,
      gradeFilter: popupValue?.rawData?.grades?.length ? popupValue?.rawData?.grades[0].id : null,
      packaingFilter: popupValue?.rawData?.packagingTypes?.length ? popupValue?.rawData?.packagingTypes[0].id : null,
      conditionFilter: popupValue?.rawData?.conditions?.length ? popupValue?.rawData?.conditions[0].id : null,
      originCountryFilter: popupValue?.rawData?.origins?.length ? popupValue?.rawData?.origins[0].id : null,
      formFilter: popupValue?.rawData?.forms?.length ? popupValue?.rawData?.forms[0].id : null,
    }
  }
  
}

/**
 * Submit form and add or edit warehouse.
 * @category Products - Add/Edit CAS Product
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {Object<any>} props Input props (popupValues, updateCasProductRequest, postNewCasProductRequest, datagrid).
 * @param {number} id
 */
export const submitHandler = async (values, {setSubmitting}, props) => {
  const sendData = {
    "conditionConforming": values.conformingFilter == 'Yes' ? true : false,
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
    // "manufacturers": [0],
    // "maximumPricePerUOM": 0,
    // "neededAt": "2021-09-14T12:56:38.558Z"
  }

  const { popupValues, updateWantedBoard, postNewWantedBoard, datagrid } = props
  try {
    let payload = { ...sendData }

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