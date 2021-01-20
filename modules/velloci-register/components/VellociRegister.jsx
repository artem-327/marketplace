/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Grid, GridColumn, GridRow, Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import _ from 'lodash'
import PropTypes from 'prop-types'
//Components
import SetupIndicator from './SetupIndicator'
import FormRectangle from './FormRectangle'
import BeneficialOwnersPopup from './steps/BeneficialOwnersPopup'
//Hooks
import { usePrevious } from '../../../hooks'
//Services
import { getValidationSchema, submitForm, handleSubmit } from '../form-services'
import { switchPages } from './SwitchPages'
import ErrorFocus from '../../../components/error-focus'
import { getSafe } from '../../../utils/functions'
//Constants
import { titleIds, subtitleIds, verifyPersonalInformation } from '../constants'

// Global variable to store global state
let selfFormikProps = {} //TODO specify type

const VellociRegister = props => {
  // Stores previos values for compating with current value
  const prevNumberBeneficialOwners = usePrevious(props.numberBeneficialOwners)
  // Similar to call componentDidMount:
  useEffect(() => {
    try {
      !getSafe(() => props.entityTypes.data.length, false) && props.getEntityTypes()
      !getSafe(() => props.naicsCodes.data.length, false) && props.getNaicsCodes()
      !getSafe(() => props.businessRoles.data.length, false) && props.getBusinessRoles()
      !getSafe(() => props.entityDocuments.data.length, false) && props.getEntityDocuments()
      !getSafe(() => props.politicallyExposedPersons.data.length, false) && props.getPoliticallyExposedPersons()
      //!getSafe(() => tinTypes.data.length, false) && getTinTypes()
    } catch (error) {
      console.error(error)
    }
    // Similar to componentWillUnmount :
    return () => {
      props.cleareActiveStep()
    }
    // If [] is empty then is similar as componentDidMount.
  }, [])

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (props.numberBeneficialOwners > prevNumberBeneficialOwners) {
      // Add Benefical owner
      const { values, setFieldValue } = selfFormikProps
      let newPersonalInformation = values.verifyPersonalInformation.slice()
      newPersonalInformation.push({
        ...verifyPersonalInformation,
        businessRole: 'beneficial_owner'
      })
      setFieldValue('verifyPersonalInformation', newPersonalInformation)
    } else if (props.numberBeneficialOwners < prevNumberBeneficialOwners) {
      // Delete last Benefical owner
      const { values, setFieldValue } = selfFormikProps
      let newPersonalInformation = values.verifyPersonalInformation.slice(0, -1)
      setFieldValue('verifyPersonalInformation', newPersonalInformation)
    }
    // if [] has some variables, then is similar as componentDidUpdate:
  }, [props.numberBeneficialOwners, prevNumberBeneficialOwners])

  return (
    <Grid>
      <GridColumn>
        <GridRow>
          <SetupIndicator activeStep={props.activeStep} />
          <Formik
            onSubmit={values => handleSubmit(values, props, selfFormikProps)}
            enableReinitialize
            validateOnChange={true}
            initialValues={props.initialValues}
            validationSchema={getValidationSchema()}
            render={formikProps => {
              selfFormikProps = formikProps
              return (
                <Form>
                  <Grid verticalAlign='middle' centered>
                    <FormRectangle
                      formikProps={formikProps}
                      title={titleIds[props.activeStep]}
                      subtitle={subtitleIds[props.activeStep]}
                      prevStep={props.prevStep}
                      submitForm={submitForm}
                      activeStep={props.activeStep}
                      numberBeneficialOwners={props.numberBeneficialOwners}
                      countBeneficialOwners={props.countBeneficialOwners}
                      isLoadingSubmitButton={props.isLoadingSubmitButton}
                      openEmailPopup={props.openEmailPopup}
                      nextStep={props.nextStep}>
                      {switchPages({ ...props, formikProps })}
                    </FormRectangle>
                  </Grid>
                  <ErrorFocus />
                  {props.emailPopup.isOpen && <BeneficialOwnersPopup />}
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
  props: {
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    activeStep: PropTypes.number,
    countBeneficialOwners: PropTypes.func,
    numberBeneficialOwners: PropTypes.number,
    isLoadingSubmitButton: PropTypes.bool,
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
}

VellociRegister.defaultProps = {
  props: {
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
}

export default VellociRegister
