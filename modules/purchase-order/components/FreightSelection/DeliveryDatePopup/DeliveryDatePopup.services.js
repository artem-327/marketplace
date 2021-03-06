import * as Yup from 'yup'
import { errorMessages, dateValidation } from '../../../../../constants/yupValidation'
import moment from 'moment'
import { getStringISODate } from '../../../../../components/date-format'

export const getValidationScheme = (daysInFuture) => Yup.lazy(() =>
  Yup.object().shape({
    date: dateValidation(false).concat(
      Yup.string()
        .test(
          'min-date',
          errorMessages.mustBeDaysInFuture(daysInFuture),
          val => !val || moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -daysInFuture
        )
    )
  })
)