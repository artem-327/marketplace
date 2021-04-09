import styled from 'styled-components'
import {
  Grid,
  Label,
  Header,
  Image,
  GridRow,
  GridColumn,
  Segment,
  List,
  Input,
  Button
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

export const UserImage = styled(Image)`
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: -4px 10px -4px 0;
  border: 1px solid #dee2e6 !important;
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

export const StyledNotification = styled.div`
  textOverflow: ellipsis;
  overflow: hidden;
  whiteSpace: nowrap;
  cursor: pointer;

  &.clickable {
    cursor: pointer;

    &:hover {
      font-weight: bold;
      color: #2599d5;
    }
  }
`

export const TableSegment = styled(Segment)`
  margin: 0;

  &.ui.segment {
    padding: 10px 15px;
  }
`

export const StyledList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: space-between;
    margin: 0;
    &:nth-child(n + 2) {
      border-top: 1px solid rgba(34, 36, 38, 0.15);
    }

    > .item {
      flex-grow: 1;
      max-width: 150px;
      padding: 10px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        color: #20273a;
        line-height: 1.2142857;
      }
    }
  }
`

export const AddressRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;

  .addresses {
    display: flex;
    flex-direction: row;
  }

  .right-buttons {
    .grid {
      margin: 0;

      .row {
        margin: 0;
        padding: 10px 0;
      }

      .column {
        margin: 0;
        padding: 0;
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
  }
`

export const AddressGrid = styled(Grid)`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  font-size: 14px;

  &.ui.grid {
    margin: 0 5px;
    padding: 12px 10px;
    width: 240px;

    .row {
      margin: 0;
      padding: 0;
    }

    .column {
      margin: 0;
      padding: 0 5px;
      color: #20273a;

      &.header {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #848893;
        margin-bottom: 3px;
      }

      &.company-name {
        color: #20273a;
        font-weight: bolder;
      }
    }
  }
`

export const SpanIdValue = styled.span`
  color: #20273a;
  margin-left: 7px;
  margin-right: 2px;
`