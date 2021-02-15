import styled from 'styled-components'
import { Trash2 } from 'react-feather'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'

export const GridItemDetail = styled(Grid)`
  &.ui.grid {
    margin: 0;
    padding: 11px 10px;
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #ffffff;
  
    > .row {
      margin: 5px 0;
      padding: 0;
      
      > .column {
        padding: 0 5px;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
    }
  }
`

export const GridRowLessMargin = styled(GridRow)`
  margin: 0 !important;
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
  cursor: pointer;
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

export const DivDropdownQuantityWrapper = styled.div`
  z-index: 600;

  & > .field {
    z-index: 601;
    > .ui.search.dropdown,
    > .ui.search.selection.dropdown {
      z-index: 600 !important;
      min-height: 32px;
      height: 32px;
      width: 65px;
      min-width: 65px;
      max-width: 65px;
      padding: 8px 29px 6px 12px;
       
      > input.search {
        padding: 8px 29px 6px 12px;
      }
      
      > div.visible.menu.transition {
        z-index: 600 !important;
      }
    }    

    .ui.selection.dropdown > .dropdown.icon {
      padding: 8px 11px 6px 11px;
    }
  }  
`