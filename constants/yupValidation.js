import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { getSafe, deepSearch } from '~/utils/functions'
import { isValid } from 'ein-validator'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'

const allowedFreightClasses = [50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500]

export const errorMessages = {
  dateBefore: date => (
    <FormattedMessage id='validation.dateBefore' defaultMessage={`Date must be before ${date}`} values={{ date }} />
  ),
  mustBeInFuture: <FormattedMessage id='validation.dateInFuture' defaultMessage='Date must be in future' />,
  mustBeInPast: <FormattedMessage id='validation.dateInPast' defaultMessage='Date must be in past' />,
  dateNotInPast: <FormattedMessage id='validation.dateNotInPast' defaultMessage='Date must not be in past' />,
  dateNotInFuture: <FormattedMessage id='validation.dateNotInFuture' defaultMessage='Date must not be in future' />,
  invalidString: <FormattedMessage id='validation.invalidString' defaultMessage='Invalid value' />,
  invalidEmail: <FormattedMessage id='validation.invalidEmail' defaultMessage='Invalid e-mail address' />,
  invalidDate: <FormattedMessage id='validation.invalidDate' defaultMessage='Invalid date' />,
  mustBeNumber: <FormattedMessage id='validation.mustBeNumber' defaultMessage='Must be a number' />,
  lotHasToBeSelected: <FormattedMessage id='validation.lostHasToBeSelected' defaultMessage='Lot has to be selected' />,
  lotUnique: <FormattedMessage id='validation.lotUnique' defaultMessage='Lot has to be unique' />,
  requiredMessage: <FormattedMessage id='validation.required' defaultMessage='Required' />,
  requiredNonConforming: (
    <FormattedMessage id='validation.requiredNonConforming' defaultMessage='Required if Condition is Non Conforming' />
  ),
  invalidPhoneNumber: (
    <FormattedMessage id='validation.phoneNumber' defaultMessage={`Invalid phone number`} />
  ),
  zipCode: <FormattedMessage id='validation.zipCode' defaultMessage='Enter zip code' />,
  minLength: min => (
    <FormattedMessage
      id='validation.minLength'
      defaultMessage={`Field should have at least ${min} characters`}
      values={{ min }}
    />
  ),
  maxLength: max => (
    <FormattedMessage
      id='validation.maxLength'
      defaultMessage={`Field should have max ${max} characters`}
      values={{ max }}
    />
  ),
  enterPhoneNumber: <FormattedMessage id='validation.enterPhoneNumber' defaultMessage='Enter phone number' />,
  minDigits: min => (
    <FormattedMessage id='validation.minDigits' defaultMessage={`Must have at least ${min} digits`} values={{ min }} />
  ),
  maxDigits: max => (
    <FormattedMessage id='validation.maxDigits' defaultMessage={`Must have max ${max} digits`} values={{ max }} />
  ),
  exactDigits: num => (
    <FormattedMessage id='validation.exactDigits' defaultMessage={`There has to be exactly ${num} digits`} />
  ),
  greaterThan: value => (
    <FormattedMessage id='validation.greaterThan' values={{ value }} defaultMessage={`Must be greater than ${value}`} />
  ),
  greaterOrEqual: value => (
    <FormattedMessage
      id='validation.greaterOrEqual'
      values={{ value }}
      defaultMessage={`Must be greater or equal to ${value}`}
    />
  ),
  maxDecimals: max => (
    <FormattedMessage
      id='validation.maxDecimals'
      values={{ max }}
      defaultMessage={`There can be maximally ${max} decimal places`}
    />
  ),
  oneLowercaseChar: <FormattedMessage id='validation.oneLowercaseChar' defaultMessage='At least one lowercase char' />,
  oneUppercaseChar: <FormattedMessage id='validation.oneUppercaseChar' defaultMessage='At least one uppercase char' />,
  oneSpecialChar: (
    <FormattedMessage
      id='validation.oneSpecialChar'
      defaultMessage='At least one number or special char (@,!,#, etc)'
    />
  ),
  passwordsMustMatch: <FormattedMessage id='validation.passwordMatch' defaultMessage='Passwords must match' />,
  exactLength: len => (
    <FormattedMessage id='validation.exactLength' defaultMessage={`Must be ${len} characters long`} values={{ len }} />
  ),
  unique: (name = '') => (
    <FormattedMessage id='validation.unique' defaultMessage={`${name} has to be unique`} values={{ name }} />
  ),
  minimum: min => <FormattedMessage id='validation.minimum' values={{ min }} />,
  maximum: max => <FormattedMessage id='validation.maximum' values={{ max }} />,
  minUpToMax: (
    <FormattedMessage id='validation.minUpToMax' defaultMessage='Min value should be less or equal to Max value' />
  ),
  maxAtLeastMin: (
    <FormattedMessage
      id='validation.maxAtLeastMin'
      defaultMessage='Max value should be greater or equal to Min value'
    />
  ),
  integer: <FormattedMessage id='validation.integer' defaultMessage='Number value should be integer' />,
  invalidDateFormat: (example = 'MM/DD/YYYY') => (
    <FormattedMessage
      id='validation.invalidDateFormat'
      defaultMessage={`Invalid date format. Date should match ${example}`}
      values={{ example }}
    />
  ),
  invalidValueFormat: example => (
    <FormattedMessage
      id='validation.invalidValueFormat'
      defaultMessage={`Invalid value format. Format should match ${example}`}
      values={{ example }}
    />
  ),
  lessThanOrdered: <FormattedMessage id='validation.lessThanOrdered' defaultMessage='Less than ordered' />,
  moreThanOrdered: <FormattedMessage id='validation.moreThanOrdered' defaultMessage='More than ordered' />,
  oneOf: arr => (
    <FormattedMessage
      id='validation.oneOf'
      defaultMessage={`Must be one of ${arr.toString()}`}
      values={{ values: arr.toString() }}
    />
  ),
  aboveAge: age => (
    <FormattedMessage id='validation.aboveAge' defaultMessage={`Must be at least ${age} years old`} values={{ age }} />
  ),
  invalidWebsite: <FormattedMessage id='validation.invalidURL' defaultMessage='Invalid Website URL' />,
  invalidWebsiteHttp: (
    <FormattedMessage
      id='validation.invalidURLHttp'
      defaultMessage='Invalid Website URL (make sure to include http:// or https://)'
    />
  ),
  invalidSplit: split => (
    <FormattedMessage
      id='validation.multiplyOfSplit'
      defaultMessage='Must be multiply of split ({split})'
      values={{ split }}
    />
  ),
  positive: <FormattedMessage id='validation.positive' defaultMessage='Number value should be positive' />,
  invalidShipmentQuoteId: (
    <FormattedMessage id='validation.shipmentQuoteId' defaultMessage='Value should be in format "12365-4789"' />
  ),
  minOneRole: <FormattedMessage id='validation.minOneRole' defaultMessage='At least one role should be selected' />,
  minOneAttachment: (
    <FormattedMessage id='validation.minOneAttachment' defaultMessage='At least one attachment should be uploaded' />
  ),
  minOneGroup: <FormattedMessage id='validation.minOneGroup' defaultMessage='At least one group should be selected' />,
  minOneCompany: (
    <FormattedMessage id='validation.minOneCompany' defaultMessage='At least one company should be selected' />
  ),
  trailingSpaces: (
    <FormattedMessage
      id='validation.trailingSpaces'
      defaultMessage='Space was detected as leading or trailing character, please check enter password is correct'
    />
  ),
  passwordsMatch: <FormattedMessage id='validation.passwordsMustMatch' defaultMessage='Pass must match' />,
  invalidTime: <FormattedMessage id='validation.invalidTime' defaultMessage='Invalid time' />,
  invalidHashtag: <FormattedMessage id='validation.invalidHashtag' defaultMessage='Invalid hashtag' />
}

