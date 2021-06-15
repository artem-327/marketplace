import * as Yup from 'yup'
//Constants
import { errorMessages } from '../../../../../constants/yupValidation'

export const initialFormValues = {
  name: '',
  email: ''
}

export const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      name: Yup.string().trim().min(1, errorMessages.minLength(1)).required(errorMessages.requiredMessage),
      email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
    })
  )
