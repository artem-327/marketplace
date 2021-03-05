import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { errorMessages, websiteValidationNotRequired, phoneValidation } from '~/constants/yupValidation'

export const validationSchema = Yup.object().shape({
  name: Yup.string(<FormattedMessage id='validation.required' defaultMessage='Required' />)
    .trim()
    .min(2, <FormattedMessage id='validation.minLength' values={{ min: 2 }} />)
    .required(),
  website: websiteValidationNotRequired(),
  phone: phoneValidation(10),
  tinType: Yup.string().required(errorMessages.requiredMessage)
})