export const provinceObjectRequired = hasProvinces =>
  Yup.lazy(() =>
    hasProvinces
      ? Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage)
      : Yup.mixed().notRequired()
  )

export const passwordValidation = () =>
  Yup.string()
    .test('trailing-spaces', errorMessages.trailingSpaces, val => !val || (val && val.trim() === val))
    .min(8, errorMessages.minLength(8))
    .required(errorMessages.requiredMessage)
    .matches(/[a-z]/, errorMessages.oneLowercaseChar)
    .matches(/[A-Z]/, errorMessages.oneUppercaseChar)
    .matches(/[^a-zA-Z\s]+/, errorMessages.oneSpecialChar)

export const passwordValidationAnyChar = () =>
  Yup.string()
    .required(errorMessages.requiredMessage)
    .test('trailing-spaces', errorMessages.trailingSpaces, val => !val || (val && val.trim() === val))

export const phoneValidation = (minLength = 5) =>
  Yup.string()
    .trim()
    //.test('phone-validation', errorMessages.invalidPhoneNumber, (val) => val && validator.isMobilePhone(val + '', null, { strictMode: true })) // tohle nejak nefunguje
    .test('phone-validation', errorMessages.invalidPhoneNumber, val => !val || (val[0] === '+' && !val.includes('_')))
    .test(
      'phone-length-validation',
      errorMessages.invalidPhoneNumber,
      val => !val || (val[0] === '+' && val.length > minLength)
    ) // Delka vcetne '+' a predcisli, '+' povinne (tzn. bylo zvolene predcisli)

