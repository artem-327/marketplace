import { Button, Popup, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
//Services
import { getSafe } from '../../../utils/functions'
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

const FormRectangle = ({
  children,
  formikProps,
  title,
  subtitle,
  prevStep,
  activeStep,
  submitForm,
  countBeneficialOwners,
  numberBeneficialOwners,
  isLoadingSubmitButton,
  openEmailPopup,
  nextStep,
  registerBeneficialOwner,
  mainContainer
}) => {
  /**
   * if on step 3 (Control Person) and there is no other BO,
   * skip to the next major section (Marketing Materials)
   */
  const determineNextStep = () => {
    if (activeStep === 3 && !formikProps?.values?.ownerInformation?.isOtherBeneficialOwner) {
      return activeStep + 1
    }

    return activeStep
  }

  const { values } = formikProps
  return (
    <>
      <DivRectangleForm activeStep={activeStep}>
        <DivTitleRectangleForm>
          <DivTitleText>
            <FormattedMessage id={title} defaultMessage='Title' />
          </DivTitleText>
          {subtitle ? (
            <DivSubtitleText>
              <FormattedMessage
                id={subtitle}
                defaultMessage={`Subtitle`}
                values={{
                  percentage: (
                    <SpanSubtitleValue>
                      <FormattedMessage id='global.25percentage' defaultMessage={'25%'} />
                    </SpanSubtitleValue>
                  )
                }}
              />
            </DivSubtitleText>
          ) : null}
        </DivTitleRectangleForm>
        {children}
        <DivButtonsBottom>
          <ButtonSubmit
            disabled={isLoadingSubmitButton}
            loading={isLoadingSubmitButton}
            type='button'
            onClick={() => {
                submitForm(
                  formikProps,
                  determineNextStep(),
                  nextStep,
                  mainContainer
                )
              }
            }
            primary>
            <FormattedMessage
              id={
                registerBeneficialOwner ? 'global.send' : activeStep === 6 ? 'velloci.submitApplication' : 'global.next'
              }
              defaultMessage={registerBeneficialOwner ? 'Send' : activeStep === 6 ? 'Submit Application' : 'Next'}>
              {text => text}
            </FormattedMessage>
          </ButtonSubmit>
          {!registerBeneficialOwner && activeStep > 0 && (
            <ButtonBack type='button' onClick={() => prevStep(activeStep - 1)} basic>
              <FormattedMessage id='global.back' defaultMessage='Back'>
                {text => text}
              </FormattedMessage>
            </ButtonBack>
          )}
          {activeStep === 3 && getSafe(() => values.ownerInformation.isOtherBeneficialOwner, false) && (
            <ButtonBack type='button' onClick={openEmailPopup} basic>
              <FormattedMessage id='global.email' defaultMessage='Email'>
                {text => text}
              </FormattedMessage>
            </ButtonBack>
          )}
        </DivButtonsBottom>
      </DivRectangleForm>
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
  countBeneficialOwners: PropTypes.func,
  numberBeneficialOwners: PropTypes.number,
  openEmailPopup: PropTypes.func,
  mainContainer: PropTypes.object
}

FormRectangle.defaultProps = {
  formikProps: {},
  title: 'Title',
  subtitle: '',
  submitForm: () => {},
  activeStep: 0,
  countBeneficialOwners: () => {},
  numberBeneficialOwners: 0,
  openEmailPopup: () => {},
  registerBeneficialOwner: false,
  mainContainer: {}
}

export default FormRectangle
