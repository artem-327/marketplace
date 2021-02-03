import styled from 'styled-components'
import { Grid, GridRow } from 'semantic-ui-react'

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;
    padding: 0;
    
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #ffffff;

    .row {
      padding: 10px 0;
      
      .column {
        padding: 0 20px;
        
        &.buttons {
          padding: 0 10px;
        }
      }
      
      
    }
    
    .row:not(:last-child) {
      border-bottom: solid 1px #dee2e6;
    }
    
    
  }
`

export const DivRowHeader = styled.div`
  color: #20273a;
  font-weight: bold;
  padding: 5px 0;
`

export const DivTopControl = styled.div`
  text-align: right;
  color: #2599d5;
  cursor: pointer;
`

export const DivRightButtons = styled.div`
  display: flex;
  float: right;
  margin-left: auto;
`
