import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'

export const IconDown = styled(ChevronDown)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: -4px;
  color: #848893;
`

export const IconUp = styled(ChevronUp)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: -4px;
  color: #848893;
`

export const CapitalizedText = styled.span`
  text-transform: capitalize;
`