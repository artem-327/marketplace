import * as Yup from 'yup'
//Services
import { addressValidationSchema, errorMessages, phoneValidation } from '../../../../../../constants/yupValidation'
import { getSafe } from '../../../../../../utils/functions'

const minLength = errorMessages.minLength(3)
/**
 * Validation of form.
 * @category Settings - Location - Branches
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    deliveryAddress: Yup.object().shape({
      address: addressValidationSchema(),
      addressName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
      contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
    })
  })

/**
 * @category Settings - Location - Branches
 * @template T
 * @param {Object<string, any>} sidebarValues All values for form.
 * @return {Object<string, any>} Initial object for form.
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
