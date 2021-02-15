import styled from 'styled-components'
import { Button, Grid } from 'semantic-ui-react'

export const GridSummary = styled(Grid)`
  &.ui.grid {
    margin: -5px;   
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #ffffff;

    > .row {
      padding: 16px 15px;
      
      &.bottom-border {
        border-bottom: solid 1px #dee2e6;
      }
      
      &.less-padding {
        padding-bottom: 0;
      }
      
      &.small-text {
        font-size: 11px;
        line-height: 1.45;
        color: #20273a;
        padding-top: 0;
        padding-bottom: 11px;
        text-align: center;
      }
      
      .column {
        padding: 0 5px;
        
        &.right {
          color: #20273a;
          text-align: right;
        }
        
        &.bold {
          font-weight: bold;
        }
        
        &.summary {
          font-weight: 500;
          color: #20273a;
        }
        
        &.total {
          font-weight: bold;
          color: #848893;
        }
        
        &.description {
          color: #848893;
        }
      }
      
      &.total {
        background-color: #f8f9fb;
      }
    }
  }
`

export const LinkLabel = styled.a`
  color: #2599d5;
`