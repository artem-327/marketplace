import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: -3.5px -5px;
    padding: 16px;
    
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #ffffff;

    .row {
      padding: 3.5px 0;
      
      .column {
        padding: 0 5px;
      }
    }
  }
`