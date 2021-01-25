import * as Yup from 'yup'
import moment from 'moment'
//Components
import {
  errorMessages,
  addressValidationSchema,
  einValidation,
  websiteValidationNotRequired,
  dateValidation,
  phoneValidation
} from '~/constants/yupValidation'
import Router from 'next/router'
//Services
import { getObjectWithoutEmptyElements } from '~/services'
import { getSafe } from '~/utils/functions'
import { getStringISODate } from '~/components/date-format'
import { titleForms } from '../constants'

/**
 * Function validates values from VellociRegister form.
 */
export const getValidationSchema = () =>
  Yup.lazy(values => {
    const { requiredMessage, invalidString, invalidEmail, minLength } = errorMessages
    const minLengthValue = 3
    const minLengthErr = minLength(minLengthValue)

    return Yup.object().shape({
      controlPerson: Yup.lazy(() => {
        const taxNumber = values.controlPerson.isEin
          ? { ein: einValidation() }
          : {
              ssn: Yup.string()
                .trim()
                .test('num-length', errorMessages.exactDigits(9), value => /^[0-9]{9}$/.test(value))
                .required(errorMessages.requiredMessage)
            }
        return Yup.object().shape({
          isControlPerson: Yup.boolean().oneOf([true], errorMessages.requiredMessage),
          entityType: Yup.string().typeError(invalidString).required(errorMessages.requiredMessage),
          legalBusinessName: Yup.string(invalidString)
            .typeError(invalidString)
            .min(minLengthValue, minLengthErr)
            .required(requiredMessage),
          ...taxNumber,
          naicsCode: Yup.number()
            .typeError(errorMessages.requiredMessage)
            .required(errorMessages.requiredMessage)
            .positive(errorMessages.positive)
        })
      }),
      businessInfo: Yup.lazy(() => {
        return Yup.object().shape({
          phoneNumber: phoneValidation(10).required(requiredMessage),
          email: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
          url: websiteValidationNotRequired(),
          address: addressValidationSchema(),
          dba: Yup.string(invalidString).typeError(invalidString)
        })
      }),
      companyFormationDocument: Yup.lazy(() => {
        return Yup.object().shape({
          attachments: Yup.array().min(1, errorMessages.minOneAttachment)
        })
      }),
      ownerInformation: Yup.lazy(() => {
        return Yup.object().shape({
          isBeneficialOwner: Yup.boolean(),
          isNotBeneficialOwner: Yup.boolean(),
          isOtherBeneficialOwner: Yup.boolean(),
          isNotOtherBeneficialOwner: Yup.boolean()
        })
      }),
      verifyPersonalInformation: Yup.array().of(
        Yup.lazy(v => {
          //let isAnyValueFilled = deepSearch(v, (val, key) => val !== '' && key !== 'country')
          const businessOwnershipPercentage = values.ownerInformation.isBeneficialOwner
            ? {
                businessOwnershipPercentage: Yup.string()
                  .trim()
                  .required(errorMessages.requiredMessage)
                  .test('v', errorMessages.minimum(0), function (v) {
                    if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                    return Number(v) >= 0
                  })
                  .test('v', errorMessages.maximum(100), function (v) {
                    if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                    return Number(v) <= 100
                  })
                  .test('v', errorMessages.mustBeNumber, function (v) {
                    return v === null || v === '' || !isNaN(v)
                  })
              }
            : null
          return Yup.object().shape({
            firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
            lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
            email: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
            phoneNumber: phoneValidation(10).required(requiredMessage),
            dateOfBirth: Yup.string()
              .test('min-age', errorMessages.aboveAge(18), val => moment().diff(getStringISODate(val), 'years') >= 18)
              .concat(dateValidation(true)),
            address: addressValidationSchema(),
            businessRole: Yup.string()
              .trim()
              .min(3, errorMessages.minLength(3))
              .required(errorMessages.requiredMessage),
            businessTitle: Yup.string()
              .trim()
              .min(3, errorMessages.minLength(3))
              .required(errorMessages.requiredMessage),
            socialSecurityNumber: Yup.string()
              .trim()
              .min(9, errorMessages.minLength(9))
              .max(9, errorMessages.maxLength(9))
              .required(errorMessages.requiredMessage),
            ...businessOwnershipPercentage
          })
        })
      ),
      termsAndConditions: Yup.object().shape({
        electronicComunications: Yup.boolean()
          .required(errorMessages.requiredMessage)
          .oneOf([true], errorMessages.requiredMessage),
        privacyPolicy: Yup.boolean()
          .required(errorMessages.requiredMessage)
          .oneOf([true], errorMessages.requiredMessage),
        depositAccountAgreement: Yup.boolean()
          .required(errorMessages.requiredMessage)
          .oneOf([true], errorMessages.requiredMessage),
        trueComplete: Yup.boolean().required(errorMessages.requiredMessage).oneOf([true], errorMessages.requiredMessage)
      })
    })
  })

