import styled from 'styled-components'
import {
    Grid,
    GridRow,
    Label,
    Header,
    Image,
    GridColumn,
    Segment,
    List,
    Modal,
    Dropdown,
    Form,
    Accordion,
    Table,
    Button
} from 'semantic-ui-react'
import { ChevronDown } from 'react-feather'

export const PositionHeaderSettings = styled.div`
    position: relative;
    z-index: 602;
`

export const CustomRowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 15px 25px;
    flex-wrap: wrap;

    > div {
    align-items: top;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    }

    .column {
    margin: 5px 5px;
    }

    input,
    .ui.dropdown {
    height: 40px;
    }

    .ui.button.primary {
    background: rgb(37, 153, 213);
    
    svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
    }
    }
`

export const DivColumn = styled.div`
    margin-right: 9px !important;
`

export const CustomGridColumn = styled(GridColumn)`
    padding: 0 30px !important;
`


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

export const CustomDivAddDocument = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const RelatedDocumentsDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

export const FormFieldCustom = styled(Form.Field)`
  .ui.checkbox input.hidden {
    z-index: 1 !important;
  }
  .ui.checkbox input[type='radio'] {
    opacity: 1 !important;
    position: inherit !important;
    margin-right: 10px !important;
    width: 15px !important;
    height: 15px !important;
  }
`

export const DivMarginBottom = styled.div`
  padding-bottom: 30px;
`


export const OrderSegment = styled(Segment)`
  width: calc(100% - 64px);
  margin-left: 32px !important;
  margin-bottom: 30px !important;

  > .ui.grid {
    padding: 0;

    > .row {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    
    div.row-flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      
      > div.column {
        width: auto !important;
        
        &:first-child {
          flex-shrink: 1;
        }
        
        &:last-child {
          flex-grow: 1;
        }
      }
    }

    > .column,
    > .row > .column {
      padding: 20px !important;
    }
  }
  
  .header-top {
    margin-left: -10px;
  }

  h1.header {
    height: 17px;
    margin: 0 0 0.5rem 10px !important;
    padding: 0;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #20273a;
    line-height: 1.2142857;

    ~ a {
      display: inline-block;
      height: 32px;
      margin: 0 0 5px 10px;
      border: 1px solid #2599d5;
      border-radius: 3px;
      padding: 5px 14px;
      background-color: #ddf1fc;
      font-size: 13px !important;
      font-weight: 500;
      color: #2599d5;
      line-height: 1.5384615;

      svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
      }
    }
  }
`

export const OrderList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: flex-end;

    > .item:nth-child(n) {
      // nth-child to have stronger path
      flex-grow: 1;
      max-width: 150px;
      border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
      padding: 13px 15px !important;

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
        font-weight: 700;
        color: #20273a;
        line-height: 1.2142857;

        &.green {
          color: #84c225;
        }

        &.red {
          color: #f16844;
        }
      }
    }
  }
`

export const OrderAccordion = styled(Accordion)`
  box-shadow: 0 0 0 0 transparent !important;
  background: transparent !important;

  > .title {
    border: solid 1px #dee2e6 !important;
    border-radius: 4px;
    background-color: #f8f9fb !important;

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  > .content {
    border: 1px solid #dee2e6;
    border-top: 0 none !important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 15px 1em !important;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);

    + .title {
      margin-top: 10px !important;
    }

    .table-responsive {
      .ui.table {
        width: calc(100% - 32px);
        margin: 16px;
        border: 0 none;

        th.p-0,
        td.p-0 {
          width: 0 !important;
          padding: 0 !important;
        }

        span.product-name {
          font-weight: 500;
        }
      }
    }
  }
`

export const AccordionTitle = styled(Accordion.Title)`
  padding-left: 9px !important;
  text-transform: uppercase;
  font-size: 1rem !important;
  color: #20273a !important;
  line-height: 1.9285714;

  svg {
    transform: rotate(-90deg);
    color: #2599d5 !important;
  }

  &.active {
    color: #20273a !important;

    svg {
      transform: rotate(0deg);
      color: #2599d5 !important;
    }
  }
`

