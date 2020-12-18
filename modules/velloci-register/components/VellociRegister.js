/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow, Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import _ from 'lodash'
import Router from 'next/router'
//Components
import SetupIndicator from './SetupIndicator'
import FormRectangle from './FormRectangle'
import BeneficialOwnersPopup from './steps/BeneficialOwnersPopup'
//Hooks
import { usePrevious } from '~/hooks'
//Services
import { getValidationSchema, getBody, submitForm } from '../form-services'
import { getContent } from './SwitchPages'
import ErrorFocus from '~/components/error-focus'
import { getSafe } from '~/utils/functions'
//Constants
import { titleIds, subtitleIds, verifyPersonalInformation } from '../constants'

// Global variable to store global state
let selfFormikProps = {}

const VellociRegister = ({
  prevStep,
  nextStep,
  activeStep,
  countBeneficialOwners,
  numberBeneficialOwners,
  isLoadingSubmitButton,
  initialValues,
  openEmailPopup,
  emailPopup,
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
  cleareActiveStep,
  postRegisterVelloci,
  getIdentity,
  loadSubmitButton
}) => {
  // Stores previos values for compating with current value
  const prevNumberBeneficialOwners = usePrevious(numberBeneficialOwners)

  // Similar to call componentDidMount:
  useEffect(() => {
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
    // Similar to componentWillUnmount :
    return () => {
      cleareActiveStep()
    }
    // If [] is empty then is similar as componentDidMount.
  }, [])

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (numberBeneficialOwners > prevNumberBeneficialOwners) {
      // Add Benefical owner
      const { values, setFieldValue } = selfFormikProps
      let newPersonalInformation = values.verifyPersonalInformation.slice()
      newPersonalInformation.push({
        ...verifyPersonalInformation,
        businessRole: 'beneficial_owner'
      })
      setFieldValue('verifyPersonalInformation', newPersonalInformation)
    } else if (numberBeneficialOwners < prevNumberBeneficialOwners) {
      // Delete last Benefical owner
      const { values, setFieldValue } = selfFormikProps
      let newPersonalInformation = values.verifyPersonalInformation.slice(0, -1)
      setFieldValue('verifyPersonalInformation', newPersonalInformation)
    }
    // if [] has some variables, then is similar as componentDidUpdate:
  }, [numberBeneficialOwners, prevNumberBeneficialOwners])

  const handleSubmit = async values => {
    if (activeStep !== 6) return

    try {
      loadSubmitButton(true)
      const body = getBody(values)

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
      selfFormikProps.setSubmitting(false)
    }
  }

  return (
    <Grid>
      <GridColumn>
        <GridRow>
          <SetupIndicator activeStep={activeStep} />
          <Formik
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={getValidationSchema()}
            render={formikProps => {
              selfFormikProps = formikProps
              return (
                <Form>
                  <Grid verticalAlign='middle' centered>
                    <FormRectangle
                      formikProps={formikProps}
                      title={titleIds[activeStep]}
                      subtitle={subtitleIds[activeStep]}
                      prevStep={prevStep}
                      submitForm={submitForm}
                      activeStep={activeStep}
                      numberBeneficialOwners={numberBeneficialOwners}
                      countBeneficialOwners={countBeneficialOwners}
                      isLoadingSubmitButton={isLoadingSubmitButton}
                      openEmailPopup={openEmailPopup}
                      nextStep={nextStep}>
                      {getContent(
                        formikProps,
                        entityTypes,
                        naicsCodes,
                        entityDocuments,
                        countBeneficialOwners,
                        businessRoles,
                        numberBeneficialOwners,
                        activeStep
                      )}
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

VellociRegister.propTypes = {
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  activeStep: PropTypes.number,
  countBeneficialOwners: PropTypes.func,
  numberBeneficialOwners: PropTypes.number,
  isLoadingSubmitButton: PropTypes.bolean,
  initialValues: PropTypes.object,
  openEmailPopup: PropTypes.func,
  emailPopup: PropTypes.object,
  entityTypes: PropTypes.object,
  getEntityTypes: PropTypes.func,
  naicsCodes: PropTypes.object,
  getNaicsCodes: PropTypes.func,
  businessRoles: PropTypes.object,
  getBusinessRoles: PropTypes.object,
  entityDocuments: PropTypes.object,
  getEntityDocuments: PropTypes.func,
  politicallyExposedPersons: PropTypes.object,
  getPoliticallyExposedPersons: PropTypes.func,
  cleareActiveStep: PropTypes.func,
  postRegisterVelloci: PropTypes.func,
  getIdentity: PropTypes.func,
  loadSubmitButton: PropTypes.func
}

VellociRegister.defaultProps = {
  nextStep: () => {},
  prevStep: () => {},
  activeStep: 0,
  countBeneficialOwners: () => {},
  numberBeneficialOwners: 0,
  isLoadingSubmitButton: false,
  initialValues: {},
  openEmailPopup: () => {},
  emailPopup: {},
  entityTypes: {},
  getEntityTypes: () => {},
  naicsCodes: {},
  getNaicsCodes: () => {},
  businessRoles: {},
  getBusinessRoles: {},
  entityDocuments: {},
  getEntityDocuments: () => {},
  politicallyExposedPersons: {},
  getPoliticallyExposedPersons: () => {},
  cleareActiveStep: () => {},
  postRegisterVelloci: () => {},
  getIdentity: () => {},
  loadSubmitButton: () => {}
}

export default VellociRegister