/**
 * Function prepares values from form to request body for BE request.
 *
 * @param {object} values The object of values from form.
 * @return {object} The new object prepared for BE request.
 */
export const getBody = values => {
  const { controlPerson, businessInfo, ownerInformation, verifyPersonalInformation } = values
  let tinNumber = getSafe(() => controlPerson.isEin, false) ? controlPerson.ein : controlPerson.ssn
  let beneficialOwners = getSafe(() => verifyPersonalInformation.length, false)
    ? verifyPersonalInformation.map((val, i) => {
        const obj = {
          address: getSafe(() => val.address.streetAddress, ''),
          businessRole: getSafe(() => val.businessRole, ''),
          businessTitle: getSafe(() => val.businessTitle, ''),
          city: getSafe(() => val.address.city, ''),
          dateOfBirth: getSafe(() => getStringISODate(val.dateOfBirth), '')
            ? new Date(getStringISODate(val.dateOfBirth))
            : '',
          firstName: getSafe(() => val.firstName, ''),
          lastName: getSafe(() => val.lastName, ''),
          ownershipPercentage: val.businessOwnershipPercentage
            ? parseInt(getSafe(() => val.businessOwnershipPercentage, 0))
            : 0,
          phone: getSafe(() => val.phoneNumber.substring(1), ''),
          provinceId: getSafe(() => val.address.province, ''),
          zipCode: getSafe(() => val.address.zip, ''),
          ssn: getSafe(() => val.socialSecurityNumber, ''),
          email: getSafe(() => val.email, '')
        }
        return getObjectWithoutEmptyElements(obj)
      })
    : null

  let controller = { ...beneficialOwners[0] }
  if (getSafe(() => ownerInformation.isBeneficialOwner, false)) {
    controller.businessRole = 'controlling_officer'
  }
  if (beneficialOwners.length > 1) {
    beneficialOwners.shift()
  } else {
    beneficialOwners = null
  }

  let result = {
    dba: getSafe(() => businessInfo.dba, ''),
    email: getSafe(() => businessInfo.email, ''),
    entityType: getSafe(() => controlPerson.entityType, ''),
    legalAddress: getSafe(() => businessInfo.address.streetAddress, ''),
    legalCity: getSafe(() => businessInfo.address.city, ''),
    legalName: getSafe(() => controlPerson.legalBusinessName, ''),
    provinceId: getSafe(() => businessInfo.address.province, ''),
    legalZipCode: getSafe(() => businessInfo.address.zip, ''),
    naicsCode: getSafe(() => controlPerson.naicsCode, ''),
    phone: getSafe(() => businessInfo.phoneNumber.substring(1), ''),
    tinNumber: getSafe(() => tinNumber, ''),
    controller,
    beneficialOwners,
    website: getSafe(() => businessInfo.url, '')
  }
  return getObjectWithoutEmptyElements(result)
}

/**
 * Function submit form or move user to the next page.
 * @param {object} formikProps The object of values from form.
 * @param {number} activeStep The index of active page.
 * @param {function} nextStep The redux action which moves user to the next page.
 */
export const submitForm = async (formikProps, activeStep, nextStep) => {
  formikProps
    .validateForm()
    .then(errors => {
      if (errors[titleForms[activeStep]] || activeStep === 6) {
        formikProps.handleSubmit()
      } else if ((_.isEmpty(errors) && activeStep !== 6) || (!errors[titleForms[activeStep]] && activeStep !== 6)) {
        nextStep(activeStep + 1)
        formikProps.setErrors({})
      }
    })
    .catch(err => console.log('catch', err))
}

/**
 * Function handle submit form and register Velloci.
 * @param {object} values The object of values from form.
 * @param {object} props The props of velloci form.
 * @param {object} selfFormikProps The object of formik props.
 */
export const handleSubmit = async (values, props, selfFormikProps) => {
  if (props.activeStep !== 6) return

  try {
    props.loadSubmitButton(true)
    const body = getBody(values)

    const files = getSafe(() => values.companyFormationDocument.attachments, '')
    let companyId = null
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(getSafe(() => window.location.search, ''))
      if (searchParams.has('companyId')) {
        companyId = Number(searchParams.get('companyId'))
      }
    }

    await props.postRegisterVelloci(body, companyId, files)
    if (companyId) {
      Router.push('/companies/companies')
    } else {
      await props.getIdentity()
      Router.push('/settings/bank-accounts')
    }
  } catch (error) {
    console.error(error)
  } finally {
    props.loadSubmitButton(false)
    selfFormikProps.setSubmitting(false)
  }
}
