import * as Yup from 'yup'
import { addressValidationSchema, errorMessages } from '~/constants/yupValidation'

export const getValidationScheme = () => Yup.lazy(values =>
  Yup.object().shape({
    items: Yup.array().of({
      quantity: Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .positive(errorMessages.positive)
        .required(errorMessages.requiredMessage)
      }
    )
  })
)


