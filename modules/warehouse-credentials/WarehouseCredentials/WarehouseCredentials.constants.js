import * as Yup from 'yup'
import { errorMessages, dateValidation, websiteValidation } from '../../../constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '../../../components/date-format'
import moment from 'moment'
const { requiredMessage } = errorMessages

export const columns = [
  {
    name: 'warehouseName',
    title: 'warehouseName',
    width: 1000
  }
]

export const CONTENT_SUBCOLUMNS = [{ name: 'branchName', width: '100%' }]

export const INITIAL_VALUES = {
  dea: {
    issueDate: '',
    expDate: ''
  },
  epa: {
    epaFacilityUrl: '',
    epaFrsId: '',
    epaRegion: ''
  },
  taxExempt: {
    certificateNumber: '',
    issueDate: '',
    expDate: ''
  }
}

export const VALIDATION_SCHEME = Yup.object().shape({
  dea: Yup.object().shape({
    issueDate: dateValidation(true).concat(
      Yup.string().test(
        'min-date',
        errorMessages.dateNotInFuture,
        val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') > -1
      )
    ),
    expDate: dateValidation(true).concat(
      Yup.string().test(
        'min-date',
        errorMessages.mustBeInFuture,
        val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
      )
    )
  }),
  epa: Yup.object().shape({
    epaFacilityUrl: websiteValidation().required(requiredMessage),
    epaFrsId: Yup.string(requiredMessage).required(requiredMessage),
    epaRegion: Yup.string(requiredMessage).required(requiredMessage)
  }),
  taxExempt: Yup.object().shape({
    certificateNumber: Yup.string(requiredMessage).required(requiredMessage),
    issueDate: dateValidation(true).concat(
      Yup.string().test(
        'min-date',
        errorMessages.dateNotInFuture,
        val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') > -1
      )
    ),
    expDate: dateValidation(true).concat(
      Yup.string().test(
        'min-date',
        errorMessages.mustBeInFuture,
        val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
      )
    )
  })
})
