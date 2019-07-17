import * as Yup from 'yup'

import { provinceObjectRequired, errorMessages } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'

const minLength = errorMessages.minLength(2)


export const addressValidationSchema = () =>
  Yup.lazy((values) =>
    Yup.object().shape({
      city: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
      streetAddress: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
      zip: Yup.string().trim().required(errorMessages.requiredMessage),
      country: Yup.string().required(errorMessages.requiredMessage),
      province: provinceObjectRequired(getSafe(() => JSON.parse(values.country).hasProvinces, false))
    })
  )

