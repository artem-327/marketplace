import React from 'react'
import { Button, Popup, Icon } from 'semantic-ui-react'
const { FormattedMessage } = require('react-intl')
import { getSafe } from '../../../utils/functions'
import { FormikProps } from 'formik'

//Styles
import { RightAlignedDiv, 
  SpanSubtitleValue, 
  DivSubtitleText, 
  ButtonBack, 
  ButtonSubmit, 
  DivButtonsBottom, 
  DivTitleText, 
  DivTitleRectangleForm, 
  DivRectangleForm} from './styles'
  //Types 
  import {IRectangle, IFormValues} from './types'

const FormRectangle: React.FC<IRectangle & FormikProps<IFormValues>> = ({
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
            {(text: any) => text}
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
            {(text: any) => text}
          </FormattedMessage>
        </ButtonSubmit>
        {!registerBeneficialOwner && activeStep > 0 ? (
          <ButtonBack type='button' onClick={() => prevStep(activeStep - 1)} basic>
            <FormattedMessage id='global.back' defaultMessage='Back'>
              {(text: any) => text}
            </FormattedMessage>
          </ButtonBack>
        ) : null}
        {activeStep === 4 && getSafe(() => values.ownerInformation.isOtherBeneficialOwner, false) ? (
          <ButtonBack type='button' onClick={openEmailPopup} basic>
            <FormattedMessage id='global.email' defaultMessage='Email'>
              {(text: any) => text}
            </FormattedMessage>
          </ButtonBack>
        ) : null}
      </DivButtonsBottom>
    </DivRectangleForm>
  )
}

export default FormRectangle