export const Chevron = styled(ChevronDown)`
  width: 20px;
  height: 20px;
  margin: 3px 6px 4px;
  vertical-align: top;
  font-size: 20px;
  color: #2599d5 !important;
`

export const GridData = styled(Grid)`
  padding-top: 1em !important;
  padding-bottom: 1em !important;

  > .column:not(.row),
  > .row > .column,
  &.column > .column:not(.row),
  &.column > .row > .column {
    &[class*='key'] {
      width: 181px !important;

      + * {
        width: calc(100% - 211px) !important;
      }
    }
  }
`

export const GridDataColumn = styled(Grid.Column)`
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  font-size: 14px !important;
  line-height: 1.4285714 !important;

  &.key {
    padding-left: 30px !important;
    padding-right: 0 !important;
    font-size: 14px;
    font-weight: 400;
    color: #848893;
    line-height: 2.86;
  }
`

export const StyledTable = styled(Table)`
  width: 100% !important;
  margin: -10px 0 !important;
  padding: 0 !important;

  thead,
  tbody,
  tfoot {
    tr {
      th,
      td {
        border: 0 none !important;
        padding: 10px 0 10px 30px !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        color: #848893 !important;
        line-height: 1.4285714 !important;

        &:first-child {
          padding-left: 16px !important;
        }

        &:last-child {
          padding-right: 16px !important;
          color: #20273a !important;
        }
      }
    }
  }
`

export const TableRowData = styled(Table.Row)`
  padding-top: 0.75em !important;
  padding-bottom: 0.75em !important;
  font-size: 1.14285714rem;
  line-height: 1.125;

  strong {
    padding-left: 0;
    padding-right: 0;
  }
`

export const GridDataColumnTrackingID = styled(GridDataColumn)`
  display: flex !important;
`

export const StyledModal = styled(Modal)`
  > .header {
    padding: 21px 30px !important;
    font-size: 14px !important;
  }

  > .content {
    padding: 30px !important;
  }

  > .actions {
    background-color: #ffffff !important;
    padding: 10px 5px !important;
    button {
      margin: 0 5px;
      height: 40px;
    }
  }
`

export const TopRow = styled.div`
  margin: 0 32px;
  padding: 20px 0 50px 0;
  vertical-align: middle;
  display: block;

  > a {
    float: left;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;
    font-size: 14px !important;
    font-weight: 500;
    line-height: 1.43;
    padding: 9px 17px 11px 17px;
    margin-right: 10px;

    > svg {
      width: 18px;
      height: 20px;
      color: #848893;
      margin-right: 9px;
      vertical-align: middle;
    }
  }

  > div.field {
    float: right;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;

    > div {
      padding: 12px 18px;
    }

    > div:first-child {
      color: #848893;
    }
  }
`

export const StyledHeader = styled.span`
  color: #2599d5;
`

export const StyledStatusLabel = styled(Label)`
  font-size: 12px !important;
  height: 22px !important;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  color: #ffffff !important;
  border-radius: 11px !important;

  padding: 0.3333em 1.16667em 0.16667em 1.16667em !important;

  &.false {
    background-color: #f16844 !important;
  }
  &.true {
    background-color: #84c225 !important;
  }
`

export const ModalCustom = styled(Modal)`
  &.ui.modal > .actions {
    background: none !important;
  }
`

export const GridRowMargin = styled(GridRow)`
  &.row {
    ${props => (props.margin ? `margin: ${props.margin} !important;` : '')};
  }
`

export const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;
  margin: 0;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
  
  &[aria-expanded="true"].active.visible .menu.transition.visible {
    position: fixed !important;
    top: auto !important;
    left: auto !important;
  }
  
  &[aria-expanded="true"].active.visible.upward .menu.transition.visible {
    bottom: auto !important;
    transform: translateY(-100%) !important;
    margin-top: 0 !important;
  }
`

export const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -2px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }

  .settings_bankaccounts & {
    margin-left: -6px;
    margin-right: 0;
  }
`

export const ButtonCancel = styled(Button)`
  &.ui.button {
    max-height: 32px;
    height: 32px;
    margin-left: 10px;
    padding: 5px 25px !important;
  }
`