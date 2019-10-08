import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { errorMessages, validURL } from '~/constants/yupValidation'

export const validationSchema = Yup.object().shape({
  name: Yup
    .string(<FormattedMessage id='validation.required' defaultMessage='Required' />)
    .trim()
    .min(2, <FormattedMessage id='validation.minLength' values={{ min: 2 }} />)
    .required(),
  website: Yup.string().trim().test('website', errorMessages.invalidWebsite, (val) => val ? validURL(val) : true)
})