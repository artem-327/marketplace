import { Input, Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const DivHandlerWrapper = styled.div`
  margin: 10px 0 17.5px 0;
  display: flex;
  flex-direction: row;
`

export const ButtonSwitch = styled(Button)`
  &.ui.button {
    height: 38px;
    margin-top: 1px;
    white-space: nowrap;
    min-width: unset;
    color: #20273a;
    font-weight: 500;
    background-color: #ffffff;
    
    &.active {
      background-color: #edeef2;
    }
    
    &.right.attached,
    &.left.attached {
      text-align: center;
      padding-right: 16px;
      padding-left: 16px;
    }
    
    &.left.attached {
      border-radius: 3px 0 0 3px;
    }
    
    &.right.attached {
      border-radius: 0 3px 3px 0;
    }
  }
`

export const InputSearch = styled(Input)`
  height: 40px;
  margin-left: 10px;
  width: 100%;
`