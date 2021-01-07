import React from 'react'
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
  registerBeneficialOwner
}) => {
  const { values } = formikProps
  return (
    <DivRectangleForm activeStep={activeStep}>
      <DivTitleRectangleForm>
        <DivTitleText>
          <FormattedMessage id={title} defaultMessage='Title'>
            {text => text}
          </FormattedMessage>
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
      {activeStep === 5 && (
        <RightAlignedDiv>
          {numberBeneficialOwners > 0 && (
            <Popup
              trigger={
                <a href={`#form${numberBeneficialOwners}`}>
                  <Button
                    style={{ float: 'right !important', marginLeft: '10px !important', marginRight: '0px !important' }}
                    type='button'
                    negative
                    onClick={() => {
                      countBeneficialOwners(numberBeneficialOwners - 1)
                    }}
                    icon>
                    <Icon name='minus' />
                  </Button>
                </a>
              }
              content={
                <FormattedMessage id='settings.removeBeneficialOwner' defaultMessage='Remove beneficial owner' />
              }
            />
          )}

          {values.ownerInformation && values.ownerInformation.isOtherBeneficialOwner && (
            <Popup
              trigger={
                <a href={`#form${numberBeneficialOwners}`}>
                  <Button
                    type='button'
                    style={{ marginLeft: '10px !important', marginRight: '0px !important' }}
                    positive
                    onClick={() => {
                      countBeneficialOwners(numberBeneficialOwners + 1)
                    }}
                    icon>
                    <Icon name='plus' />
                  </Button>
                </a>
              }
              content={<FormattedMessage id='settings.addBeneficialOwner' defaultMessage='Add beneficial owner' />}
            />
          )}
        </RightAlignedDiv>
      )}

      <DivButtonsBottom>
        <ButtonSubmit
          disabled={isLoadingSubmitButton}
          loading={isLoadingSubmitButton}
          type='button'
          onClick={() => submitForm(formikProps, activeStep, nextStep)}
          primary>
          <FormattedMessage
            id={
              registerBeneficialOwner ? 'global.send' : activeStep === 6 ? 'velloci.submitApplication' : 'global.next'
            }
            defaultMessage={registerBeneficialOwner ? 'Send' : activeStep === 6 ? 'Submit Application' : 'Next'}>
            {text => text}
          </FormattedMessage>
        </ButtonSubmit>
        {!registerBeneficialOwner && activeStep > 0 ? (
          <ButtonBack type='button' onClick={() => prevStep(activeStep - 1)} basic>
            <FormattedMessage id='global.back' defaultMessage='Back'>
              {text => text}
            </FormattedMessage>
          </ButtonBack>
        ) : null}
        {activeStep === 4 && getSafe(() => values.ownerInformation.isOtherBeneficialOwner, false) ? (
          <ButtonBack type='button' onClick={openEmailPopup} basic>
            <FormattedMessage id='global.email' defaultMessage='Email'>
              {text => text}
            </FormattedMessage>
          </ButtonBack>
        ) : null}
      </DivButtonsBottom>
    </DivRectangleForm>
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
  openEmailPopup: PropTypes.func
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
  registerBeneficialOwner: false
}

export default FormRectangle
