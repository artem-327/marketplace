import styled from 'styled-components'
import { Sidebar, Accordion, Segment, GridRow, Icon, Dropdown, Grid, GridColumn } from 'semantic-ui-react'
import Tooltip from '~/components/tooltip'

const popupWidth = 400

export const FlexSidebar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #edeef2;
  text-align: left;
  font-size: 14px;  
  padding-bottom: 0px;
  margin-top: -6px;
  margin-right: 10px;
  min-width: 200px;
  
  .ui.input {
    .ui.label,
    input {
      padding-top: 8px;
      padding-bottom: 7px;
      font-size: 13px;
      background-color: #fdfdfd;
    }
  } 
  
  .field {
    .ui.dropdown {
      min-height: 32px;
      padding-top: 8px;
      padding-bottom: 6.7px;
      background-color: #fdfdfd;
      &.disabled {
        opacity: 1;
        color: #cecfd4;
      }
    }
  }
  
  .phoneNumber .field {
    .ui.dropdown{
      padding-top: 9px;
      padding-bottom: 5.7px;
      font-size: 13px;
      background-color: #fdfdfd;
      > .menu {
        left: -20% !important;
      }
      &.disabled {
        opacity: 0.45;
        //color: #cecfd4;
      }
    }
    input {
      padding-top: 8px;
      padding-bottom: 6.7px;
      font-size: 13px;
      background-color: #fdfdfd;
    }
  }
  
  .ui.large.button,
  .ui.button {
    font-size: 14px;
    font-weight: normal;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    opacity: 1 !important;
    color: #848893;
    margin: 10px 5px;
  
    background: #ffffff;
    :hover, :focus {
      color: #20273a;
      background: #f8f9fb;
    }
    :active {
      color: #20273a;
      background: #edeef2;
    }
    :disabled {
      color: #cecfd4;
      background: #ffffff;
    }
   }
  
  .ui.large.button.primary,
  .ui.button.primary {
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
    background: #2599d5;
    margin: 10px 5px;
    border: 1px solid #dee2e6;
    opacity: 1 !important;
    
    :hover, :focus {
      background: #188ec9;
    }
    :active {
      color: #ffffff;
      background: #0d82bc;
    }
    :disabled {
      color: rgba(255, 255, 255, 0.25);
      background: rgba(37, 153, 213, 0.4);
    }
   }
`

export const FlexContent = styled.div`
  padding: 0 10px;  
`

export const FiltersContainer = styled.div`     // ! ! smazat?
  margin: 0 15px 0 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: bold;
  font-size: 1.1rem;
`

export const TopButtons = styled.div`
  margin: 0;
  text-align: center;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  > .button {
    padding-right: 0px;
    padding-left: 0px;
    width: 125px;
  }
`
export const BottomButtons = styled.div`
  margin: 0;
  text-align: center;
  border-top: 1px solid #dee2e6;
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
  padding: 0 5px;  
  > .button {
    padding-right: 0px;
    padding-left: 0px;
  }
  > .button:nth-child(1) {
    width: 110px;
  }
  > .button:nth-child(2) {
    width: 65px;
  }
  > .button:nth-child(3) {
    width: 65px;
  }
`

export const Title = styled.div`       // ! ! smazat?
  font-size: 18px !important;
  font-weight: bold;
  font-family: 'Cabin', sans-serif !important;
  margin-top: 20px;
`

export const AccordionTitle = styled(Accordion.Title)`
  margin: 5px 0 5px 0px !important;
  padding: 5px 0 5px 0px !important;
  font-size: 14px !important;
  font-weight: bold;
  color: #546f93 !important;
  & > i {
    margin-right: 10px;
  }
`

export const IconRight = styled.div`
  color: #2599d5;
  float: right;
`

export const AccordionItem = styled.div`
  //border-bottom: 1px solid #dee2e6;
  // padding-left: 10px
