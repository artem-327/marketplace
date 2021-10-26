import { connect } from 'react-redux'
import { applicationSubmitted, loadSubmitButton, postRegisterVelloci } from '../actions'
import { getIdentity, updateCompany } from '../../auth/actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import classNames from 'classnames';
//Services
import { getSafe } from '../../../utils/functions'
import { isFileEmpty } from './steps/CertificateOfInsurance'
//Styles
import {
  RightAlignedDiv,
  SpanSubtitleValue,
  DivSubtitleText,
  ButtonBack,
  ButtonSubmit,
  DivButtonsBottom,
  DivTitleText,
  DivTitleRectangleForm,
  DivRectangleForm
} from './styles'
//Actions
import {
  closePopup,
  getInsuranceDocumentsTypes,
  getInsuranceDocuments,
  uploadInsuranceDocument
} from '~/modules/settings/actions'

const FormRectangle = props => {
  const {
    applicationSubmitted,
    beneficialOwnersNotified,
    children,
    coiDocumentUploaded,
    updateCoiDocumentUploaded,
    formikProps,
    title,
    subtitle,
    prevStep,
    activeStep,
    finalStep,
    submitForm,
    countBeneficialOwners,
    numberBeneficialOwners,
    isLoadingSubmitButton,
    openEmailPopup,
    nextStep,
    registerBeneficialOwner,
    mainContainer,
    selfFormikProps
  } = props

  /**
   * if on step 3 (OwnerInformation) and there are no other BOs,
   * skip to the next major section (Marketing Material)
   */
  const determineNextStep = () => {
    if (activeStep === 3 && !formikProps?.values?.ownerInformation?.isOtherBeneficialOwner) {
      return activeStep + 1
    }

    return activeStep
  }

  const valididateOwners = () => {
    const owners = formikProps?.values?.verifyPersonalInformation.map(owner => {
      delete owner['businessRole']
      delete owner['middleName']
      return owner
    })

    for (let i = 0; i < owners.length; i++) {
      const objectValues = Object.values(owners[i])

      for (let j = 0; j < objectValues.length; j++) {
        if (!objectValues[j] || objectValues[j] === '') {
          return false
        }
      }
    }

    return true
  }
  
  const submitEarly = (activeStep === 3 && formikProps?.values?.ownerInformation?.isNotOtherBeneficialOwner) ||
                      (activeStep === 4 && valididateOwners())

  const uploadDocument = () => {
    submitForm(
      formikProps,
      determineNextStep(),
      nextStep,
      mainContainer,
      null,
      {
        closePopup: props?.closePopup,
        getInsuranceDocuments: props?.getInsuranceDocuments,
        intl: props?.intl,
        setSubmitting: formikProps?.setSubmitting,
        values: formikProps?.values?.certificateOfInsurance,
        uploadInsuranceDocument: props?.uploadInsuranceDocument,
        coiDocumentUploaded
      }
    )
  }

  const override = {
    extraProps: {
      getIdentity: props?.getIdentity,
      loadSubmitButton: props?.loadSubmitButton,
      postRegisterVelloci: props?.postRegisterVelloci,
      updateCompany: props?.updateCompany,
      nextStep,
      activeStep
    },
    selfFormikProps,
    beneficialOwnersNotified
  }

  const handleClick = () => {
    switch (activeStep) {
      case 6: {
        const file = formikProps?.values?.certificateOfInsurance?.file
        const documentId = formikProps?.values?.certificateOfInsurance?.documentId

        if (documentId && documentId === 'INSURANCE_GENERAL_LIABILITY') {
          uploadDocument()
          updateCoiDocumentUploaded(true)
          nextStep(activeStep + 1)
          return
        }

        // if coi doc has been uploaded (with either upload another or next button), allow user to move to next step
        if (coiDocumentUploaded) {
          if (isFileEmpty(file) || !documentId) {
            nextStep(activeStep + 1)
            return
          }
        }

        if (isFileEmpty(file) || !documentId) {
          formikProps?.handleSubmit()
        } else {
          uploadDocument()
        }

        return
      }
      case finalStep: {
        applicationSubmitted(true)
        return
      }
      default: {
        submitForm(
          formikProps,
          determineNextStep(),
          nextStep,
          mainContainer,
          submitEarly ? override : null
        )
      }
    }
  }

  const { values } = formikProps

  const showEmailButton = activeStep === 3 && getSafe(() => values.ownerInformation.isOtherBeneficialOwner, false)
  const emailButtonActiveClass = classNames({ 'btn-email-active': showEmailButton })

  return (
    <>
      {children}
      <DivButtonsBottom className={`oboarding-nav-buttons ${emailButtonActiveClass}`}>
        <ButtonSubmit
          className="btn-next"
          disabled={isLoadingSubmitButton}
          loading={isLoadingSubmitButton}
          type='button'
          onClick={handleClick}
          primary>
          <FormattedMessage
            id={
              registerBeneficialOwner ? 'global.send' : activeStep === finalStep ? 'marketplace.submit' : 'global.next'
            }
            defaultMessage={registerBeneficialOwner ? 'Send' : activeStep === finalStep ? 'Submit' : 'Next'}
          />
        </ButtonSubmit>
        {!registerBeneficialOwner && activeStep > 0 && activeStep !== 5 && (
          <ButtonBack className="btn-back" type='button' onClick={() => prevStep(activeStep - 1)} basic>
            <FormattedMessage id='global.back' defaultMessage='Back' />
          </ButtonBack>
        )}
        {showEmailButton && (
          <ButtonBack className="btn-email" type='button' onClick={openEmailPopup} basic>
            <FormattedMessage id='global.email' defaultMessage='Email' />
          </ButtonBack>
        )}
      </DivButtonsBottom>
    </>
  )
}

FormRectangle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  formikProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  submitForm: PropTypes.func,
  activeStep: PropTypes.number,
  finalStep: PropTypes.number,
  countBeneficialOwners: PropTypes.func,
  numberBeneficialOwners: PropTypes.number,
  openEmailPopup: PropTypes.func,
  mainContainer: PropTypes.object,
  selfFormikProps: PropTypes.object
}

FormRectangle.defaultProps = {
  formikProps: {},
  title: 'Title',
  subtitle: '',
  submitForm: () => {},
  activeStep: 0,
  finalStep: 8,
  countBeneficialOwners: () => {},
  numberBeneficialOwners: 0,
  openEmailPopup: () => {},
  registerBeneficialOwner: false,
  mainContainer: {},
  selfFormikProps: {}
}

function mapStateToProps(state) {
  return {
    coiDocumentUploaded: state?.vellociRegister?.coiDocumentUploaded
  }
}

const mapDispatchToProps = {
  applicationSubmitted,
  loadSubmitButton,
  postRegisterVelloci,
  getIdentity,
  updateCompany,
  closePopup,
  getInsuranceDocumentsTypes,
  getInsuranceDocuments,
  uploadInsuranceDocument
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FormRectangle))
