import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'

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

export const validationSchema = () => Yup.lazy(values => {
  let messages = {
    email: <FormattedMessage id='validation.invalidEmail' defaultMessage='Invalid e-mail' />,
    required: <FormattedMessage id='validation.required' defaultMessage='Required!' />,
    passwordsMatch: <FormattedMessage id='validation.passwordsMustMatch' defaultMessage='Pass must match' />
  }
  let validation = {
    securityCode: Yup.string(messages.required).required(messages.required),
    email: Yup.string().email(messages.email).required(messages.required),
    password: Yup.string(messages.required).required(messages.required),
  }

  if (!values.passwordConfirm) {
    validation.passwordConfirm = Yup.string('required').required('Required')
  }
  else if (values.password !== values.passwordConfirm) {
    validation.passwordConfirm = Yup.string('must match').oneOf([values.password], messages.passwordsMatch)
  }

  return Yup.object().shape(validation)
})