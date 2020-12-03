import styled from 'styled-components'
import {
  Grid
} from 'semantic-ui-react'

export const DetailMessage = styled.div`
  text-align: left;
  font-size: 14px;
  color: #20273a;
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
  
  .ui.button {
    display: flex;
    align-items: center;      
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    margin: 0 5px;  
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;

    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }

    &:active {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #edeef2;
      color: #20273a;
    }
  }
`