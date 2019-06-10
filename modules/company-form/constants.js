import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl';

export const validationSchema = Yup.object().shape({
  name: Yup
    .string(<FormattedMessage id='validation.required' defaultMessage='Required' />)
    .trim()
    .min(2, <FormattedMessage id='validation.minLength' values={{ min: 2 }} />)
    .required()
})