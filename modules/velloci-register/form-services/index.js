import * as Yup from 'yup'
import moment from 'moment'
//Components
import {
  stringValidation,
  errorMessages,
  addressValidationSchema,
  einValidation,
  websiteValidationNotRequired,
  dateValidation,
  phoneValidation,
  fileValidation
} from '~/constants/yupValidation'
import Router from 'next/router'
//Services
import { getObjectWithoutEmptyElements } from '~/services'
import { getSafe } from '~/utils/functions'
import { getStringISODate } from '~/components/date-format'
import { titleForms } from '../constants'
import { isEmptyObject } from '../../../services'
import { makeStore } from '../../../store'

const FINAL_STEP = makeStore()?.getState()?.vellociRegister?.finalStep

/**
 * Function validates values from VellociRegister form.
 *  @category Velloci Register
 * @method
 */
export const getValidationSchema = (beneficialOwnersNotified = false) =>
  Yup.lazy(values => {
    const { requiredMessage, invalidString, invalidEmail, minLength } = errorMessages
    const minLengthValue = 3
    const minLengthErr = minLength(minLengthValue)

    return Yup.object().shape({
      businessInfo: Yup.lazy(() => {
        const taxNumber = values.businessInfo.isEin
          ? { ein: einValidation() }
          : {
              ssn: Yup.string()
                .trim()
                .test('num-length', errorMessages.exactDigits(9), value => /^[0-9]{9}$/.test(value))
                .required(errorMessages.requiredMessage)
            }
        return Yup.object().shape({
          phoneNumber: phoneValidation(10).required(requiredMessage),
          email: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
          url: websiteValidationNotRequired(),
          address: addressValidationSchema(),
          dba: Yup.string(invalidString).typeError(invalidString),
          entityType: Yup.string().typeError(invalidString).required(errorMessages.requiredMessage),
          legalBusinessName: Yup.string(invalidString)
            .typeError(invalidString)
            .min(minLengthValue, minLengthErr)
            .required(requiredMessage),
          ...taxNumber,
          naicsCode: Yup.number()
            .typeError(errorMessages.requiredMessage)
            .required(errorMessages.requiredMessage)
            .positive(errorMessages.positive),
          companyType: stringValidation(),
          markets: stringValidation()
        })
      }),
      controlPerson: Yup.lazy(() => {
        const businessOwnershipPercentage = values?.controlPerson?.isBeneficialOwner
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
          isControlPerson: Yup.boolean().oneOf([true], errorMessages.requiredMessage),
          isBeneficialOwner: Yup.boolean().required().oneOf([true, false], errorMessages.requiredMessage),
          isNotBeneficialOwner: Yup.boolean().required().oneOf([true, false], errorMessages.requiredMessage),
          firstName: stringValidation(),
          lastName: stringValidation(),
          email: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
          phoneNumber: phoneValidation(10).required(requiredMessage),
          dateOfBirth: Yup.string()
              .test('min-age', errorMessages.aboveAge(18), val => moment().diff(getStringISODate(val), 'years') >= 18)
              .concat(dateValidation(true)),
          address: addressValidationSchema(),
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
      }),
      ownerInformation: Yup.lazy(() => {
        return Yup.object().shape({
          isOtherBeneficialOwner: Yup.boolean(),
          isNotOtherBeneficialOwner: Yup.boolean()
        })
      }),
      // if no other BOs or they have been notified, do not require form validation here
      verifyPersonalInformation: !values.ownerInformation.isOtherBeneficialOwner || beneficialOwnersNotified ? null : Yup.array().of(
        Yup.lazy(v => {
          //let isAnyValueFilled = deepSearch(v, (val, key) => val !== '' && key !== 'country')
          const businessOwnershipPercentage = values.ownerInformation.isOtherBeneficialOwner
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
            firstName: Yup.string().trim().min(1, errorMessages.minLength(1)).required(errorMessages.requiredMessage),
            lastName: Yup.string().trim().min(1, errorMessages.minLength(1)).required(errorMessages.requiredMessage),
            email: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
            phoneNumber: phoneValidation(10).required(requiredMessage),
            dateOfBirth: Yup.string()
              .test('min-age', errorMessages.aboveAge(18), val => moment().diff(getStringISODate(val), 'years') >= 18)
              .concat(dateValidation(true)),
            address: addressValidationSchema(),
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
      }),
      certificateOfInsurance: fileValidation()
    })
  })

/**
 * Function prepares values from form to request body for BE request.
 *  @category Velloci Register
 * @method
 * @param {object} values The object of values from form.
 * @return {object} The new object prepared for BE request.
 */
export const getBody = (values, beneficialOwnersNotified) => {
  const { controlPerson, businessInfo, ownerInformation, verifyPersonalInformation } = values
  const tinNumber = getSafe(() => businessInfo.isEin, false) ? businessInfo.ein : businessInfo.ssn

  /**
   * BeneficialOwners payload should be null
   *  - when there are no other BOs
   *  - when other BOs have been notified
   */
  const beneficialOwners = ownerInformation.isNotOtherBeneficialOwner || beneficialOwnersNotified ?
    null : getSafe(() => verifyPersonalInformation.length, false)
    ? verifyPersonalInformation.map((val) => {
        const obj = {
          address: getSafe(() => val.address.streetAddress, ''),
          businessRole: 'beneficial_owner',
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

  const controller = getSafe(() => controlPerson, null) ? 
      {
        address: getSafe(() => controlPerson.address.streetAddress, ''),
        ownershipPercentage: controlPerson.businessOwnershipPercentage
            ? parseInt(getSafe(() => controlPerson.businessOwnershipPercentage, 0))
            : 0,
        businessRole: 'controlling_officer',
        businessTitle: getSafe(() => controlPerson.businessTitle, ''),
        city: getSafe(() => controlPerson.address.city, ''),
        dateOfBirth: getSafe(() => getStringISODate(controlPerson.dateOfBirth), ''),
        firstName: getSafe(() => controlPerson.firstName, ''),
        lastName: getSafe(() => controlPerson.lastName, ''),
        middleName: getSafe(() => controlPerson.middleName, ''),
        phone: getSafe(() => controlPerson.phoneNumber.substring(1), ''),
        provinceId: getSafe(() => controlPerson.address.province, ''),
        zipCode: getSafe(() => controlPerson.address.zip, ''),
        ssn: getSafe(() => controlPerson.socialSecurityNumber, ''),
        email: getSafe(() => controlPerson.email, '')
      } : null

  const result = {
    dba: getSafe(() => businessInfo.dba, ''),
    email: getSafe(() => businessInfo.email, ''),
    entityType: getSafe(() => businessInfo.entityType, ''),
    legalAddress: getSafe(() => businessInfo.address.streetAddress, ''),
    legalCity: getSafe(() => businessInfo.address.city, ''),
    legalName: getSafe(() => businessInfo.legalBusinessName, ''),
    provinceId: getSafe(() => businessInfo.address.province, ''),
    legalZipCode: getSafe(() => businessInfo.address.zip, ''),
    naicsCode: getSafe(() => businessInfo.naicsCode, ''),
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
 * @category Velloci Register
 * @method
 * @param {object} formikProps The object of values from form.
 * @param {number} activeStep The index of active page.
 * @param {function} nextStep The redux action which moves user to the next page.
 */
export const submitForm = async (formikProps, activeStep, nextStep, mainContainer, overrideRequest = null) => {
  formikProps
    .validateForm()
    .then(errors => {
      // if (errors[titleForms[activeStep]] && activeStep !== FINAL_STEP) {
      //   formikProps.setErrors({})
      // }

      if (overrideRequest) {
        sendRequest(formikProps?.values, overrideRequest?.extraProps, overrideRequest?.selfFormikProps, overrideRequest?.beneficialOwnersNotified)
        nextStep(activeStep + 1)
      } else {
        if (errors[titleForms[activeStep]] || activeStep === FINAL_STEP) {
          formikProps.handleSubmit()
        } else if ((_.isEmpty(errors) && activeStep !== FINAL_STEP) || (!errors[titleForms[activeStep]] && activeStep !== FINAL_STEP)) {
          nextStep(activeStep + 1)
          mainContainer.current.scroll({ top: 0, left: 0, behavior: 'smooth' })
          formikProps.setErrors({})
        }
      }

    })
    .catch(err => console.error('catch', err))
}

/**
 * Function handle submit form and register Velloci.
 *  @category Velloci Register
 * @method
 * @param {object} values The object of values from form.
 * @param {object} props The props of velloci form.
 * @param {object} selfFormikProps The object of formik props.
 * @param {boolean} beneficialOwnersNotified Boolean to determine if BOs have been notified/emailed
 */
export const handleSubmit = async (values, props, selfFormikProps, beneficialOwnersNotified) => {
  if (props.activeStep !== FINAL_STEP) return

  sendRequest(values, props, selfFormikProps, beneficialOwnersNotified)
}

export const sendRequest = async (values, props, selfFormikProps, beneficialOwnersNotified) => {
  try {
    props?.loadSubmitButton(false)
    const body = getBody(values, beneficialOwnersNotified)

    const files = getSafe(() => values.companyFormationDocument.attachments, '')
    let companyId = null
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(getSafe(() => window.location.search, ''))
      if (searchParams.has('companyId')) {
        companyId = Number(searchParams.get('companyId'))
      }
    }

    if (
      props?.naicsCode !== values?.businessInfo?.naicsCode &&
      props?.companyId &&
      typeof props?.companyRequestBody === 'object' &&
      !isEmptyObject(props?.companyRequestBody)
    ) {
      const companyRequestBody = {
        ...props?.companyRequestBody,
        naicsCode: values?.businessInfo?.naicsCode
      }
      await props?.updateCompany(props?.companyId, companyRequestBody)
    }

    await props.postRegisterVelloci(body, companyId, files)
    if (companyId) {
      Router.push('/companies/companies')
    } else {
      await props.getIdentity()
      // Router.push('/settings/bank-accounts')
    }
  } catch (error) {
    console.error(error)
  } finally {
    // props.loadSubmitButton(false)
    selfFormikProps.setSubmitting(false)
  }
}

export const redirect = location => {
  Router.push(location)
}
