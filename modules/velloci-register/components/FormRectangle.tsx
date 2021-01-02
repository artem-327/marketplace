import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Popup, Icon } from 'semantic-ui-react'
const { FormattedMessage } = require('react-intl')
import { getSafe } from '../../../utils/functions'

interface IDivRectangleForm {
  activeStep: number;
};

interface IRectangle {
  prevStep: (activeStep: number) => void;
  children: any;
  formikProps: any;
  title: any;
  subtitle: any;
  activeStep: any;
  submitForm: any;
  countBeneficialOwners: any;
  numberBeneficialOwners: any;
  isLoadingSubmitButton: any;
  openEmailPopup: any;
  nextStep: any;
  registerBeneficialOwner?: any;

}

const DivRectangleForm = styled.div<IDivRectangleForm>`
  padding: 0px !important;
  width: 740px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  text-align: initial;
  position: relative;
  margin-bottom: 20px;
  height: ${props => props.activeStep === 4 || props.activeStep === 5 ? '1000px' : props.activeStep === 6 ? '400px' : '860px'};
`

const DivTitleRectangleForm = styled.div`
  border-bottom: solid 1px #dee2e6;
  height: 50px;
  display: flex;
  justify-content: space-between;
`
const DivTitleText = styled.div`
  font-weight: bold;
  padding: 16px 30px;
  height: 50px;
`

const DivButtonsBottom = styled.div`
  overflow: auto;
  color: #ffffff;
  margin: 0 30px 30px 0;
`

const ButtonSubmit = styled(Button)`
  float: right !important;
  background: #2599d5 !important;
  margin-left: 10px !important;
  margin-right: 0px !important;
`

const ButtonBack = styled(Button)`
  float: right !important;
  margin-left: 10px !important;
`

const DivSubtitleText = styled.div`
  text-align: right;
  color: #848893;
  font-size: 12px;
  padding: 16px 30px;
`

const SpanSubtitleValue = styled.span`
  font-weight: bold;
  color: #84c225;
`
const RightAlignedDiv = styled.div`
  text-align: right !important;
  margin: 0 30px 10px 0;
`


const FormRectangle: React.FC<IRectangle> = ({
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
