import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'


export const initialValues = {
  checkboxes: {
    automaticallyApply: true,
    notifyMail: false,
    notifyPhone: false,
    notifySystem: false
  },
  notifications: {
    notificationMail: null,
    notificationPhone: null
  }
}

const errorMessages = {
  minimum: (min) => <FormattedMessage id='validation.minimum' values={{ min }} />,
  lessThan: (value) => <FormattedMessage id='validation.lessThan' values={{ value }} />,
  greaterThan: (value) => <FormattedMessage id='validation.greaterThan' values={{ value }} />
}

const comparationHelper = (fieldOne, fieldTwo, values) => {
  let minimumOne = Yup.number().min(1, errorMessages.minimum(1)).notRequired()

  return {
    [fieldOne.propertyName]: Yup.lazy(() => {
      if (values[fieldTwo.propertyName]) {
        return minimumOne.lessThan(values[fieldTwo.propertyName], errorMessages.lessThan(fieldOne.value))
      }
      return minimumOne
    }),
    [fieldTwo.propertyName]: Yup.lazy(() => {
      if (values[fieldOne.propertyName]) {
        return minimumOne.moreThan(values[fieldOne.propertyName], errorMessages.greaterThan(fieldTwo.value))
      }
      return minimumOne
    })
  }
}

export const validationSchema = () => Yup.lazy(values => {
  return (
    Yup.object().shape({
      ...comparationHelper(
        { propertyName: 'quantityFrom', value: 'To Quantity' },
        { propertyName: 'quantityTo', value: 'From Quantity' },
        values),

      ...comparationHelper(
        { propertyName: 'priceFrom', value: 'To Price' },
        { propertyName: 'priceTo', value: 'From Price' },
        values),

      ...comparationHelper(
        { propertyName: 'assayFrom', value: 'Maximum' },
        { propertyName: 'assayTo', value: 'Minimum' },
        values),

      dateFrom: Yup.lazy(() => {
        if (values.dateTo) {
          return Yup.date().max(values.dateTo, errorMessages.lessThan('Date To'))
        }
        return Yup.mixed().notRequired()
      }),
      dateTo: Yup.lazy(() => {
        if (values.dateFrom) {
          return Yup.date().min(values.dateFrom, errorMessages.greaterThan('Date From'))
        }
        return Yup.mixed().notRequired()
      })
    })
  )
})