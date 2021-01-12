import * as Yup from 'yup'
//Constants
import { errorMessages } from '~/constants/yupValidation'

export const initialFormValues = {
  email: ''
}

export const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      email: Yup.string().trim().email().required(errorMessages.requiredMessage)
    })
  )
