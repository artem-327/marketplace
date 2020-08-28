import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

const DivRectangleForm = styled.div`
  padding: 0px !important;
  width: 740px;
  height: ${props => (props.height ? props.height : '860px')};
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  text-align: initial;
  position: relative;
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
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: #ffffff;
`

const ButtonSubmit = styled(Button)`
  background: #2599d5 !important;
  margin-left: 10px !important;
  margin-right: 0px !important;
`

const DivSubtitleText = styled.div`
  text-align: right;
  color: #848893;
  font-size: 12px;
  padding: 16px 30px;
`

function FormRectangle({ children, formikProps, title, subtitle, prevStep, activeStep, submitForm }) {
  return (
    <DivRectangleForm height={activeStep === 3 || activeStep === 4 ? '1000px' : activeStep === 5 ? '400px' : '860px'}>
      <DivTitleRectangleForm>
        <DivTitleText>
          <FormattedMessage id={title} defaultMessage='Title'>
            {text => text}
          </FormattedMessage>
        </DivTitleText>
        {subtitle ? (
          <DivSubtitleText>
            <FormattedMessage id={subtitle} defaultMessage='Subtitle'>
              {text => text}
            </FormattedMessage>
          </DivSubtitleText>
        ) : null}
      </DivTitleRectangleForm>
      {children}

      <DivButtonsBottom>
        {activeStep > 0 ? (
          <Button type='button' onClick={() => prevStep(activeStep - 1)} basic>
            <FormattedMessage id='global.back' defaultMessage='Back'>
              {text => text}
            </FormattedMessage>
          </Button>
        ) : null}
        <ButtonSubmit type='button' onClick={() => submitForm(formikProps)} primary>
          <FormattedMessage
            id={activeStep === 5 ? 'velloci.submitApplication' : 'global.next'}
            defaultMessage={activeStep === 5 ? 'Submit Application' : 'Next'}>
            {text => text}
          </FormattedMessage>
        </ButtonSubmit>
      </DivButtonsBottom>
    </DivRectangleForm>
  )
}

FormRectangle.propTypes = {
  formikProps: PropTypes.object,
  title: PropTypes.string,
  prevStep: PropTypes.func,
  activeStep: PropTypes.number
}

FormRectangle.defaultProps = {
  formikProps: {},
  title: 'Title',
  prevStep: () => {},
  activeStep: 0
}

export default FormRectangle
