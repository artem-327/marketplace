import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'


export const errorMessages = {
  invalidString: <FormattedMessage id='validation.invalidString' defaultMessage='Invalid value' />,
  invalidEmail: <FormattedMessage id='validation.invalidEmail' defaultMessage='Invalid e-mail address' />,
  requiredMessage: <FormattedMessage id='validation.required' defaultMessage='Requred' />,
  invalidPhoneNumber: <FormattedMessage id='validation.phoneNumber' defaultMessage='Enter valid phone number' />,
  zipCode: <FormattedMessage id='validation.zipCode' defaultMessage='Enter zip code' />,
  minLength: (min) => <FormattedMessage id='validation.minLength' values={{ min }} />,
  enterPhoneNumber: <FormattedMessage id='validation.enterPhoneNumber' defaultMessage='Enter phone number' />
}

export const provinceObjectRequired = (hasProvinces) => (
  Yup.lazy(() =>
    hasProvinces
      ? Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage)
      : Yup.mixed().notRequired())
)

