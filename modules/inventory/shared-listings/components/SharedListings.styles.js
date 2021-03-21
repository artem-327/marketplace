import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Input, Dropdown, Image } from 'semantic-ui-react'

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
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 25px;
`

export const DivCustomSearchNameTags = styled.div`
  margin: 5px;
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

export const DivTableHandlerColumn = styled.div`
  margin: 5px;
  .ui.dropdown {
    height: 40px;
  }
`

export const DivSeller = styled.div`
  height: 100%;
`

export const SpanSellerName = styled.span`
  vertical-align: middle;
`

export const ImageInRow = styled(Image)`
  width: 40px !important;
  height: 30px !important;
`
