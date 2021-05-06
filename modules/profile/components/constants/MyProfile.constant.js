import * as Yup from 'yup'
import { errorMessages, phoneValidation } from '../../../../constants/yupValidation'

/**
 * Initial form values in My profile modal popup
 * @category Profile
 * @constant
 */
export const initialFormValues = {
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    userAvatar: null
}

/**
 * Form validation for name and phone fields in My profile modal popup
 * @category Profile
 * @constant
 */
export const formValidation = Yup.object().shape({
    name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    phone: phoneValidation(10)
})