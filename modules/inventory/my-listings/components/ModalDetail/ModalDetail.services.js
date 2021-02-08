import moment from 'moment'
import * as val from 'yup'
import { injectIntl, FormattedMessage } from 'react-intl'
//Services
import { getStringISODate } from '../../../../../components/date-format'
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import { getSafe } from '../../../../../utils/functions'

val.addMethod(val.number, 'divisibleBy', function (ref, message) {
  return this.test({
    name: 'divisibleBy',
    exclusive: false,
    message: message || '${path} must be divisible by ${reference}',
    params: {
      reference: ref.path
    },
    test: function (value) {
      const divisedBy = parseInt(this.resolve(ref))
      if (!divisedBy || isNaN(divisedBy)) return false

      return !(value % divisedBy)
    }
  })
})

val.addMethod(val.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('uniqueProperty', message, function (value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some(option => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      })
    }

    return true
  })
})

export const validationScheme = val.lazy(values => {
  let minimumQuantity = getSafe(() => values.edit.minimum, 0) > 0 ? values.edit.minimum - 1 : 0
  if (values.edit.costPerUOM === '') values.edit.costPerUOM = null
  return val.object().shape({
    edit: val.object().shape({
      product: val.number().typeError(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
      fobPrice: val
        .number()
        .min(0.001, errorMessages.minimum(0.001))
        .typeError(errorMessages.mustBeNumber)
        .test('maxdec', errorMessages.maxDecimals(3), val => {
          return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
        })
        .required(errorMessages.requiredMessage),
      costPerUOM: val
        .number()
        .typeError(errorMessages.mustBeNumber)
        .notRequired()
        .nullable()
        .min(0.001, errorMessages.minimum(0.001))
        .test('maxdec', errorMessages.maxDecimals(3), val => {
          return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
        }),
      lotNumber: val.string().typeError(errorMessages.invalidString).nullable(),
      inStock: val.bool().required(errorMessages.requiredMessage),
      minimum: val
        .number()
        .min(1, errorMessages.minimum(1))
        .typeError(errorMessages.mustBeNumber)
        .divisibleBy(
          val.ref('splits'),
          <FormattedMessage id='inventory.notDivisibleBySplits' defaultMessage='Value is not divisible by Splits' />
        )
        .required(errorMessages.requiredMessage),
      pkgAvailable: val
        .number()
        .positive(errorMessages.positive)
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage),
      //This validation maybe return back. It will be depends on new BE logic.
      // .test('match', errorMessages.greaterOrEqual(values.edit.minimum), function (pkgAvailable) {
      //   return typeof values.edit.minimum === 'undefined' || pkgAvailable >= values.edit.minimum
      // }),
      leadTime: val.number().min(1, errorMessages.minimum(1)).typeError(errorMessages.mustBeNumber),
      splits: val
        .number()
        .min(1, errorMessages.minimum(1))
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage),
      warehouse: val
        .number(errorMessages.requiredMessage)
        .nullable(errorMessages.requiredMessage)
        .moreThan(0, errorMessages.requiredMessage)
        .required(errorMessages.requiredMessage),
      conforming: val.boolean(),
      conditionNotes: val.string().when('conforming', {
        is: false,
        then: val.string().required(errorMessages.requiredNonConforming)
      }),
      expirationDate: dateValidation(false).concat(
        val.string().when('doesExpire', {
          is: true,
          then: val
            .string()
            .test(
              'min-date',
              errorMessages.mustBeInFuture,
              val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
            )
        })
      ),
      lotExpirationDate: dateValidation(false),
      lotManufacturedDate: dateValidation(false).concat(
        val
          .string()
          .test(
            'max-date',
            errorMessages.mustBeInPast,
            val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') > -1
          )
      )
    }),
    priceTiers: val.object().shape({
      priceTiers: val.number(),
      pricingTiers: val.array().of(
        val
          .object()
          .uniqueProperty('quantityFrom', 'Quantity has to be unique')
          .shape({
            quantityFrom: val
              .number()
              .typeError(errorMessages.mustBeNumber)
              .required(errorMessages.requiredMessage)
              .moreThan(minimumQuantity, errorMessages.greaterOrEqual(minimumQuantity + 1)),
            price: val
              .number()
              .typeError(errorMessages.mustBeNumber)
              .required(errorMessages.requiredMessage)
              .moreThan(0, errorMessages.greaterThan(0))
              .test('maxdec', errorMessages.maxDecimals(3), val => {
                return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
              }),
            manuallyModified: val.number().min(0).max(1)
          })
      )
    })
  })
})
