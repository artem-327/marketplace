import * as Yup from 'yup'
import { errorMessages, phoneValidation, addressValidationSchema } from '../../../../../../constants/yupValidation'

// Services
import { getSafe, removeEmpty } from '../../../../../../utils/functions'

// Constants
import { INIT_VALUES } from './WarehouseSidebar.constants'

/**
 * Validation of form.
 * @category Products - Add/Edit CAS Product
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    addressName: Yup.string()
      .trim()
      .min(2, errorMessages.minLength(1))
      .required(errorMessages.requiredMessage),
    address: addressValidationSchema(),
    contactName: Yup.string()
      .trim()
      .min(2, errorMessages.minLength(1))
      .required(errorMessages.requiredMessage),
    contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
    contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
  })

/**
 * @category Products - Add/Edit CAS Product
 * @param {Object<string, any>} values All values for form.
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = values => {
  const provinceId = getSafe(() => values.address.province.id, '')
  const countryId = getSafe(() => values.address.country.id, null)
  const hasProvinces = getSafe(() => values.address.country.hasProvinces, false)
  const zip = getSafe(() => values.address.zip.zip, '')

  return {
    ...INIT_VALUES,
    addressName: getSafe(() => values.addressName, ''),
    callAhead: getSafe(() => values.callAhead, false),
    closeTime: getSafe(() => values.closeTime, ''),
    contactEmail: getSafe(() => values.contactEmail, ''),
    contactName: getSafe(() => values.contactName, ''),
    contactPhone: getSafe(() => values.contactPhone, ''),
    deliveryNotes: getSafe(() => values.deliveryNotes, ''),
    forkLift: getSafe(() => values.forkLift, false),
    liftGate: getSafe(() => values.liftGate, false),
    readyTime: getSafe(() => values.readyTime, ''),
    address: {
      streetAddress: getSafe(() => values.address.streetAddress, ''),
      city: getSafe(() => values.address.city, ''),
      province: provinceId,
      country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
      zip
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
  const {
    customerIdName,
    popupValues,
    updateCustomerWarehouse,
    addCustomerWarehouse,
    chatWidgetVerticalMoved,
    closeSidebar,
    datagrid
  } = props

  let body = {
    ...values,
    address: {
      ...values.address,
      country: JSON.parse(values.address.country).countryId,
    }
  }
  removeEmpty(body)
  try {
    if (popupValues) {
      const { value } = await updateCustomerWarehouse(customerIdName.customerId, popupValues.id, body)
      //datagrid.updateRow(popupValues.id, () => value) // ! ! tohle nefunguje, musely by se prekopat data v rows
      datagrid.loadData()
    } else {
      const { value } = await addCustomerWarehouse(customerIdName.customerId, body)
      datagrid.loadData()
    }
    chatWidgetVerticalMoved(false)
    closeSidebar()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}