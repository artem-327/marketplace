import * as Yup from 'yup'
import { errorMessages, passwordValidation } from '../../../../constants/yupValidation'

/**
 * Initial form values in Password change modal popup
 * @category Profile
 * @constant
 */
export const initialFormValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordRetype: ''
}

/**
 * Form validation for old and new password fields in Password change modal popup
 * @category Profile
 * @constant
 */
export const formValidation = () =>
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
  