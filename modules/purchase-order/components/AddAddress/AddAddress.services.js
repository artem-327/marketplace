import * as Yup from 'yup'
import { addressValidationSchema, errorMessages, phoneValidation } from '~/constants/yupValidation'
import { removeEmpty, getSafe } from '~/utils/functions'

export const getValidationScheme = Yup.lazy(values => {
  return Yup.object().shape({
    contactName: Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage),
    addressName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
    contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
    address: addressValidationSchema()
  })
})

export const getInitValues = values => {
  const address = values.fullAddress.address

  return {
    ...values.fullAddress,
    taxId: values.taxId,
    addressName: values.name,
    address: {
      ...address,
      country: JSON.stringify({ countryId: address.country.id, hasProvinces: address.country.hasProvinces }),
      zip: address.zip.zip,
      province: getSafe(() => address.province.id)
    }
  }
}
/**
 * @category Purchase Order - Checkout
 * @method
 * @param {Object} props
 * @param {Object} formikProps
 */
export const handleSubmit = async (props, formikProps) => {
  const { onClose, onUpdateAddress, isWarehouse, popupValues } = props
  const { values } = formikProps

  let payload = {}
  if (getSafe(() => values.address.id, false)) delete values.address.id
  if (getSafe(() => values.id, false)) delete values.id
  if (getSafe(() => values.cfName, false)) delete values.cfName
  if (getSafe(() => values.messages, false)) delete values.messages

  try {
    if (isWarehouse) {
      payload = {
        deliveryAddress: {
          ...values,
          contactEmail: values.contactEmail.trim(),
          address: {
            ...values.address,
            country: JSON.parse(values.address.country).countryId
          }
        },
        taxId: values.taxId,
        warehouse: true
      }
      if (getSafe(() => payload.deliveryAddress.warehouse, false)) delete payload.deliveryAddress.warehouse
      if (getSafe(() => payload.deliveryAddress.taxId, false)) delete payload.deliveryAddress.taxId
    } else {
      payload = {
        ...values,
        contactEmail: values.contactEmail.trim(),
        address: {
          ...values.address,
          country: JSON.parse(values.address.country).countryId
        }
      }
    }
    removeEmpty(payload)

    let response
    if (isWarehouse) {
      if (popupValues) {
        response = await props.updateWarehouse(payload, popupValues.id)
      } else {
        response = await props.postNewWarehouse(true, payload)
      }
    } else {
      if (popupValues) {
        response = await props.updateDeliveryAddress(payload, popupValues.id)
      } else {
        response = await props.postNewDeliveryAddress(payload)
      }
    }

    if (response.value) {
      onUpdateAddress(response.value)
      onClose()
    }
  } catch (e) {
    console.error(e)
  } finally {
    formikProps.setSubmitting(false)
  }
}
