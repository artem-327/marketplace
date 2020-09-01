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
import { titleIds, subtitleIds, titleForms, initialValues } from '../constants'
import ErrorFocus from '~/components/error-focus'
import { PHONE_REGEXP } from '~/src/utils/constants'
import { getStringISODate } from '~/components/date-format'
import { getSafe } from '~/utils/functions'

class VellociRegister extends Component {
  componentDidMount = () => {
    const { businessTypes, businessClassifications, getBusinessTypes, getBusinessClassifications } = this.props
    if (businessTypes.data.length === 0) getBusinessTypes()
    if (businessClassifications.length === 0) getBusinessClassifications()
  }

  componentWillUnmount = () => {
    this.props.cleareActiveStep()
  }

  //TODO missing BE call
  handleSubmit = async values => {
    const { activeStep, prevStep } = this.props
    if (activeStep !== 5) return
    try {
      console.log('Submit form successfully. Values for BE call:')
      console.log(values)
    } catch (error) {
      console.error(error)
    }
  }

  submitForm = async formikProps => {
    const { nextStep, activeStep } = this.props
    if (activeStep === 3 && !formikProps.values.ownerInformation.isBeneficialOwner) {
      nextStep(activeStep + 2)
      return
    }
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
            kindBusiness: Yup.number().typeError(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
            legalBusinessName: Yup.string(invalidString)
              .typeError(invalidString)
              .min(minLengthValue, minLengthErr)
              .required(requiredMessage),
            ...taxNumber,
            industryType: Yup.string().typeError(invalidString).required(errorMessages.requiredMessage)
          })
        }),
        businessInfo: Yup.lazy(() => {
          return Yup.object().shape({
            phoneNumber: Yup.string().matches(PHONE_REGEXP, invalidPhoneNumber).required(requiredMessage),
            emailAddress: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
            url: websiteValidationNotRequired(),
            address: addressValidationSchema(),
            dbaName: Yup.string(invalidString).typeError(invalidString)
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
        verifyPersonalInformation: Yup.lazy(() => {
          if (values.ownerInformation.isBeneficialOwner) {
            return Yup.object().shape({
              firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
              lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
              emailAddress: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
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
          } else {
            return Yup.mixed().notRequired()
          }
        }),
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
    const { activeStep, businessTypes, businessClassifications } = this.props
    let error = getSafe(() => formikProps.errors.companyFormationDocument.attachments, false)

    let selectedBusiness = businessClassifications.find(el => el.id === '9ed35a3b-7d6f-11e3-83c8-5404a6144203')
    let industryOptions = selectedBusiness
      ? selectedBusiness.industryClassifications.map(el => ({
          key: el.id,
          value: el.id,
          text: el.name
        }))
      : []

    switch (activeStep) {
      case 0: {
        return (
          <ControlPerson formikProps={formikProps} businessTypes={businessTypes} industryOptions={industryOptions} />
        )
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
        return <PersonalInformation formikProps={formikProps} />
      }
      case 5: {
        return <TermsAndConditions formikProps={formikProps} />
      }
      default:
        return null
    }
  }

  render() {
    const { prevStep, activeStep } = this.props
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
                        activeStep={activeStep}>
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
  businessClassifications: PropTypes.array,
  getBusinessTypes: PropTypes.func,
  getBusinessClassifications: PropTypes.func
}

VellociRegister.defaultProps = {
  nextStep: () => {},
  prevStep: () => {},
  getBusinessTypes: () => {},
  getBusinessTypes: () => {},
  activeStep: 0,
  businessTypes: {},
  businessClassifications: []
}

export default VellociRegister
