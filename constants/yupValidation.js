import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { getSafe, deepSearch } from '~/utils/functions'
import { isValid } from 'ein-validator'
import validator from 'validator'

const allowedFreightClasses = [50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500]


export const errorMessages = {
  invalidString: <FormattedMessage id='validation.invalidString' defaultMessage='Invalid value' />,
  invalidEmail: <FormattedMessage id='validation.invalidEmail' defaultMessage='Invalid e-mail address' />,
  invalidDate: <FormattedMessage id='validation.invalidDate' defaultMessage='Invalid date' />,
  mustBeNumber: <FormattedMessage id='validation.mustBeNumber' defaultMessage='Must be an number' />,
  lotHasToBeSelected: <FormattedMessage id='validation.lostHasToBeSelected' defaultMessage='Lot has to be selected' />,
  lotUnique: <FormattedMessage id='validation.lotUnique' defaultMessage='Lot has to be unique' />,
  requiredMessage: <FormattedMessage id='validation.required' defaultMessage='Required' />,
  invalidPhoneNumber: <FormattedMessage id='validation.phoneNumber' defaultMessage={`Please, enter valid phone number.`} />,
  zipCode: <FormattedMessage id='validation.zipCode' defaultMessage='Enter zip code' />,
  minLength: (min) => <FormattedMessage id='validation.minLength' defaultMessage={`Field should have at least ${min} characters`} values={{ min }} />,
  maxLength: (max) => <FormattedMessage id='validation.maxLength' defaultMessage={`Field should have max ${max} characters`} values={{ max }} />,
  enterPhoneNumber: <FormattedMessage id='validation.enterPhoneNumber' defaultMessage='Enter phone number' />,
  minDigits: (min) => <FormattedMessage id='validation.minDigits' defaultMessage={`Must have at least ${min} digits`} values={{ min }} />,
  maxDigits: (max) => <FormattedMessage id='validation.maxDigits' defaultMessage={`Must have max ${max} digits`} values={{ max }} />,
  exactDigits: (num) => <FormattedMessage id='validation.exactDigits' defaultMessage={`There has to be exactly ${num} digits`} />,
  greaterThan: (value) => <FormattedMessage id='validation.greaterThan' values={{ value }} defaultMessage={`Must be greater than ${value}`} />,
  maxDecimals: (max) => <FormattedMessage id='validation.maxDecimals' values={{ max }} defaultMessage={`There can be maximally ${max} decimal places`} />,
  oneLowercaseChar: <FormattedMessage id='validation.oneLowercaseChar' defaultMessage='At least one lowercase char' />,
  oneUppercaseChar: <FormattedMessage id='validation.oneUppercaseChar' defaultMessage='At least one uppercase char' />,
  oneSpecialChar: <FormattedMessage id='validation.oneSpecialChar' defaultMessage='At least one number or special char (@,!,#, etc)' />,
  passwordsMustMatch: <FormattedMessage id='validation.passwordMatch' defaultMessage='Passwords must match' />,
  exactLength: (len) => <FormattedMessage id='validation.exactLength' defaultMessage={`Must be ${len} characters long`} values={{ len }} />,
  unique: (name = '') => <FormattedMessage id='validation.unique' defaultMessage={`${name} has to be unique`} values={{ name }} />,
  minimum: (min) => <FormattedMessage id='validation.minimum' values={{ min }} />,
  maximum: (max) => <FormattedMessage id='validation.maximum' values={{ max }} />,
  minUpToMax: <FormattedMessage id='validation.minUpToMax' defaultMessage='Min value should be less or equal to Max value' />,
  maxAtLeastMin: <FormattedMessage id='validation.maxAtLeastMin' defaultMessage='Max value should be greater or equal to Min value' />,
  integer: <FormattedMessage id='validation.integer' defaultMessage='Number value should be integer' />,
  invalidDateFormat: (example = 'YYYY-MM-DD') => <FormattedMessage id='validation.invalidDateFormat' defaultMessage={`Invalid date format. Date should match ${example}`} values={{ example }} />,
  invalidValueFormat: (example) => <FormattedMessage id='validation.invalidValueFormat' defaultMessage={`Invalid value format. Format should match ${example}`} values={{ example }} />,
  lessThanOrdered: <FormattedMessage id='validation.lessThanOrdered' defaultMessage='Less than ordered' />,
  moreThanOrdered: <FormattedMessage id='validation.moreThanOrdered' defaultMessage='More than ordered' />,
  oneOf: (arr) => <FormattedMessage id='validation.oneOf' defaultMessage={`Must be one of ${arr.toString()}`} values={{ values: arr.toString() }} />,
  aboveAge: age => <FormattedMessage id='validation.aboveAge' defaultMessage={`Must be at least ${age} years old`} values={{ age }} />,
  invalidWebsite: <FormattedMessage id='validation.invalidURL' defaultMessage='Invalid Website URL' />
}

