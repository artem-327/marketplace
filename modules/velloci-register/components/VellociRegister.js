import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow, Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import _ from 'lodash'
import * as Yup from 'yup'
import moment from 'moment'
//Components
import {
  errorMessages,
  addressValidationSchema,
  einValidation,
  websiteValidationNotRequired,
  dateValidation
} from '~/constants/yupValidation'
import SetupIndicator from './SetupIndicator'
import FormRectangle from './FormRectangle'
import CompanyVerification from './steps/CompanyVerification'
import ControlPerson from './steps/ControlPerson'
import BusinessInfo from './steps/BusinessInfo'
import FormationDocument from './steps/FormationDocument'
import OwnerInformation from './steps/OwnerInformation'
import PersonalInformation from './steps/PersonalInformation'
import TermsAndConditions from './steps/TermsAndConditions'
import { titleIds, subtitleIds, titleForms, verifyPersonalInformation } from '../constants'
import ErrorFocus from '~/components/error-focus'
import { PHONE_REGEXP } from '~/utils/constants'
import { getStringISODate } from '~/components/date-format'
import { getSafe } from '~/utils/functions'
import Router from 'next/router'
import BeneficialOwnersPopup from './steps/BeneficialOwnersPopup'

class VellociRegister extends Component {
  componentDidMount() {
    const {
      entityTypes,
      getEntityTypes,
      naicsCodes,
      getNaicsCodes,
      businessRoles,
      getBusinessRoles,
      entityDocuments,
      getEntityDocuments,
      politicallyExposedPersons,
      getPoliticallyExposedPersons,
      tinTypes,
      getTinTypes,
      businessDetails,
      getBusinessDetails
    } = this.props
    try {
      !getSafe(() => entityTypes.data.length, false) && getEntityTypes()
      !getSafe(() => naicsCodes.data.length, false) && getNaicsCodes()
      !getSafe(() => businessRoles.data.length, false) && getBusinessRoles()
      !getSafe(() => entityDocuments.data.length, false) && getEntityDocuments()
      !getSafe(() => politicallyExposedPersons.data.length, false) && getPoliticallyExposedPersons()
      //!getSafe(() => tinTypes.data.length, false) && getTinTypes()
    } catch (error) {
      console.error(error)
    }
  }

