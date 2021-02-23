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
