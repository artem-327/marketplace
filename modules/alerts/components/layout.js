import styled from 'styled-components'
import {
  Grid,
  Label,
  Header
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
    
    &:disabled {
      color: #cecfd4;
    }
  }
`

export const NavCircle = styled(Label)`
  .ui.vertical.menu .item > &.ui.circular.label {
    float: left;
    width: 16px;
    min-width: 16px;
    height: 16px;
    min-height: 16px;
    margin: 0 0 0 -30px;
    padding: 0 !important;
    background: #f16844;
    font-size: 10px;
    font-weight: 500;
    color: #fff;
    line-height: 16px;
  }
`

export const UserImage = styled.div`
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: -4px 10px -4px 0;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const UserName = styled(Header)`
  .bootstrapiso h3& {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #20273a;
    line-height: 17px;
  }
`

export const UserCompany = styled(Header)`
  .bootstrapiso h4& {
    margin: 1px 0 0;
    padding: 0;
    font-size: 12px;
    font-weight: 400;
    color: #848893;
  }
`

export const CheckIcon = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  border-radius: 50%;
  padding: 1px;
  background: #84c225;
  vertical-align: -3px;
  color: #fff;
  
  svg {
    width: 14px;
    height: 14px;
  }
`