`

export const FilterAccordion = styled(Accordion)`
  & > div:not(:last-child) {
    border-bottom: 1px solid #dee2e6;
  }
`

export const AccordionContent = styled(Accordion.Content)`
  font-size: 13px;
  padding-top: 0px !important;
  .fields {
    margin-bottom: 10px !important;
    .field {
      .ui.checkbox {
        label {
          color: #848893;
        }
        &.checked {
          label {
            color: #20273a;
          }
        } 
       }
      .field {
        label {
          color: #546f93;
        }
      }
    }
  }
  span {
    //font-size: 14px;
    font-family: 'Cabin', sans-serif !important;
  }
  & .field:first-child {
    //padding-top: 0px;
  }
  & > .field:last-child {
    //padding-bottom: 8px;
  }  
`

export const DateInputStyledWrapper = styled.div`
  .ui.label {
    font-size: 13px !important;
    font-weight: normal;
    color: #848893;
    background-color: #f8f9fb;
    border: 1px solid #dee2e6;
  }
`

export const WhiteSegment = styled(Segment)`   // ! ! smazat?
  position: absolute !important;
  bottom: 4.57142858em;
  max-width: 100%;
  margin: -1em -1em 0 !important;
  padding: 1em 2em 2em !important;
  background-color: #ffffff !important;
`

export const GraySegment = styled(Segment)`   // ! ! smazat?
  //background-color: #ededed !important;
  position: 'relative';
  overflow: 'visible';
  height: '4.57142858em';
  margin: '0';
`

export const RelaxedRow = styled(GridRow)`
  padding-top: 6px !important;
  padding-bottom: 0px !important;
`

export const FilterTag = styled.div`
  border: 1px solid #979797;
  height: 24px;
  font-size: 14px;
  padding: 3px 3px 3px 10px;
  margin-bottom: 5px;
  text-align: center;
  color: #979797;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 5px;
  max-width: 10vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const SavedFiltersSegment = styled(Segment)`
  padding-top: 0px !important;
  margin-top: 0px !important;
`

export const SavedFilterItem = styled.div`
  font-weight: normal;
`

export const SavedFilterTitle = styled(AccordionTitle)`
  font-weight: normal;
  margin: 0px !important;
`

export const SavedFilterIcon = styled(Icon)`
  font-size: 20px !important;
  float: right;
`

export const DeleteFilterIcon = styled(Icon)`
  font-size: 20px !important;
  color: #f16844;
  float: right;
  padding: 0 !important;
  right: 0;
`

export const PopupRow = styled(GridRow)`
  padding-top: 0.6rem !important;
  padding-bottom: 0.6rem !important;
`

export const WiderTooltip = styled(Tooltip)`
  min-width: ${popupWidth}px !important;
  ::before {
    left: ${popupWidth * 0.5}px !important;
  }
`

export const LessPaddedRow = styled(GridRow)`   // ! ! smazat?
  padding-top: 12px !important;
  padding-bottom: 12px !important;
`

export const SavedFiltersGrid = styled(Grid)`
  margin: 0px !important;
  vertical-align: middle;
  > .row:nth-child(1) {       // Bold text
    //padding: 0 !important;
    font-weight: bold !important;
    color: #20273a !important;
    > .column {
      padding-left: 0 !important;
    }
  }
`

export const SavedFilterDetailGrid = styled(Grid)`
  margin: 0px -10px !important;
  vertical-align: middle;
  padding: 0 !important;
    .ui.primary.button,
    .ui.large.button {
      margin: 5px 5px 11px 10px !important;
  }
  > .row {
    padding: 0 !important;
    .column {
      margin: 0 !important;
      padding: 0 !important;
    }  
  }
`

export const SavedFilterRow = styled(GridRow)`
  padding-top: 7px !important;
  padding-bottom: 7px !important;
  .column {
    padding-right: 5px !important;
    > i {
      margin: 0;
    }
  }
`

export const BottomMargedDropdown = styled(Dropdown)`
  margin-bottom: 10px;
`

