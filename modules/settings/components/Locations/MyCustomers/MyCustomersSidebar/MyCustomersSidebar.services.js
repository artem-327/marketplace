import * as Yup from 'yup'
//Services
import { addressValidationSchema, errorMessages, phoneValidation, validateTime } from '../../../../../../constants/yupValidation'
import { getSafe } from '../../../../../../utils/functions'
import { removeEmpty } from '../../../../../../utils/functions'

const minLength = errorMessages.minLength(3)
/**
 * Validation of form.
 * @category Settings - Location - Branches
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    name: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
    billToAddress: Yup.object().shape({
      address: addressValidationSchema(),
      addressName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
      contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      /*readyTime: validateTime(),
      closeTime: validateTime()*/
    })
  })

/**
 * @category Settings - Location - Branches
 * @param {Object<string, any>} sidebarValues All values for form.
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = sidebarValues => {
  const provinceId = getSafe(() => sidebarValues.address.province.id, '')
  const countryId = getSafe(() => sidebarValues.address.country.id, null)
  const hasProvinces = getSafe(() => sidebarValues.address.country.hasProvinces, false)
  const zip = getSafe(() => sidebarValues.address.zip.zip, '')
  const zipID = getSafe(() => sidebarValues.address.zip.id, '')

  const initialValues = {
    address: {
      streetAddress: getSafe(() => sidebarValues.address.streetAddress, ''),
      city: getSafe(() => sidebarValues.address.city, ''),
      province: provinceId,
      country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
      zip
    },
    addressName: getSafe(() => sidebarValues.addressName, ''),
    callAhead: getSafe(() => sidebarValues.callAhead, false),
    closeTime: getSafe(() => sidebarValues.closeTime, ''),
    contactEmail: getSafe(() => sidebarValues.contactEmail, ''),
    contactName: getSafe(() => sidebarValues.contactName, ''),
    contactPhone: getSafe(() => sidebarValues.contactPhone, ''),
    deliveryNotes: getSafe(() => sidebarValues.deliveryNotes, ''),
    forkLift: getSafe(() => sidebarValues.forkLift, false),
    liftGate: getSafe(() => sidebarValues.liftGate, false),
    readyTime: getSafe(() => sidebarValues.readyTime, ''),

    zipID,
    countryId,
    hasProvinces,
    province: getSafe(() => sidebarValues.address.province, '')
  }
  return initialValues
}

/**
 * Submit form and add or edit warehouse.
 * @category Settings - Locations - Branches
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {{setSubmitting: (isSubmitting: boolean) => void,
 * putEditWarehouse: (requestData: Object<string, any>, id: number) => void,
 * postNewWarehouseRequest: (isCreate: boolean, requestData: Object<string, any>) => void}} helperFunctions
 * @param {number} id
 */
export const submitHandler = async (values, actions, customerId) => {
  let customerData = {
    ...values,
    billToAddress: {
      ...values.billToAddress,
      address: {
        ...values.billToAddress.address,
        country: getSafe(() => JSON.parse(values.billToAddress.address.country).countryId, null),
        province: getSafe(() => values.billToAddress.address.province.provinceId, null)
      }
    },
    warehouseAddresses: values.warehouseAddresses ? values.warehouseAddresses.map(warAddr => ({
      ...warAddr,
      address: {
        ...warAddr.address,
        country: getSafe(() => JSON.parse(warAddr.address.country).countryId, null),
        province: getSafe(() => warAddr.address.province.provinceId, null)
      }
    })) : null
  }

  removeEmpty(customerData)

  if (customerId) {
    actions.editCustomer(customerId, customerData)
  } else {
    actions.addCustomer(customerData)
  }
}