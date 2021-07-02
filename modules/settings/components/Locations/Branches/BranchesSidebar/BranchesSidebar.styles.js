import styled from 'styled-components'
//Styles
import { HighSegment } from '../../../../../inventory/styles'

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

export const DivTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
`
