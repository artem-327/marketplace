import * as Yup from 'yup'
import { errorMessages, phoneValidation } from '../../../../constants/yupValidation'

export const initialFormValues = {
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    userAvatar: null
}

export const formValidation = Yup.object().shape({
    name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    phone: phoneValidation(10)
})