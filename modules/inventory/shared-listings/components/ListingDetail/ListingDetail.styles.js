import styled from 'styled-components'
import { Header, GridColumn, GridRow, Grid, Segment, Message, Button, ButtonGroup } from 'semantic-ui-react'

export const DivDetailWrapper = styled.div`
  margin: -9px -10px;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > .row {
      padding: 16px 0;
      margin: 0;

      > .column {
        padding: 0 5px;
      }
    }
  }
`

export const GridRowButton = styled(GridRow)`
  &.row {
    border-top: solid 1px #dee2e6;
    text-align: right;
    padding: 10px 0 !important;
  }
`