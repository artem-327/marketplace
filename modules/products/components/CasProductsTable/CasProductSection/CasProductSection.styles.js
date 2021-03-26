import styled from 'styled-components'
import { Grid, Checkbox } from 'semantic-ui-react'

export const DivHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  background-color: #edeef2;
  height: 30px;
  padding: 0 11px;
  margin: 20px 0 30px;
`

export const DivHeaderCaption = styled.div`
  font-size: 14px;
  color: #404040;
  margin: auto 0;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: -27.5px -10px 2.5px;

    > div.row {
      padding: 7.5px 0;

      > div.column {
        padding: 0 10px;
      }
    }
  }
`

export const GridDropdownOptions = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > div.row {
      padding: 0;

      > div.column {
        padding: 0 5px;
      }
    }
  }
`

export const CheckboxStyled = styled(Checkbox)`
  margin: auto 0;
`