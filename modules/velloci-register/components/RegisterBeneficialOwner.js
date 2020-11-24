import React, { Component } from 'react'
import { Grid, Form, Dimmer, Loader } from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import Router from 'next/router'
//Components
import {
  errorMessages,
  addressValidationSchema,
  einValidation,
  websiteValidationNotRequired,
  dateValidation
} from '~/constants/yupValidation'
import FormRectangle from './FormRectangle'
import PersonalInformation from './steps/PersonalInformation'
import { titleIds, subtitleIds, initialValues, titleForms } from '../constants'
import ErrorFocus from '~/components/error-focus'
import { PHONE_REGEXP } from '~/src/utils/constants'
import { getStringISODate } from '~/components/date-format'
import { getSafe } from '~/utils/functions'
import { removeEmpty } from '~/utils/functions'
import ErrorPage from '~/modules/errors'

class RegisterBeneficialOwner extends Component {
  state = {
    tokenOk: false,
    isLoading: true
  }
  componentDidMount = async () => {
    const { token, checkMagicToken } = this.props
    try {
      await checkMagicToken(token)
      this.setState({ tokenOk: true, isLoading: false })
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  getValidationSchema = () =>
    Yup.lazy(values => {
      const { requiredMessage, invalidEmail, invalidPhoneNumber } = errorMessages

      return Yup.object().shape({
        verifyPersonalInformation: Yup.array().of(
          Yup.lazy(v => {
            //let isAnyValueFilled = deepSearch(v, (val, key) => val !== '' && key !== 'country')
            const businessOwnershipPercentage = values.ownerInformation.isBeneficialOwner
              ? { businessOwnershipPercentage: Yup.string().required(errorMessages.requiredMessage) }
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
              businessTitle: Yup.string()
                .trim()
                .min(3, errorMessages.minLength(3))
                .required(errorMessages.requiredMessage),
              socialSecurityNumber: Yup.string()
                .trim()
                .min(9, errorMessages.minLength(9))
                .max(9, errorMessages.maxLength(9))
                .required(errorMessages.requiredMessage),
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
            })
          })
        )
      })
    })

  handleSubmit = async () => {
    const { token, registerBeneficialOwner } = this.props

    try {
      const val = this.formikProps.values.verifyPersonalInformation[0]
      let body = {
        address: getSafe(() => val.address.streetAddress, ''),
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
      removeEmpty(body)
      await registerBeneficialOwner(body, token)
      Router.push('/auth/login')
    } catch (error) {
      console.error(error)
    } finally {
      this.formikProps.setSubmitting(false)
    }
  }

  submitForm = async formikProps => {
    formikProps
      .validateForm()
      .then(errors => {
        if (errors[titleForms[5]]) {
          formikProps.handleSubmit()
        } else {
          this.handleSubmit()
        }
      })
      .catch(err => console.log('catch', err))
  }

  render() {
    const { isLoadingSubmitButton } = this.props
    const { tokenOk, isLoading } = this.state

    if (isLoading) {
      return (
        <Dimmer active={true} inverted>
          <Loader active={true} />
        </Dimmer>
      )
    } else if (!isLoading && !tokenOk) {
      return <ErrorPage type='forbidden' status='403' />
    } else {
      return (
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
                    title={titleIds[5]}
                    subtitle={subtitleIds[5]}
                    prevStep={5}
                    submitForm={this.submitForm}
                    activeStep={5}
                    numberBeneficialOwners={0}
                    countBeneficialOwners={1}
                    isLoadingSubmitButton={isLoadingSubmitButton}
                    registerBeneficialOwner={true}>
                    <PersonalInformation
                      formikProps={formikProps}
                      businessRoles={[]}
                      numberBeneficialOwners={0}
                      registerBeneficialOwner={true}
                    />
                  </FormRectangle>
                </Grid>
                <ErrorFocus />
              </Form>
            )
          }}
        />
      )
    }
  }
}

export default RegisterBeneficialOwner
