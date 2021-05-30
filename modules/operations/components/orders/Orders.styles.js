import styled from 'styled-components'
import { Radio, Form } from 'semantic-ui-react'

export const FormFieldCustom = styled(Form.Field)`
  .ui.checkbox input.hidden {
    z-index: 1 !important;
  }
  .ui.checkbox input[type='radio'] {
    opacity: 1 !important;
    position: inherit !important;
    margin-right: 10px !important;
    width: 15px !important;
    height: 15px !important;
  }
`

export const DivMarginBottom = styled.div`
  padding-bottom: 30px;
`
