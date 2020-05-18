import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'

export const initialValues = forgottenPassword => {
  let initial = {
    email: '',
    password: '',
    passwordConfirm: '',
    securityCode: ''
  }

  if (!forgottenPassword) {
    initial.termsOfAgreement = false
  }

  return initial
}

export const validationSchema = () =>
  Yup.lazy(values => {
    let validation = {
      securityCode: Yup.string().required(errorMessages.requiredMessage),
      email: Yup.string()
        .trim()
        .email(errorMessages.invalidEmail)
        .required(errorMessages.requiredMessage),
      password: Yup.string(errorMessages.requiredMessage)
        .required(errorMessages.requiredMessage)
        .test('trailing-spaces', errorMessages.trailingSpaces, val => val && val.trim() === val)
    }

    if (!values.passwordConfirm) {
      validation.passwordConfirm = Yup.string()
        .required(errorMessages.requiredMessage)
    } else if (values.password !== values.passwordConfirm) {
      validation.passwordConfirm = Yup.string()
        .oneOf([values.password], errorMessages.passwordsMatch)
        .test('trailing-spaces', errorMessages.trailingSpaces, val => val && val.trim() === val)
    } else {
      validation.passwordConfirm = Yup.string()
        .test('trailing-spaces', errorMessages.trailingSpaces, val => val && val.trim() === val)
    }

    return Yup.object().shape(validation)
  })