export const SaveFilterNormalRow = styled(GridRow)`   // ! ! smazat?
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
  background-color: #edeef2;
`

export const SaveFilterTitle = styled.div`
  padding: 0px;
  margin-top: 22px;
  font-size: 14px !important;
  font-weight: bold;  
  color: #2599d5;
  font-weight: bold;
`

export const SaveFilterClose = styled(Icon)`  // ! ! delete?
  position: absolute;
  top: -1px;
  right: 2rem;
  margin: 0 !important;
  cursor: pointer;
`

export const StyledGrid = styled(Grid)`
  margin-bottom: 0px !important;
`

export const SaveFiltersGrid = styled(Grid)`
  margin: 0px !important;
  vertical-align: middle;
  background-color: #edeef2;  
  > .row {
    padding: 0 !important;
    .column {
      margin: 0 !important;
      padding: 0px 10px !important
    }  
  }
  > .ui.button,
    .ui.large.button {
      margin-right: 0;
  }
  > .row:nth-child(1) {       // Save Filter button
    border-bottom: 1px solid #dee2e6;
  }
  > .row:nth-child(2) {       // 'Filter Name'
    padding-top: 10px !important;
  }
  > .row:nth-child(3) {       // Filter Name Input + Save button
    padding-top: 5px !important;
    > .ui.button,
    .ui.large.button {
      margin: 0;
    }
  }
  > .row:nth-child(4) {       // Automatically Apply
    padding-top: 15px !important;
    > .column .field{
    float: right;
    }
  }  
`

export const NotificationsFiltersGrid = styled(Grid)`
  margin: 0px !important;
  vertical-align: middle;
  background-color: #edeef2;  
  > .row {
    padding: 0 !important;
    .column {
      margin: 0 !important;
      padding: 0px 10px !important
    }  
  }
  > .row:nth-child(1) {       // Enable Notifications
    padding-top: 15px !important;
    > .column .field{
    float: right;
    }
  }
  > .row:nth-child(2) {       // Email Notifications checkbox
    padding-top: 15px !important;
  }
  > .row:nth-child(3) {       // Email Input
    padding-top: 6px !important;
  }
  
  > .row:nth-child(4) {       // Mobile Notifications checkbox
    padding-top: 15px !important;
  }
  > .row:nth-child(5) {       // Phone Input
    padding-top: 6px !important;
  }
  > .row:nth-child(6) {       // System Notifications checkbox
    padding-top: 15px !important;
  }
  > .row:last-child {
    padding-bottom: 15px !important;
  }
`

export const NormalColumn = styled(GridColumn)` // ! ! smazat?
  //margin: 0 !important;
  //padding: 0px 10px !important
`

export const SmallerTextColumn = styled(GridColumn)`
  font-size: 90%;
`

export const BoldTextColumn = styled(GridColumn)` // ! ! delete
  padding: 0 !important;
  font-weight: bold !important;
  color: #20273a !important;
`

export const SavedFiltersNotifications = styled.div`
  padding: 0 !important;
`

export const InputWrapper = styled.div`
  position: relative;
  > .field .ui.input input {
    position: static;
    padding-right: 36px; 
  }
  > .ui.label {
    width: 24px;
    height: 24px;
    padding: 5.5px 0;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    text-align: center;
    color: #2599d5;
    border-radius: 2px;
    background-color: rgba(37, 153, 213, 0.1);
    position: absolute;
    top: 27px;
    right: 4px;
  }
`

export const QuantityWrapper = styled.div`
  position: relative;
  > .sideButtons {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 0;
    top: 23px;
    .ui.button {
      position: absolute;
      margin: 0;
      &.buttonPlus {
        border-radius: 0 3px 0 0;
        width: 32px;
        padding: 1px 0 0 0;
      }
      &.buttonMinus {
        border-radius: 0 0 3px 0;
        width: 32px;
        padding: 0;
        top: 16px;
      }
    }
  }
`