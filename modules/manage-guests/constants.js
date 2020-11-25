import styled from 'styled-components'
import { Header, Menu, Button, Checkbox, Input, Dropdown, Grid, GridRow, GridColumn, Container, List} from 'semantic-ui-react'

export const StyledContainer = styled(Container)`
  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;   
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }
    &:active {
      background-color: #edeef2;
      color: #20273a;
    }
  
    svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
    }
      
    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;    
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }
    
    &.primary {
      box-shadow: none;
      border: none;
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`

export const BottomButtons = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 10px 25px;
  text-align: right;

  .ui.button {
    display: inline-block;
    margin: 0 5px;
    align-items: center;
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;   
    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }
    &:active {
      background-color: #edeef2;
      color: #20273a;
    }
  
    svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
    }
      
    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;    
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }
    
    &.primary {
      box-shadow: none;
      border: none;
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`

export const StyledSwitch = styled.div`
  display: inline-block;
  .ui.button {
    text-align: center;
    padding-left: 16px;
    padding-right: 16px;
  }
  &.false {
    .ui.left.button {
      border: solid 1px #dee2e6;
      background-color: #edeef2;
      color: #20273a;
    }
    .ui.right.button {
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
    }
  }
  &.true {
    .ui.left.button {
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
    }
    .ui.right.button {
      border: solid 1px #dee2e6;
      background-color: #edeef2;
      color: #20273a;
    }
  }
`