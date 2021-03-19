import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Input, Dropdown } from 'semantic-ui-react'

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

export const InputSearch = styled(Input)`
  width: 370px !important;
  margin-right: 10px !important;
`
export const DropdownType = styled(Dropdown)`
  z-index: 610 !important;
`

export const DivTableHandler = styled.div`
  display: flex;
  padding: 20px 30px;
`
