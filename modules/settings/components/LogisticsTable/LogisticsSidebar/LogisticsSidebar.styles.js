import styled from 'styled-components'
import { HighSegment } from '../../../../inventory/constants/layout'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'

export const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff !important;
  z-index: 1;
  cursor: pointer;
`

export const SubmitButton = styled(Button.Submit)`
  &.ui.basic.primary.button {
    border-color: #dee2e6 !important;
    box-shadow: 0 0 0 0 transparent !important;
    color: #20273a !important;
  }
`

export const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`