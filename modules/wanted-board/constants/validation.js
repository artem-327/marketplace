import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
//import { errorMessages as errorMessagesGlobal, phoneValidation } from '~/constants/yupValidation'

const errorMessages = {
  minimum: min => <FormattedMessage id='validation.minimum' values={{ min }} />,
  maximum: max => <FormattedMessage id='validation.maximum' values={{ max }} />,
  lessThan: value => <FormattedMessage id='validation.lessThan' values={{ value }} />,
  greaterThan: value => <FormattedMessage id='validation.greaterThan' values={{ value }} />
}

export const comparationHelper = (fieldOne, fieldTwo, values, options = {}) => {
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



