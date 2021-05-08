 import * as val from 'yup'
 import { addressValidationSchema, errorMessages, einValidation, phoneValidation } from '../../constants/yupValidation'


export const SETTINGS = {
  COMPANY_SHARED_LISTING_DEFAULT_MARKUP: 'COMPANY_SHARED_LISTING_DEFAULT_MARKUP',
  EMPTY_SETTING: 'EMPTY_SETTING'
}

export const initConfirmPageValues = {
  address: {
    address: {
      city: '',
      country: '',
      province: '',
      streetAddress: '',
      zip: ''
    },
    callAhead: false,
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    deliveryNotes: '',
    forkLift: false,
    liftGate: false
  },
  companyAdminUser: {
    name: '',
    jobTitle: '',
    phone: '',
    email: ''
  },
  dba: '',
  dunsNumber: '',
  name: '',
  tin: ''
}

export const validationConfirmPageScheme = val.object().shape({
  address: val.object().shape({
    address: addressValidationSchema(),
    contactName: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    contactEmail: val
      .string(errorMessages.invalidEmail)
      .trim()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.requiredMessage),
    contactPhone: phoneValidation(10).required(errorMessages.requiredMessage)
  }),
  companyAdminUser: val.object().shape({
    name: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    jobTitle: val.string(),
    phone: phoneValidation(10),
    email: val
      .string(errorMessages.invalidEmail)
      .trim()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.requiredMessage)
  }),
  dba: val.string(),
  name: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
  tin: einValidation()
})

export const initLoginFormValues = {
  username: '',
  password: ''
}

export const validationLoginFormScheme = val.object().shape({
  username: val.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
  password: val
    .string()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage)
    .test('trailing-spaces', errorMessages.trailingSpaces, val => val && val.trim() === val)
})

export const resetLoginFormScheme = val.object().shape({
  username: val.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
})
