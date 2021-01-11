import * as Yup from 'yup'
//Constants
import { errorMessages, multipleEmails } from '~/constants/yupValidation'

export const initialFormValues = {
  email: ''
}

export const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      email: multipleEmails().required(errorMessages.requiredMessage)
    })
  )
