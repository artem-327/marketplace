import styled from 'styled-components'
import {
  Grid
} from 'semantic-ui-react'

export const DetailMessage = styled.div`
  
`

export const StyledGrid = styled(Grid)`
  &.ui.grid {
    margin: 0 5px;
    
    .row {
      margin: 0;
      padding: 5px 0;
    }
    
    .column {
      margin: 0;
      padding: 0 5px;
    }
  }
`