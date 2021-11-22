import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import {
  errorMessages,
  websiteValidationNotRequired,
  phoneValidation,
  addressValidationSchema,
  tagValidate
} from '~/constants/yupValidation'

export const validationSchema = Yup.object().shape({
  name: Yup.string(<FormattedMessage id='validation.required' defaultMessage='Required' />)
    .trim()
    .min(3, errorMessages.minLength(3))
    .max(200, errorMessages.maxLength(200))
    .required(),
  website: websiteValidationNotRequired(),
  socialLinkedin: websiteValidationNotRequired(),
  socialFacebook: websiteValidationNotRequired(),
  socialTwitter: tagValidate(),
  socialInstagram: tagValidate(),
  phone: phoneValidation(10),
  address: addressValidationSchema(),
  email: Yup.string().trim().email(errorMessages.invalidEmail).required(),
  tagline: Yup.string().trim().max(100, errorMessages.maxLength(100))
})

export const removeFile = async (fileId, reloadDocuments, props) => {
  try {
    await props.removeAttachment(fileId)
    reloadDocuments()
  } catch (e) {
    console.error(e)
  }
}

export const updateFilesList = reloadDocuments => {
  try {
    reloadDocuments()
  } catch (e) {
    console.error(e)
  }
}