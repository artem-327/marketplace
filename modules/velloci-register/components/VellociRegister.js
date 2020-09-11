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
import ControlPerson from './steps/ControlPerson'
import BusinessInfo from './steps/BusinessInfo'
import FormationDocument from './steps/FormationDocument'
import OwnerInformation from './steps/OwnerInformation'
import PersonalInformation from './steps/PersonalInformation'
import TermsAndConditions from './steps/TermsAndConditions'
import { titleIds, subtitleIds, titleForms, initialValues, verifyPersonalInformation } from '../constants'
import ErrorFocus from '~/components/error-focus'
import { PHONE_REGEXP } from '~/src/utils/constants'
import { getStringISODate } from '~/components/date-format'
import { getSafe } from '~/utils/functions'

class VellociRegister extends Component {
  state = {
    initialValues: { ...initialValues, verifyPersonalInformation: [verifyPersonalInformation] }
  }
  componentDidMount = () => {
    const { entityTypes, getEntityTypes } = this.props
    if (getSafe(() => entityTypes.data.length, 0) === 0) {
      try {
        getEntityTypes()
      } catch (error) {
        console.error(error)
      }
    }
  }

  componentWillUnmount = () => {
    this.props.cleareActiveStep()
  }

  getBody = values => {
    const {
      controlPerson,
      businessInfo,
      companyFormationDocument,
      ownerInformation,
      verifyPersonalInformation
    } = values

    let naicsCode = getSafe(() => controlPerson.isEin, false)
      ? getSafe(() => controlPerson.ein, '')
      : getSafe(() => controlPerson.ssn, '')

    let beneficialOwners =
      getSafe(() => ownerInformation.isBeneficialOwner, false) ||
      (getSafe(() => ownerInformation.isOtherBeneficialOwner, false) &&
        getSafe(() => verifyPersonalInformation.length, false))
        ? verifyPersonalInformation.map((val, i) => {
            return {
              address: getSafe(() => val.address.streetAddress, ''),
              businessRole: getSafe(() => val.businessRole, ''),
              businessTitle: getSafe(() => val.businessRole, ''),
              city: getSafe(() => val.address.city, ''),
              dateOfBirth: getSafe(() => getStringISODate(val.dateOfBirth), ''),
              firstName: getSafe(() => val.firstName, ''),
              lastName: getSafe(() => val.lastName, ''),
              ownershipPercentage: getSafe(() => val.businessOwnershipPercentage, ''),
              phone: getSafe(() => val.phoneNumber, ''),
              state: getSafe(() => val.address.country, ''),
              zipCode: getSafe(() => val.address.zip, ''),
              ssn: getSafe(() => val.socialSecurityNumber, ''),
              email: getSafe(() => val.email, '')
            }
          })
        : null
    let result = {
      attachments: getSafe(() => companyFormationDocument.attachments, ''),
      dba: getSafe(() => businessInfo.dba, ''),
      email: getSafe(() => businessInfo.email, ''),
      entityType: getSafe(() => controlPerson.entityType, ''),
      legalAddress: getSafe(() => businessInfo.address.streetAddress, ''),
      legalCity: getSafe(() => businessInfo.address.city, ''),
      legalName: getSafe(() => businessInfo.address.streetAddress, ''),
      legalState: getSafe(() => businessInfo.address.country, ''),
      legalZipCode: getSafe(() => businessInfo.address.zip, ''),
      naicsCode,
      phone: getSafe(() => businessInfo.phoneNumber, ''),
      tinNumber: getSafe(() => controlPerson.tinNumber, ''),
      controller: {
        address: getSafe(() => verifyPersonalInformation[0].address.streetAddress, ''),
        businessRole: getSafe(() => verifyPersonalInformation[0].businessRole, ''),
        businessTitle: getSafe(() => verifyPersonalInformation[0].businessRole, ''),
        city: getSafe(() => verifyPersonalInformation[0].address.city, ''),
        dateOfBirth: getSafe(() => getStringISODate(verifyPersonalInformation[0].dateOfBirth), ''),
        firstName: getSafe(() => verifyPersonalInformation[0].firstName, ''),
        lastName: getSafe(() => verifyPersonalInformation[0].lastName, ''),
        ownershipPercentage: getSafe(() => verifyPersonalInformation[0].businessOwnershipPercentage, ''),
        phone: getSafe(() => verifyPersonalInformation[0].phoneNumber, ''),
        state: getSafe(() => verifyPersonalInformation[0].address.country, ''),
        zipCode: getSafe(() => verifyPersonalInformation[0].address.zip, ''),
        ssn: getSafe(() => verifyPersonalInformation[0].socialSecurityNumber, ''),
        email: getSafe(() => verifyPersonalInformation[0].email, '')
      },
      beneficialOwners,
      website: getSafe(() => businessInfo.url, '')
    }
    return result
  }

