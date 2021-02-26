import * as Yup from 'yup'
//Services
import {
  addressValidationSchema,
  errorMessages,
  minOrZeroLength,
  validateTime,
  phoneValidation
} from '../../../../../../constants/yupValidation'
import { getSafe, removeEmpty } from '../../../../../../utils/functions'

const minLength = errorMessages.minLength(3)
/**
 * Form validation function.
 * @category Settings - Location - Warehouses
 * @method
 * @return {Object} Yup object with values from form.
 */
export const formValidation = () =>
  Yup.object().shape({
    deliveryAddress: Yup.object().shape({
      address: addressValidationSchema(),
      addressName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
      contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      readyTime: validateTime(),
      closeTime: validateTime()
    })
  })

/**
 * Get initial values for form.
 * @category Settings - Location - Warehouses
 * @method
 * @param {Object} sidebarValues Object values for form.
 * @return {Object} Initialized object with values for form.
 */
export const getInitialFormValues = sidebarValues => {
  const provinceId = getSafe(() => sidebarValues.deliveryAddress.address.province.id, '')
  const countryId = getSafe(() => sidebarValues.deliveryAddress.address.country.id, null)
  const hasProvinces = getSafe(() => sidebarValues.deliveryAddress.address.country.hasProvinces, false)
  const zip = getSafe(() => sidebarValues.deliveryAddress.address.zip.zip, '')
  const zipID = getSafe(() => sidebarValues.deliveryAddress.address.zip.id, '')

  const initialValues = {
    //name: r.name,
    taxId: getSafe(() => sidebarValues.taxId, ''),
    //warehouse: getSafe(() => sidebarValues.warehouse, false),
    deliveryAddress: {
      address: {
        streetAddress: getSafe(() => sidebarValues.deliveryAddress.address.streetAddress, ''),
        city: getSafe(() => sidebarValues.deliveryAddress.address.city, ''),
        province: provinceId,
        country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
        zip
      },
      readyTime: getSafe(() => sidebarValues.deliveryAddress.readyTime, ''),
      closeTime: getSafe(() => sidebarValues.deliveryAddress.closeTime, ''),
      liftGate: getSafe(() => sidebarValues.deliveryAddress.liftGate, false),
      forkLift: getSafe(() => sidebarValues.deliveryAddress.forkLift, false),
      callAhead: getSafe(() => sidebarValues.deliveryAddress.callAhead, false),
      deliveryNotes: getSafe(() => sidebarValues.deliveryAddress.deliveryNotes, ''),
      addressName: getSafe(() => sidebarValues.deliveryAddress.addressName, ''),
      contactName: getSafe(() => sidebarValues.deliveryAddress.contactName, ''),
      contactPhone: getSafe(() => sidebarValues.deliveryAddress.contactPhone, ''),
      contactEmail: getSafe(() => sidebarValues.deliveryAddress.contactEmail, '')
    },
    attachments: getSafe(() => sidebarValues.attachments, []),
    zipID,
    countryId,
    hasProvinces,
    branchId: getSafe(() => sidebarValues.id, ''),
    province: getSafe(() => sidebarValues.deliveryAddress.address.province, ''),
    alsoCreate: false
  }

  return initialValues
}

/**
 * Submit warehouse form.
 * @category Settings - Locations - Warehouses
 * @method
 * @param {Object} values Object values from warehouse form
 * @param {{sidebarValues: Object<string, any>,
 *    putEditWarehouse: Function,
 *    postNewWarehouseRequest: Function,
 *    openGlobalAddForm: Function,
 *    attachmentFiles: Array,
 *    setAttachmentFiles: Function,
 *    setSubmitting: Function,
 *    datagrid: Object}} helpers Object with sidebarValues and helper functions.
 */
export const submitHandler = async (values, helpers) => {
  const {
    sidebarValues,
    putEditWarehouse,
    postNewWarehouseRequest,
    openGlobalAddForm,
    attachmentFiles,
    setAttachmentFiles,
    setSubmitting,
    datagrid
  } = helpers
  let country = JSON.parse(values.deliveryAddress.address.country).countryId
  let requestData = {}

  requestData = {
    deliveryAddress: {
      ...values.deliveryAddress,
      readyTime:
        !values.deliveryAddress.readyTime || values.deliveryAddress.readyTime === ''
          ? null
          : values.deliveryAddress.readyTime,
      closeTime:
        !values.deliveryAddress.closeTime || values.deliveryAddress.closeTime === ''
          ? null
          : values.deliveryAddress.closeTime,
      address: {
        ...values.deliveryAddress.address,
        country
      }
    },
    taxId: values.taxId,
    warehouse: !values.alsoCreate
  }
  removeEmpty(requestData)

  try {
    if (sidebarValues) {
      await putEditWarehouse(requestData, sidebarValues.id, attachmentFiles, datagrid)
    } else {
      await postNewWarehouseRequest(true, requestData, attachmentFiles)
    }
    if (openGlobalAddForm) openGlobalAddForm('')
  } catch {
  } finally {
    setSubmitting(false)
    setAttachmentFiles([])
  }
}
