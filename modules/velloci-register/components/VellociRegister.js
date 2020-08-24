import React, { Component } from 'react'
import { Grid, GridColumn, GridRow, Segment, Header, Form, Button, Icon, Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { Input, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  errorMessages,
  addressValidationSchema,
  beneficialOwnersValidation,
  dwollaControllerValidation,
  einValidation,
  websiteValidation
} from '~/constants/yupValidation'

import SetupIndicator from './SetupIndicator'
import FormRectangle from './FormRectangle'
import ControlPerson from './steps/ControlPerson'
import { titleIds } from '../constants'

import * as Yup from 'yup'

const initialValues = {
  isControlPerson: false,
  legalBusinessName: '',
  kindBusiness: '',
  ein: true,
  ssn: false
}

class VellociRegister extends Component {
  getContent = formikProps => {
    const { activeStep } = this.props
    switch (activeStep) {
      case 0: {
        return <ControlPerson formikProps={formikProps} />
      }
      case 1: {
        return <ControlPerson formikProps={formikProps} />
      }
      case 2: {
        return <ControlPerson formikProps={formikProps} />
      }
      case 3: {
        return <ControlPerson formikProps={formikProps} />
      }
      case 4: {
        return <ControlPerson formikProps={formikProps} />
      }
      case 5: {
        return <ControlPerson formikProps={formikProps} />
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
      firstName: Yup.string(invalidString)
        .typeError(invalidString)
        .min(minLengthValue, minLengthErr)
        .required(requiredMessage),
      basicNumber: Yup.number(requiredMessage).typeError(requiredMessage).required(requiredMessage),
      email: Yup.string(invalidEmail).trim().email(invalidEmail).required(requiredMessage)
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
