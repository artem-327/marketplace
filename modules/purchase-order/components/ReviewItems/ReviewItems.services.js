import * as Yup from 'yup'
import { addressValidationSchema, errorMessages } from '~/constants/yupValidation'

export const getValidationScheme = () => Yup.lazy(values =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.lazy(val =>
        Yup.object().shape({
          quantity:
            Yup.number()
              .typeError(errorMessages.mustBeNumber)
              .positive(errorMessages.positive)
              .required(errorMessages.requiredMessage)

              .test('v', errorMessages.minimum(val.minPkg), function (v) {
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                return Number(v) >= val.minPkg
              })
              .test('v', errorMessages.maximum(val.pkgAvailable), function (v) {
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                return Number(v) <= val.pkgAvailable
              })
              .test('v', errorMessages.invalidSplit(val.splitPkg), v => v % val.splitPkg === 0)
        })
      )
    )
  })
)