  handleSubmit = async values => {
    const { activeStep, postRegisterVelloci } = this.props
    if (activeStep !== 5) return

    try {
      const body = this.getBody(values)
      console.log('Submit form. Values for BE call:')
      console.log(body)
      await postRegisterVelloci(body)
    } catch (error) {
      console.error(error)
    }
  }

  submitForm = async formikProps => {
    const { nextStep, activeStep } = this.props

    formikProps
      .validateForm()
      .then(errors => {
        if (errors[titleForms[activeStep]] || activeStep === 5) {
          formikProps.handleSubmit()
        } else if ((_.isEmpty(errors) && activeStep !== 5) || (!errors[titleForms[activeStep]] && activeStep !== 5)) {
          nextStep(activeStep + 1)
          formikProps.setErrors({})
        }
      })
      .catch(err => console.log('catch', err))
  }
  //TODO fix validation based on BE fields and story
  getValidationSchema = () =>
    Yup.lazy(values => {
      const { requiredMessage, invalidString, invalidEmail, minLength, invalidPhoneNumber } = errorMessages
      const minLengthValue = 3
      const minLengthErr = minLength(minLengthValue)

      return Yup.object().shape({
        controlPerson: Yup.lazy(() => {
          const taxNumber = values.controlPerson.isEin
            ? { ein: einValidation() }
            : { ssn: Yup.string().trim().min(8, errorMessages.minDigits(8)).required(errorMessages.requiredMessage) }
          return Yup.object().shape({
            isControlPerson: Yup.boolean().oneOf([true], errorMessages.requiredMessage),
            entityType: Yup.string().typeError(invalidString).required(errorMessages.requiredMessage),
            legalBusinessName: Yup.string(invalidString)
              .typeError(invalidString)
              .min(minLengthValue, minLengthErr)
              .required(requiredMessage),
            ...taxNumber,
            tinNumber: Yup.string().typeError(invalidString).required(errorMessages.requiredMessage)
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
              socialSecurityNumber: Yup.string()
                .trim()
                .min(10, errorMessages.minLength(10))
                .required(errorMessages.requiredMessage),
              businessOwnershipPercentage: Yup.string().required(errorMessages.requiredMessage)
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
    const { activeStep, entityTypes, numberBeneficialOwners } = this.props
    let error = getSafe(() => formikProps.errors.companyFormationDocument.attachments, false)

    switch (activeStep) {
      case 0: {
        return <ControlPerson formikProps={formikProps} entityTypes={entityTypes} />
      }
      case 1: {
        return <BusinessInfo formikProps={formikProps} />
      }
      case 2: {
        return <FormationDocument formikProps={formikProps} error={error} />
      }
      case 3: {
        return <OwnerInformation formikProps={formikProps} />
      }
      case 4: {
        return <PersonalInformation formikProps={formikProps} numberBeneficialOwners={numberBeneficialOwners} />
      }
      case 5: {
        return <TermsAndConditions formikProps={formikProps} />
      }
      default:
        return null
    }
  }

  render() {
    const { prevStep, activeStep, countBeneficialOwners, numberBeneficialOwners } = this.props
    return (
      <Grid>
        <GridColumn>
          <GridRow>
            <SetupIndicator activeStep={activeStep} />
            <Formik
              onSubmit={this.handleSubmit}
              enableReinitialize
              validateOnChange={true}
              initialValues={this.state.initialValues}
              validationSchema={this.getValidationSchema()}
              render={formikProps => {
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
                        countBeneficialOwners={countBeneficialOwners}>
                        {this.getContent(formikProps)}
                      </FormRectangle>
                    </Grid>
                    <ErrorFocus />
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