export const provinceObjectRequired = (hasProvinces) => (
  Yup.lazy(() =>
    hasProvinces
      ? Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage)
      : Yup.mixed().notRequired())
)


export const passwordValidation = () => (
  Yup.string().trim()
    .min(8, errorMessages.minLength(8))
    .required(errorMessages.requiredMessage)
    .matches(/[a-z]/, errorMessages.oneLowercaseChar)
    .matches(/[A-Z]/, errorMessages.oneUppercaseChar)
    .matches(/[^a-zA-Z\s]+/, errorMessages.oneSpecialChar)
)

export const phoneValidation = () => (
  Yup.string()
    .trim()
    .test('phone-validation', errorMessages.invalidPhoneNumber, (val) => val && validator.isMobilePhone(val))
    // .matches(/^[0-9\(\)\-\+\s]+$/, errorMessages.invalidPhoneNumber)
)

export const dateValidation = (required = true) => {
  let isValid = Yup.string()
    .test('date-format', errorMessages.invalidDateFormat(), (value) =>
      moment(value, 'YYYY-MM-DD', true).isValid() || (!required && !value))

  if (required) return isValid.concat(Yup.string().required(errorMessages.requiredMessage))
  else return isValid.concat(Yup.string().nullable())
}

export const ssnValidation = () => (
  Yup.string()
    .test('ssn', errorMessages.invalidValueFormat('123-45-6789'), (value) => /^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/.test(value)).required(errorMessages.requiredMessage)
)

export const nmfcValidation = () => (
  Yup.number(errorMessages.mustBeNumber)
    .typeError(errorMessages.mustBeNumber)
    .test('min-len', errorMessages.minDigits(5), (value) => (value + '').length >= 5)
    .test('max-len', errorMessages.maxDigits(6), (value) => (value + '').length <= 6)
)

export const freightClassValidation = () => (
  Yup.number(errorMessages.mustBeNumber)
    .typeError(errorMessages.mustBeNumber)
    .oneOf(allowedFreightClasses, errorMessages.oneOf(allowedFreightClasses))
)

export const beneficialOwnersValidation = () =>
  Yup.array().of(Yup.lazy((values) => {
    let isAnyValueFilled = deepSearch(values, (val, key) => val !== '' && key !== 'country')

    if (!isAnyValueFilled) return Yup.mixed().notRequired()

    return (
      Yup.object().shape({
        address: addressValidationSchema(),
        dateOfBirth: dateOfBirthValidation(),
        firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        ssn: ssnValidation()
      })
    )
  }))



export const addressValidationSchema = () => {
  const minLength = errorMessages.minLength(2)

  return (
    Yup.lazy((values) =>
      Yup.object().shape({
        city: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
        streetAddress: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
        zip: Yup.string().trim().required(errorMessages.requiredMessage),
        country: Yup.string().required(errorMessages.requiredMessage),
        province: provinceObjectRequired(getSafe(() => JSON.parse(values.country).hasProvinces, false))
      })
    )

  )
}


export const dwollaControllerValidation = () => Yup.object().shape({
  address: addressValidationSchema(),
  dateOfBirth: dateOfBirthValidation(),
  firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  // passport: Yup.object().shape({
  //   country: Yup.string().required(errorMessages.requiredMessage),
  //   number: Yup.string().required(errorMessages.requiredMessage),
  // }),
  ssn: Yup.number()
    .typeError(errorMessages.mustBeNumber)
    .positive(errorMessages.mustBeNumber)
    .test('num-length', errorMessages.exactDigits(4), (value) => (value + '').length === 4)
    .required(errorMessages.requiredMessage),
  jobTitle: Yup.string().trim().required(errorMessages.requiredMessage)
})

export const dateOfBirthValidation = (minimumAge = 18) =>
  Yup.string(errorMessages.requiredMessage)
    .test('min-age', errorMessages.aboveAge(minimumAge), (val) => moment().diff(val, 'years') >= minimumAge)
    .test('date-format', errorMessages.invalidDateFormat(), (value) => moment(value, 'YYYY-MM-DD', true).isValid())
    .required(errorMessages.requiredMessage)

export const einValidation = () =>
  Yup.string(errorMessages.requiredMessage)
    .test('ein', errorMessages.invalidString, (ein) => isValid(ein)).required(errorMessages.requiredMessage)

export const dunsValidation = () => {

  return (
    Yup.string(errorMessages.requiredMessage)
      .test('duns', errorMessages.invalidValueFormat('123456789'), (val) => {
        if (!val) return false
        // if (val.includes('-')) return /^[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/.test(val)
        else return /^[0-9]{9}$/.test(val)
      })
  )
}

export const websiteValidation = () => (
  Yup.string(errorMessages.requiredMessage)
    .test('website', errorMessages.invalidWebsite, (val) => val ? validURL(val) : true)
    .required(errorMessages.requiredMessage)
)


function validURL(str) {
  const pattern = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
  return !!pattern.test(str)
}