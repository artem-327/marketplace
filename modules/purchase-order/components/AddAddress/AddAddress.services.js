import * as Yup from 'yup'
import { addressValidationSchema, errorMessages, phoneValidation } from '~/constants/yupValidation'


export const getValidationScheme = Yup.lazy(values => {
  return Yup.object().shape({
    contactName: Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage),
    addressName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    //lastName: Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage),
    contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
    contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
    address: addressValidationSchema()
  })
})