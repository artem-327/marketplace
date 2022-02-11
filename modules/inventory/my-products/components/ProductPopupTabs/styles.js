import styled from 'styled-components'
import {  Grid, Menu } from 'semantic-ui-react'

export const StyledMenu = styled(Menu)`
  &.ui.pointing.secondary.menu {
    margin: -20px -1px 0;
    background-color: #fff;
  }
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 15px 20px;
  }

  > .row {
    padding: 7.5px 0 !important;
    .column {
      padding: 0 10px !important;
    }
  }

  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
  }
`

export const DivProductNameSegment = styled.div`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f5f7fa;
  padding: 9px 15px;
`

export const DivProductNameHeader = styled.div`
  padding: 2px 0;
  font-size: 12px;
  color: #848893;
`

export const DivBoldText = styled.div`
  padding: 2px 0;
  font-size: 14px;
  font-weight: bold;
  color: #20273a;
`

export const DivLabelRow = styled.div`
  margin-bottom: 6px;
`

export const DivListTableWrapper = styled.div`
  margin: 10px;
  width: 100%;
  padding: 0 !important;
`

export const DivListRowItem = styled.div`
  box-shadow: 0 1px 0 0 #dee2e6;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const DivListName = styled.div`
  padding-right: 10px;
  font-size: 14px;
  color: #848893;
`

export const DivListValue = styled.div`
  padding-left: 10px;
  font-size: 14px;
  color: #20273a;
`