export const dateValidation = (required = true) => {
  let isValid = Yup.string().test(
    'date-format',
    errorMessages.invalidDateFormat(getLocaleDateFormat()),
    value => moment(value, getLocaleDateFormat(), true).isValid() || (!required && !value)
  )

  if (required) return isValid.concat(Yup.string().required(errorMessages.requiredMessage))
  else return isValid.concat(Yup.string().nullable())
}

export const ssnValidation = () =>
  Yup.string()
    .test('ssn', errorMessages.invalidValueFormat('123-45-6789'), value => /^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/.test(value))
    .required(errorMessages.requiredMessage)

export const nmfcValidation = () =>
  Yup.string(errorMessages.invalidString)
    .test(
      'code',
      errorMessages.invalidValueFormat('9999 to 999999 | 9999-19 to 999999-19 | sub number max 12'),
      value => {
        return (
          (/^[0-9]{1,6}$/.test(value) && value.length >= 4 && value.length <= 6) ||
          (/^[0-9]{1,6}\-[0-1][0-9]$/.test(value) &&
            value.length >= 7 &&
            value.length <= 9 &&
            Number(value.split('-')[1]) <= 12)
        )
      }
    )
    .required(errorMessages.requiredMessage)

export const freightClassValidation = () =>
  Yup.number(errorMessages.mustBeNumber)
    .typeError(errorMessages.mustBeNumber)
    .oneOf(allowedFreightClasses, errorMessages.oneOf(allowedFreightClasses))

export const beneficialOwnersValidation = () =>
  Yup.array().of(
    Yup.lazy(values => {
      let isAnyValueFilled = deepSearch(values, (val, key) => val !== '' && key !== 'country')

      if (!isAnyValueFilled) return Yup.mixed().notRequired()

      return Yup.object().shape({
        address: addressValidationSchema(),
        dateOfBirth: dateOfBirthValidation(),
        firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        ssn: ssnValidation()
      })
    })
  )

export const addressValidationSchema = () => {
  const minLength = errorMessages.minLength(2)

  return Yup.lazy(values =>
    Yup.object().shape({
      city: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
      streetAddress: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
      zip: Yup.string().trim().required(errorMessages.requiredMessage),
      country: Yup.string().required(errorMessages.requiredMessage),
      province: provinceObjectRequired(getSafe(() => JSON.parse(values.country).hasProvinces, false))
    })
  )
}

export const dwollaControllerValidation = fullSsnInput =>
  Yup.object().shape({
    address: addressValidationSchema(),
    dateOfBirth: dateOfBirthValidation(),
    firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    // passport: Yup.object().shape({
    //   country: Yup.string().required(errorMessages.requiredMessage),
    //   number: Yup.string().required(errorMessages.requiredMessage),
    // }),
    ssn: fullSsnInput
      ? ssnValidation()
      : Yup.string()
          .test('num-length', errorMessages.exactDigits(4), value => /^[0-9]{4}$/.test(value))
          .required(errorMessages.requiredMessage),
    jobTitle: Yup.string().trim().required(errorMessages.requiredMessage)
  })

