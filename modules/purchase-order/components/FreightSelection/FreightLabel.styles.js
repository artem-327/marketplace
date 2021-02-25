import styled from 'styled-components'
import { Button, Grid, Message } from 'semantic-ui-react'

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0 -5px;
  
    > .row {
      margin: 2.5px 0;
      padding: 15px 5px;
      
      > .column {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding: 0 5px;
      }
    }
  }
`

export const DivLine = styled.div`
  border-bottom: solid 1px #dee2e6;
`

export const ColumnWithLine = styled(Grid.Column)`
  align-self: center !important;
`

export const RowWithLine = styled(Grid.Row)`
  padding: 10px 0 !important;
`

export const RowWithRectangle = styled(Grid.Row)`
  padding: 0 !important;
`

export const ButtonCustom = styled(Button)`
  &.ui.button.basic {
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #20273a !important;
    
    .i {
      font-weight: 500 !important;
      color: #20273a !important;
    }
  }
`

export const CustomMessage = styled(Message)`
  &.ui.message {
  
  border-radius: 4px;
  border: solid 1px #2599d5;
  padding: 14px 10px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  background-color: #ffffff !important;
  display: block !important;
  }
  
  i {
    color: #2599d5;
  }

  *:not(i) {
    color: black !important;
  }

  & .ui.button.basic,
  & .button {
    float: right;
    bottom: 6px;
    position: relative;
    font-size: 12px !important;
    font-weight: 500 !important;
    color: #20273a;
    height: 32px;
    min-width: 71px;
    padding: 6px 15px !important;
  }
`