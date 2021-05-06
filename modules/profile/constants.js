import * as Yup from 'yup'
import { errorMessages, phoneValidation, passwordValidation } from '../../constants/yupValidation'

/**
 * Initial form values in My profile modal popup
 * @category Profile
 * @constant
 */
export const initialMyProfileFormValues = {
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
export const MyProfileFormValidation = Yup.object().shape({
    name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    phone: phoneValidation(10)
})

/**
 * Initial form values in Password change modal popup
 * @category Profile
 * @constant
 */
 export const initialChangePasswordFormValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordRetype: ''
}

/**
 * Form validation for old and new password fields in Password change modal popup
 * @category Profile
 * @constant
 */
export const ChangePasswordFormValidation = () =>
    Yup.lazy(values =>
        Yup.object().shape({
        oldPassword: Yup.string()
          .test('trailing-spaces', errorMessages.trailingSpaces, val => !val || (val && val.trim() === val))
          .min(3, errorMessages.minLength(3))
          .required(errorMessages.requiredMessage),
        newPassword: passwordValidation(),
        newPasswordRetype: Yup.string(errorMessages.passwordsMustMatch)
          .test('trailing-spaces', errorMessages.trailingSpaces, val => !val || (val && val.trim() === val))
          .required(errorMessages.requiredMessage)
          .oneOf([values.newPassword], errorMessages.passwordsMustMatch)
        })
    )
  