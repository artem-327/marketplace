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
    .min(2, <FormattedMessage id='validation.minLength' values={{ min: 2 }} />)
    .required(),
  website: websiteValidationNotRequired(),
  socialLinkedin: websiteValidationNotRequired(),
  socialFacebook: websiteValidationNotRequired(),
  socialTwitter: tagValidate(),
  socialInstagram: tagValidate(),
  phone: phoneValidation(10),
  address: addressValidationSchema(),
  email: Yup.string().trim().email(errorMessages.invalidEmail)
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