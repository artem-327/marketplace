/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Grid, GridColumn, GridRow, Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
//Components
import SetupIndicator from './SetupIndicator'
import SetupIndicatorMobile from './SetupIndicatorMobile'
import FormRectangle from './FormRectangle'
import BeneficialOwnersPopup from './steps/BeneficialOwnersPopup'
import MarketingMaterial from './steps/MarketingMaterial'
import RiskTolerance from './steps/RiskTolerance'
//Hooks
import { usePrevious } from '../../../hooks'
//Services
import { getValidationSchema, submitForm, handleSubmit } from '../form-services'
import { switchPages } from './SwitchPages'
import ErrorFocus from '../../../components/error-focus'
import { getSafe } from '../../../utils/functions'
//Constants
import { titleIds, subtitleIds, verifyPersonalInformation } from '../constants'
import { FormattedMessage } from 'react-intl'
import {
  DivTitleText,
  DivTitleRectangleForm,
  DivRectangleForm
} from './styles'

// Global variable to store global state
let selfFormikProps = {} //TODO specify type
/**
 * @category Velloci Register
 * @component
 */
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
      !getSafe(() => props.enumsBusinessMarkets.data.length, false) && props.getEnumsBusinessMarkets()
      !getSafe(() => props.enumsBusinessTypes.data.length, false) && props.getEnumsBusinessTypes()
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

  const { activeStep, finalStep, mainContainer, nextStep } = props;
  const beneficialOwnersNotified = props?.emailPopup?.beneficialOwnersNotified;

  const MobileIndicator = ({ activeStep }) => (
    <Grid>
      <Grid.Row>
        <Grid.Column only='tablet mobile'>
          <SetupIndicatorMobile activeStep={activeStep} />
        </Grid.Column>
      </Grid.Row>
    </Grid> 
  )

  const ModuleTitle = ({ activeStep, className }) => (
    <DivRectangleForm activeStep={activeStep}>
      <DivTitleRectangleForm className={className}>
        <DivTitleText className="onboarding-module-title">
          <FormattedMessage id={titleIds[activeStep]} defaultMessage='Title' />
        </DivTitleText>
      </DivTitleRectangleForm>
    </DivRectangleForm>
  )

  return (
    <Grid columns='equal' padded stackable>
      <GridRow>
        <GridColumn width={4} only='large screen'>
          <SetupIndicator activeStep={activeStep} />
        </GridColumn>
        <GridColumn>
          {activeStep !== 5 && activeStep !== 7 &&
            <Formik
              onSubmit={values => handleSubmit(values, props, selfFormikProps, beneficialOwnersNotified)}
              validateOnChange={true}
              initialValues={props.initialValues}
              validationSchema={beneficialOwnersNotified ? getValidationSchema(true) : getValidationSchema()}
              render={formikProps => {
                selfFormikProps = formikProps
                return (
                  <>
                    <MobileIndicator activeStep={activeStep} />
                    <Form style={{ background: '#fff', border: 'solid 1px #dee2e6' }}>
                      <ModuleTitle activeStep={activeStep} />
                      <FormRectangle
                        beneficialOwnersNotified={beneficialOwnersNotified}
                        formikProps={formikProps}
                        title={titleIds[activeStep]}
                        subtitle={subtitleIds[activeStep]}
                        prevStep={props.prevStep}
                        submitForm={submitForm}
                        activeStep={activeStep}
                        finalStep={finalStep}
                        numberBeneficialOwners={props.numberBeneficialOwners}
                        countBeneficialOwners={props.countBeneficialOwners}
                        isLoadingSubmitButton={props.isLoadingSubmitButton}
                        openEmailPopup={props.openEmailPopup}
                        nextStep={props.nextStep}
                        mainContainer={mainContainer}
                        selfFormikProps={selfFormikProps}>
                        {switchPages({ ...props, formikProps })}
                      </FormRectangle>
                      <ErrorFocus />
                      {props.emailPopup.isOpen &&
                        <BeneficialOwnersPopup formikProps={formikProps} nextStep={nextStep} selfFormikProps={selfFormikProps} />
                      }
                    </Form>
                  </>
                )
              }}
            />
          }
          {activeStep === 5 &&
            <MarketingMaterial {...props}>
              <MobileIndicator activeStep={activeStep} />
              <ModuleTitle className="module-title" activeStep={activeStep} />
            </MarketingMaterial>
          }
          {activeStep === 7 &&
            <RiskTolerance {...props}>
              <MobileIndicator activeStep={activeStep} />
              <ModuleTitle className="module-title" activeStep={activeStep} />
            </RiskTolerance>
          }
        </GridColumn>
      </GridRow>
    </Grid>
  )
}

VellociRegister.propTypes = {
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  activeStep: PropTypes.number,
  finalStep: PropTypes.number,
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
  getBusinessRoles: PropTypes.func,
  entityDocuments: PropTypes.object,
  getEntityDocuments: PropTypes.func,
  enumsBusinessMarkets: PropTypes.object,
  getEnumsBusinessMarkets: PropTypes.func,
  enumsBusinessTypes: PropTypes.object,
  getEnumsBusinessTypes: PropTypes.func,
  politicallyExposedPersons: PropTypes.object,
  getPoliticallyExposedPersons: PropTypes.func,
  cleareActiveStep: PropTypes.func,
  postRegisterVelloci: PropTypes.func,
  getIdentity: PropTypes.func,
  loadSubmitButton: PropTypes.func,
  mainContainer: PropTypes.object,
  naicsCode: PropTypes.bool,
  companyRequestBody: PropTypes.object,
  updateCompany: PropTypes.func
}

VellociRegister.defaultProps = {
  nextStep: () => {},
  prevStep: () => {},
  activeStep: 0,
  finalStep: 8,
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
  enumsBusinessMarkets: {},
  getEnumsBusinessMarkets: () => {},
  enumsBusinessTypes: {},
  getEnumsBusinessTypes: () => {},
  businessRoles: {},
  getBusinessRoles: () => {},
  entityDocuments: {},
  getEntityDocuments: () => {},
  politicallyExposedPersons: {},
  getPoliticallyExposedPersons: () => {},
  cleareActiveStep: () => {},
  postRegisterVelloci: () => {},
  getIdentity: () => {},
  loadSubmitButton: () => {},
  mainContainer: {},
  naicsCode: false,
  companyRequestBody: null,
  updateCompany: () => {}
}

export default VellociRegister
