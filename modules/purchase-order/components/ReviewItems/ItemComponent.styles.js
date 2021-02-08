import styled from 'styled-components'
import { Trash2 } from 'react-feather'

import {
  Container as SemanticContainer,
  Image,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'

export const GridItemDetail = styled(Grid)`
  &.ui.grid {
    margin: 0;
    padding: 17px 10px;
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #ffffff;
  
    > .row {
      //margin: 5px 0;
      //padding: 15px 5px;
      padding: 0;
      
      > .column {
        padding: 5px;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        //padding: 0 5px;
      }
    }
  }
`

export const GridColumnLeftDivider = styled(GridColumn)`
  border-left: solid 1px #dee2e6;
  padding-left: 15px !important;
`

export const GridRowHeader = styled(GridRow)`
  padding: 0 10px !important;
  display: flex !important;
  flex-flow: row !important;
  justify-content: space-between !important;
  margin-bottom: 8px;
`

export const IconTrash2 = styled(Trash2)`  
  color: #f16844;
`

export const DivHeader = styled.div`
  padding-right: 10px;
  color: #20273a;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`