import React, { Component } from 'react'
import { Grid, GridColumn, GridRow, Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import { errorMessages, addressValidationSchema, einValidation, websiteValidation } from '~/constants/yupValidation'

import SetupIndicator from './SetupIndicator'
import FormRectangle from './FormRectangle'
import ControlPerson from './steps/ControlPerson'
import BusinessInfo from './steps/BusinessInfo'
import FormationDocument from './steps/FormationDocument'
import OwnerInformation from './steps/OwnerInformation'
import PersonalInformation from './steps/PersonalInformation'
import TermsAndConditions from './steps/TermsAndConditions'
import { titleIds, subtitleIds } from '../constants'

import * as Yup from 'yup'

const initialValues = {
  isControlPerson: false,
  legalBusinessName: '',
  kindBusiness: '',
  isEin: true,
  isSsn: false,
  ein: '',
  ssn: '',
  isEstablishedUs: true,
  phoneNumber: '',
  emailAddres: '',
  url: '',
  streetAddress: '',
  city: '',
  country: '',
  zip: '',
  province: '',
  dbaName: '',
  attachments: [],
  isBeneficialOwner: false,
  isNotBeneficialOwner: false,
  isOtherBeneficialOwner: false,
  isNotOtherBeneficialOwner: false,
  firstName: '',
  lastName: '',
  middleName: '',
  personalEmailAddress: '',
  personalPhoneNumber: '',
  dateOfBirth: '',
  personalAddress: {
    streetAddress: '',
    city: '',
    country: '',
    zip: '',
    province: ''
  },
  businessRole: '',
  socialSecurityNumber: '',
  businessOwnershipPercentage: ''
}

class VellociRegister extends Component {
  getContent = formikProps => {
    const { activeStep } = this.props
    switch (activeStep) {
      case 0: {
        return <ControlPerson formikProps={formikProps} />
      }
      case 1: {
        return <BusinessInfo formikProps={formikProps} />
      }
      case 2: {
        return <FormationDocument formikProps={formikProps} />
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

  componentWillUnmount = () => {
    this.props.cleareActiveStep()
  }

  handleSubmit = async values => {
    const { nextStep, activeStep } = this.props

    if (activeStep === 5) {
      console.log('handleSubmit', values)
    } else {
      nextStep(activeStep + 1)
    }
  }

  getValidationSchema = () => {
    const { requiredMessage, invalidString, invalidEmail, minLength } = errorMessages
    const minLengthValue = 3
    const minLengthErr = minLength(minLengthValue)
    return {
      legalBusinessName: Yup.string(invalidString)
        .typeError(invalidString)
        .min(minLengthValue, minLengthErr)
        .required(requiredMessage),
      ein: einValidation(),
      ssn: Yup.string().trim().min(8, errorMessages.minDigits(8)).required(errorMessages.requiredMessage),
      emailAddress: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage),
      url: websiteValidation(),
      dbaName: Yup.string(invalidString).typeError(invalidString)
    }
  }

  render() {
    const { activeStep, prevStep } = this.props
    return (
      <Grid>
        <GridColumn>
          <GridRow>
            <SetupIndicator activeStep={activeStep} />
            <Formik
              onSubmit={this.handleSubmit}
              enableReinitialize
              initialValues={initialValues}
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
                        activeStep={activeStep}>
                        {this.getContent(formikProps)}
                      </FormRectangle>
                    </Grid>
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

export default VellociRegister
