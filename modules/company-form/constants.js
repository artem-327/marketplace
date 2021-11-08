import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { errorMessages, websiteValidationNotRequired, phoneValidation } from '~/constants/yupValidation'

export const validationSchema = Yup.object().shape({
  name: Yup.string(<FormattedMessage id='validation.required' defaultMessage='Required' />)
    .trim()
    .min(3, errorMessages.minLength(3))
    .max(200, errorMessages.maxLength(200))
    .required(),
  website: websiteValidationNotRequired(),
  phone: phoneValidation(10),
  tinType: Yup.string()
    .when('tin', {
      is: value => !!value,
      then: Yup.string().required(errorMessages.requiredMessage),
      otherwise: Yup.string()
    })
})
