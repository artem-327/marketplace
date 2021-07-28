import styled from 'styled-components'
import { Container, Input, Grid, Dropdown } from 'semantic-ui-react'

export const ContainerCustom = styled(Container)`
  padding: 20px 30px;
  display: flex !important;
  ${({ paddingTop }) => (paddingTop ? `padding-top: ${paddingTop} !important` : null)};
`

export const InputSearch = styled(Input)`
  width: 370px !important;
  margin-right: 10px !important;
`

export const DropdownType = styled(Dropdown)`
  z-index: 610 !important; // FIXME
`

export const DivStatusLabel = styled.div`
  padding: 2px 13px 4px 15px;
  border-radius: 11px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  color: #848893;
  width: max-content;
`

export const DivCircle = styled.div`
  align-self: center;
  margin: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => (props.background ? props.background : '')};
`

export const DivCircles = styled.div`
  display: flex;
  height: 100%;
`

export const DivValueTradeCriteria = styled.div`
  display: flex;
  align-items: center;
`

export const DivTextValueTradeCriteria = styled.div`
  font-weight: bold;
  margin-right: 6px;
`

export const DivButon = styled.div`
  width: inherit;
`

export const BMember = styled.b`
  vertical-align: middle;
`

export const DivMember = styled.div`
  //height: 100%;
  margin: 0 auto;
`

export const SpanDate = styled.span`
  vertical-align: middle;
`

export const DivDate = styled.div`
  margin: 0 auto;
`

export const DivPercentageIconWrapper = styled.div`
  height: 50px;
`