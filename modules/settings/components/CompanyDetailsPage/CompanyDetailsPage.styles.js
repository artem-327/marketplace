import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

export const DivPage = styled.div`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

export const DivPageHeaderRow = styled.div`
  padding: 16px 20px;
  border-bottom: solid 1px #dee2e6;
  font-size: 14px;
  font-weight: bold;
  color: #20273a;
  line-height: 1.29;
`

export const DivPageBottomButtons = styled.div`
  padding: 10px;
  border-top: solid 1px #dee2e6;
  display: flex;
  justify-content: flex-end;
`

export const DivContent = styled.div`
  padding: 15px;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > div.row {
      padding: 7.5px 0;

      > div.column {
        padding: 0 15px;
      }
    }
  }
`