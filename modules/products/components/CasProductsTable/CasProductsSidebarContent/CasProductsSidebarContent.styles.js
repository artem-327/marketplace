import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: -7.5px -10px;

    > div.row {
      padding: 7.5px 0;

      > div.column {
        padding: 0 10px;
      }
    }
  }
`