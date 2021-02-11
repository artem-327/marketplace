import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const CustomButton = styled(Button)`
  box-shadow: none !important;
  border: ${props => (props.noBorder ? 'none !important' : 'solid 1px #dee2e6 !important;')};
  color: #20273a !important;
  background-color: #ffffff !important;
  height: 40px !important;
  border-radius: 3px !important;
  font-weight: 500 !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 14px !important;
  margin: 0px 5px !important;
`
