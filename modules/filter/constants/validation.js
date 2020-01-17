import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { dateDropdownOptions } from './filter'
import { errorMessages as errorMessagesGlobal, phoneValidation } from '~/constants/yupValidation'

export const initialValues = {
  search: [],
  quantityFrom: '',
  quantityTo: '',
  priceFrom: '',
  priceTo: '',
  assayFrom: '',
  assayTo: '',
  name: '',
  expiration: dateDropdownOptions[0].value,
  mfg: dateDropdownOptions[0].value,
  expirationTo: '',
  expirationFrom: '',
  mfgTo: '',
  mfgFrom: '',
  checkboxes: {
    notificationEnabled: false,
    automaticallyApply: true,
    notifyMail: false,
    notifyPhone: false,
    notifySystem: false
  },
  notifications: {
    notificationMail: '',
    notificationPhone: ''
  },
  warehouse: '',
  broadcast: '',
  manufacturer: ''
}

const errorMessages = {
  minimum: min => <FormattedMessage id='validation.minimum' values={{ min }} />,
  maximum: max => <FormattedMessage id='validation.maximum' values={{ max }} />,
  lessThan: value => <FormattedMessage id='validation.lessThan' values={{ value }} />,
  greaterThan: value => <FormattedMessage id='validation.greaterThan' values={{ value }} />
}

const comparationHelper = (fieldOne, fieldTwo, values, options = {}) => {
  let initialOptions = {
    minimum: 1
  }

  let newOptions = {
    ...initialOptions,
    ...options
  }

  let defaultValidation = Yup.number().min(newOptions.minimum, errorMessages.minimum(newOptions.minimum))

  if (newOptions.additionalValidation) defaultValidation = newOptions.additionalValidation(defaultValidation)

  let validation = defaultValidation.notRequired().nullable()

  return {
    [fieldOne.propertyName]: Yup.lazy(() => {
      if (values[fieldTwo.propertyName]) {
        return validation.lessThan(values[fieldTwo.propertyName], errorMessages.lessThan(fieldOne.value))
      }
      return validation
    }),
    [fieldTwo.propertyName]: Yup.lazy(() => {
      if (values[fieldOne.propertyName]) {
        return validation.moreThan(values[fieldOne.propertyName], errorMessages.greaterThan(fieldTwo.value))
      }
      return validation
    })
  }
}

export const validationSchema = openedSaveFilter =>
  Yup.lazy(values => {
    return Yup.object().shape({
      ...comparationHelper(
        { propertyName: 'quantityFrom', value: 'To Quantity' },
        { propertyName: 'quantityTo', value: 'From Quantity' },
        values
      ),

      ...comparationHelper(
        { propertyName: 'priceFrom', value: 'To Price' },
        { propertyName: 'priceTo', value: 'From Price' },
        values,
        { minimum: 0.01 }
      ),

      ...comparationHelper(
        { propertyName: 'assayFrom', value: 'Maximum' },
        { propertyName: 'assayTo', value: 'Minimum' },
        values,
        {
          minimum: 0,
          additionalValidation: validation => {
            return validation.max(100, errorMessages.maximum(100))
          }
        }
      ),

      expirationFrom: Yup.number('number')
        .moreThan(0, errorMessages.greaterThan(0))
        .notRequired(),
      expirationTo: Yup.number('number')
        .moreThan(0, errorMessages.greaterThan(0))
        .notRequired(),
      mfgFrom: Yup.number('number')
        .min(0, errorMessages.minimum(0))
        .notRequired(),
      mfgTo: Yup.number('number')
        .moreThan(0, errorMessages.greaterThan(0))
        .notRequired(),

      ...(openedSaveFilter && {
        name: Yup.string()
          .trim()
          .min(2, errorMessagesGlobal.minLength(2))
          .required(errorMessagesGlobal.minLength(2)),
        notifications: Yup.object().shape({
          notificationMail: Yup.string()
            .trim()
            .email(errorMessagesGlobal.invalidEmail),
          notificationPhone: phoneValidation()
        })
      })
    })
  })

export const savedFilterValidation = Yup.lazy(values => {
  if (values.checkboxes.notifyMail) {
    return Yup.object().shape({
      notifications: Yup.object().shape({
        notificationMail: Yup.string()
          .trim()
          .email(errorMessagesGlobal.invalidEmail),
        notificationPhone: phoneValidation()
      })
    })
  }
})