  componentWillUnmount = () => {
    this.props.cleareActiveStep()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.numberBeneficialOwners > prevProps.numberBeneficialOwners) {
      // Add Benefical owner
      const { values, setFieldValue } = this.formikProps
      let newPersonalInformation = values.verifyPersonalInformation.slice()
      newPersonalInformation.push({
        ...verifyPersonalInformation,
        businessRole: 'beneficial_owner'
      })
      setFieldValue('verifyPersonalInformation', newPersonalInformation)
    } else if (this.props.numberBeneficialOwners < prevProps.numberBeneficialOwners) {
      // Delete last Benefical owner
      const { values, setFieldValue } = this.formikProps
      let newPersonalInformation = values.verifyPersonalInformation.slice(0, -1)
      setFieldValue('verifyPersonalInformation', newPersonalInformation)
    }
  }

  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName]
      }
    }
    return obj
  }

  getBody = values => {
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
          return this.clean(obj)
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
    return this.clean(result)
  }

  handleSubmit = async values => {
    const { activeStep, postRegisterVelloci, postUploadDocuments, getIdentity, loadSubmitButton } = this.props
    if (activeStep !== 6) return

    try {
      loadSubmitButton(true)
      const body = this.getBody(values)

      const files = getSafe(() => values.companyFormationDocument.attachments, '')
      let companyId = null
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(getSafe(() => window.location.search, ''))
        if (searchParams.has('companyId')) {
          companyId = Number(searchParams.get('companyId'))
        }
      }

      await postRegisterVelloci(body, companyId, files)
      if (companyId) {
        Router.push('/companies/companies')
      } else {
        await getIdentity()
        Router.push('/settings/bank-accounts')
      }
    } catch (error) {
      console.error(error)
    } finally {
      loadSubmitButton(false)
      this.formikProps.setSubmitting(false)
    }
  }

  submitForm = async formikProps => {
    const { nextStep, activeStep } = this.props

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

  getValidationSchema = () =>
    Yup.lazy(values => {
      const { requiredMessage, invalidString, invalidEmail, minLength, invalidPhoneNumber } = errorMessages
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
            phoneNumber: Yup.string().matches(PHONE_REGEXP, invalidPhoneNumber).required(requiredMessage),
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
              phoneNumber: Yup.string().matches(PHONE_REGEXP, invalidPhoneNumber).required(requiredMessage),
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
        termsAndConditions: Yup.lazy(() => {
          return Yup.object().shape({
            electronicComunications: Yup.boolean()
              .required(errorMessages.requiredMessage)
              .oneOf([true], errorMessages.requiredMessage),
            privacyPolicy: Yup.boolean()
              .required(errorMessages.requiredMessage)
              .oneOf([true], errorMessages.requiredMessage),
            depositAccountAgreement: Yup.boolean()
              .required(errorMessages.requiredMessage)
              .oneOf([true], errorMessages.requiredMessage),
            trueComplete: Yup.boolean()
              .required(errorMessages.requiredMessage)
              .oneOf([true], errorMessages.requiredMessage)
          })
        })
      })
    })

  getContent = formikProps => {
    const {
      activeStep,
      entityTypes,
      numberBeneficialOwners,
      naicsCodes,
      businessRoles,
      entityDocuments,
      politicallyExposedPersons,
      countBeneficialOwners
    } = this.props
    let error = getSafe(() => formikProps.errors.companyFormationDocument.attachments, false)

    switch (activeStep) {
      case 0: {
        return <CompanyVerification formikProps={formikProps} />
      }
      case 1: {
        return <ControlPerson formikProps={formikProps} entityTypes={entityTypes} naicsCodes={naicsCodes} />
      }
      case 2: {
        return <BusinessInfo formikProps={formikProps} />
      }
      case 3: {
        return <FormationDocument formikProps={formikProps} error={error} entityDocuments={entityDocuments} />
      }
      case 4: {
        return <OwnerInformation formikProps={formikProps} countBeneficialOwners={countBeneficialOwners} />
      }
      case 5: {
        return (
          <PersonalInformation
            formikProps={formikProps}
            businessRoles={businessRoles}
            numberBeneficialOwners={numberBeneficialOwners}
          />
        )
      }
      case 6: {
        return <TermsAndConditions formikProps={formikProps} />
      }
      default:
        return null
    }
  }

  render() {
    const {
      prevStep,
      activeStep,
      countBeneficialOwners,
      numberBeneficialOwners,
      isLoadingSubmitButton,
      initialValues,
      openEmailPopup,
      emailPopup
    } = this.props
    return (
      <Grid>
        <GridColumn>
          <GridRow>
            <SetupIndicator activeStep={activeStep} />
            <Formik
              onSubmit={this.handleSubmit}
              enableReinitialize
              validateOnChange={true}
              initialValues={initialValues}
              validationSchema={this.getValidationSchema()}
              render={formikProps => {
                this.formikProps = formikProps
                return (
                  <Form>
                    <Grid verticalAlign='middle' centered>
                      <FormRectangle
                        formikProps={formikProps}
                        title={titleIds[activeStep]}
                        subtitle={subtitleIds[activeStep]}
                        prevStep={prevStep}
                        submitForm={this.submitForm}
                        activeStep={activeStep}
                        numberBeneficialOwners={numberBeneficialOwners}
                        countBeneficialOwners={countBeneficialOwners}
                        isLoadingSubmitButton={isLoadingSubmitButton}
                        openEmailPopup={openEmailPopup}>
                        {this.getContent(formikProps)}
                      </FormRectangle>
                    </Grid>
                    <ErrorFocus />
                    {emailPopup.isOpen && <BeneficialOwnersPopup />}
                  </Form>
                )
              }}
            />
          </GridRow>
        </GridColumn>
      </Grid>
    )
  }
}

VellociRegister.propTypes = {
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  activeStep: PropTypes.number,
  businessTypes: PropTypes.object,
  getBusinessTypes: PropTypes.func,
  countBeneficialOwners: PropTypes.func,
  numberBeneficialOwners: PropTypes.number
}

VellociRegister.defaultProps = {
  nextStep: () => {},
  prevStep: () => {},
  getBusinessTypes: () => {},
  activeStep: 0,
  businessTypes: {},
  countBeneficialOwners: () => {},
  numberBeneficialOwners: 0
}

export default VellociRegister