export const dateOfBirthValidation = (minimumAge = 18) =>
  Yup.string(errorMessages.requiredMessage)
    .test('date-format', errorMessages.invalidDateFormat(getLocaleDateFormat()), value =>
      moment(value, getLocaleDateFormat(), true).isValid()
    )
    .test(
      'min-age',
      errorMessages.aboveAge(minimumAge),
      val => moment().diff(getStringISODate(val), 'years') >= minimumAge
    )
    .required(errorMessages.requiredMessage)

export const einValidation = () =>
  Yup.string(errorMessages.requiredMessage)
    .test('ein', errorMessages.invalidString, ein => isValid(ein))
    .required(errorMessages.requiredMessage)

export const dunsValidation = () => {
  return Yup.string(errorMessages.requiredMessage).test('duns', errorMessages.invalidValueFormat('123456789'), val => {
    if (!val) return true
    // if (val.includes('-')) return /^[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/.test(val)
    else return /^[0-9]{9}$/.test(val)
  })
}

export const websiteValidation = () =>
  Yup.string(errorMessages.requiredMessage)
    .test('website', errorMessages.invalidWebsiteHttp, val => (val ? validURLHttp(val) : false))
    .test('website', errorMessages.invalidWebsite, val => (val ? validURL(val) : false))

export const websiteValidationNotRequired = () =>
  Yup.string()
    .trim()
    .test('website', errorMessages.invalidWebsiteHttp, val => (val ? validURLHttp(val) : true))
    .test('website', errorMessages.invalidWebsite, val => (val ? validURL(val) : true))

function validURLHttp(str) {
  const pattern = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/)
  return !!pattern.test(str.trim())
}

function validURL(str) {
  const pattern = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  )
  return !!pattern.test(str.trim())
}

export const quantityValidation = (min = 1, split = 1) =>
  Yup.number()
    .typeError(errorMessages.mustBeNumber)
    .min(min, errorMessages.minimum(min))
    .test('v', errorMessages.invalidSplit(split), v => v % split === 0)

export const minOrZeroLength = min =>
  Yup.string().test('v', errorMessages.minimum(min), v => (v ? v.trim().length >= min : true))

export const validateShipmentQuoteId = () =>
  Yup.string()
    .trim()
    .required(errorMessages.requiredMessage)
    .test('quoteId', errorMessages.invalidShipmentQuoteId, val => (val ? validShipmentQuoteId(val) : false))

function validShipmentQuoteId(str) {
  const pattern = new RegExp(/^\d+-\d+$/)
  return !!pattern.test(str.trim())
}

export const dateBefore = (date = 'lotManufacturedDate', beforeDate = 'lotExpirationDate', opts = {}) =>
  Yup.string().test(
    'is-before',
    errorMessages.dateBefore(getSafe(() => opts.beforeDateError, 'Expired Date')),
    function (_val) {
      let defaultOpts = {
        nullable: true,
        beforeDateError: 'Expired Date'
      }
      let newOpts = {
        ...defaultOpts,
        ...opts
      }
      let parsedDate = moment(this.parent[date], getLocaleDateFormat())
      let parsedBeforeDate = moment(this.parent[beforeDate], getLocaleDateFormat())

      return (newOpts.nullable && !parsedBeforeDate.isValid()) || parsedDate.isBefore(parsedBeforeDate)
    }
  )

export const validateTime = () =>
  Yup.string()
    .trim()
    .test('time', errorMessages.invalidTime, t => {
      return moment(t, ['hh:mm a', 'HH:mm']).isValid() || !t
    })

export const multipleEmails = () =>
  Yup.string()
    .trim()
    .test('email-validation', errorMessages.invalidEmail, function (inputEmails) {
      const emails = inputEmails ? inputEmails.split(';') : []
      return !emails.some(email => {
        return !Yup.string().trim().email().isValidSync(email)
      })
    })

export const tagValidate = () =>
  Yup.string()
    .trim()
    .test('time', errorMessages.invalidHashtag, t => {
      return !t || t.charAt(0) === '@'
    })

export const stringValidation = () => (
  Yup.lazy(() => Yup.string().required(errorMessages.requiredMessage))
)