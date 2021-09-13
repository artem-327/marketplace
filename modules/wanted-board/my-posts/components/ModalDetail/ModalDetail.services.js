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
    deliveryContry: Yup.object().required(errorMessages.requiredMessage),
    statesFilter: Yup.number().required(errorMessages.requiredMessage),
    expiryDate: dateValidation(false),
    conformingFilter: Yup.string().required(errorMessages.requiredMessage),
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
      deliveryContry: popupValue?.rawData?.deliveryCountry?.id,
      statesFilter: popupValue?.rawData?.deliveryProvince?.id,
      expiryDate: popupValue?.postExpiry,
      conformingFilter: popupValue?.conforming,
      specialNotes: popupValue?.rawData.notes
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
export const submitHandler = async (values, { setSubmitting }, props) => {
  const sendData = {
    "conditionConforming": values.conformingFilter == 'Yes' ? true : false,
    "deliveryCountry": JSON.parse(values.deliveryContry).countryId,
    "deliveryProvince": values.statesFilter,
    "expiresAt": getStringISODate(values.expiryDate),
    "maximumPricePerUOM": 5,
    "notes": values.specialNotes,
    "origins": values.originCountryFilter ? [JSON.parse(values.originCountryFilter).countryId] : [],
    "packagingTypes": values.packaingFilter ? [values.packaingFilter] : [],
    "productSearchPattern": values.productName,
    "quantity": values.quantityNeeded,
    "unit": values.weightUnitFilter
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