import styled from 'styled-components'
import { Segment, Form } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'
//Styles
import { HighSegment } from '../../../../../inventory/constants/layout'

export const CustomButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #fff !important;
  margin: 0 5px !important;
`

export const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }

    .field {
      label {
        color: #546f93;
      }
    }

    .phone-number {
      .phone-code,
      .phone-num {
        height: 40px;
      }
    }
  }
`

export const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

export const CustomDiv = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
`

export const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff;
  z-index: 1;
`

export const CustomSegmentContent = styled(Segment)`
  padding-top: 0px !important;
`
