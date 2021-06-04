import { GridRow } from 'semantic-ui-react'
import styled from 'styled-components'

export const DivProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #20273a;
  margin: -3px 0;
`

export const AddressRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px -5px;
`

export const DivBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const GridRowDescription = styled(GridRow)`
  &.row {
    margin: -5px 0 10px !important;
  }
`