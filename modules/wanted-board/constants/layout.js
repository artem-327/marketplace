import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

export const UpperCaseText = styled.div`
  text-transform: uppercase;
`

export const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
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

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    display: flex;
    align-items: center;

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

    &.secondary {
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

export const CustomSearchNameTags = styled.div`
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

export const ControlPanel = styled.div`
  padding: 5px 0;
  .ui.primary.button {
    background-color: #2599d5;
  }
`

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding-bottom: 80px;
  top: 80px !important;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;

  &.full-screen-sidebar {
    top: 0 !important;
    padding-bottom: 0px;
  }
  
  .ui.grid {
    margin: 1.607142857em 1.428571429em;
    .row {
      padding: 0.535714286em 0;
    }
    .row.label-row {
      padding: 0.535714286em 0 0.357142857em 0;
    }
    .row.light-labels {
      padding: 0 0 0.535714286em 0;
      .field-label {
        color: #848893;
      }
    }
    .column {
      padding: 0 0.714285714em;
      &.float-right {
        .field {
          float: right;
        }
      }
    }
  }

  .field {
    font-size: 1em !important;
    line-height: 1.29 !important;
    font-weight: normal;
    > label {
      font-size: 1em !important;
      color: #404040;
      margin: 0em 0em 0.428571429em 0em !important;
    }
    > textarea,
    > .ui.input input,
    > .ui.dropdown {
      min-height: 40px;
      font-size: 1em;
      line-height: 1.29;
      padding-top: 0.642857143em;
      padding-bottom: 0.642857143em;
      border: solid 1px #dee2e6;
      background-color: #fdfdfd;
      &.disabled {
        opacity: 1;
        color: #cecfd4;
      }
      > .default.text {
        margin: 0;
      }
    }
    > .ui.multiple.selection.search.dropdown,
    > .ui.multiple.selection.dropdown {
      padding-top: 0.428571429em;
      padding-bottom: 0.428571429em;
      > a.ui.label {
        margin: 0.214285714em 0.214285714em;
        padding: 3px 0.357142857em;
        box-shadow: none;
        background: none;
        border-radius: 2px;
        background-color: #edeef2;
        color: #848893;
        font-weight: normal;
      }
      > .default.text {
        margin: 0 0 0 0.64285714em;
        padding-top: 0.285714286em;
      }
    }
    > .ui.multiple.selection.search.dropdown {
      > .default.text {
        padding-top: 0.714285714em;
      }
      > input.search {
        margin: 0 0 0 0.64285714em;
        padding: 4px 0;
      }
    }
  }
`

export const TopButtons = styled.div`
  padding-top: 9px;
  float: right;
`

export const BottomButtons = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 0.714285714em 1.785714286em;
  text-align: right;

  .ui.button {
    font-size: 1em;
    margin: 0 0.357142857em;
    padding: 9px 18px 9px;
    
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #20273a;
    
    &:hover {
      background-color: #f8f9fb;
    }
    
    &.disabled {
      background-color: #ffffff;
      color: #cecfd4;
    }
    
    &.large.primary {
      border: none;    
      background-color: #2599d5;
      color: #ffffff;
      
      &:hover {
        background-color: #188ec9;
      }
      
      &.disabled {
        background-color: #bde0f2;
        color: #ffffff;
      }
    }
  }

  .ui.modal & {
    margin: 30px -1.5rem -1.5rem;
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;
  }
`

export const HighSegment = styled.div`
  //height: 100%;
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
  padding-left: ${props => (props.paddingLeft20 ? '20px' : '30px')};
  display: flex;
  flex-direction: row;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }
  
  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }
  
  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

export const InputWrapper = styled.div`
  td > & {
    position: relative;
    min-width: 107px;
    height: 22px;
    margin: 0 -5px;

    * {
      max-height: 100%;
    }

    > div {
      position: absolute !important;
      top: -5px;
      bottom: -5px;
      width: 100%;
      height: 32px !important;
      max-height: 32px !important;
    }

    div {
      > .field {
        // .ui.input input {
        box-sizing: border-box;
        max-width: 100%;
        padding: 5px 30px 5px 13px;
        background-color: #fdfdfd;
        font-size: 14px;
        line-height: 1.4285714;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
      }
      // }

      > .ui.label {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 24px;
        height: 24px;
        border-radius: 2px;
        padding: 0;
        background-color: rgba(132, 194, 37, 0.15);
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        color: #84c225;
        line-height: 24px;
      }
    }
  }

  > .field-label {
    margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  div {
    position: relative;

    > .field {
      margin: 0 !important;

      .ui.input input {
        padding-left: 47px;
        background-color: #fdfdfd;
      }
    }
    > .ui.label {
      padding: 0.5em 0.7142857em;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      text-align: center;
      color: #84c225;
      border-radius: 2px;
      background-color: rgba(132, 194, 37, 0.15);
      position: absolute;
      top: 0.42857143em;
      left: 0.42857143em;
    }
  }
`

export const InputLabeledWrapper = styled.div`
  > .field-label {
    margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  & .field {
    .ui.input {
      > input {
        border-radius: 3px 0 0 3px;
        width: 50% !important;
      }
      > div.ui.label {
        font-weight: normal;
        border-radius: 0 3px 3px 0;
        border: solid 1px #dee2e6;
        background-color: #f8f9fb;
        color: #848893;
      }
    }
  }
`

export const QuantityWrapper = styled.div`
  > .field-label {
    margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  & div {
    position: relative;
    > .field {
      margin: 0 !important;
      .ui.input input {
        padding-right: 47px;
        background-color: #fdfdfd;
      }
    }
    > .sideButtons {
      position: absolute;
      width: 40px;
      height: 40px;
      right: 0;
      top: 0;
      .ui.button {
        position: absolute;
        margin: 0;
        background-color: #f8f9fb;
        border: solid 1px #dee2e6;
        font-family: feathericon;
        min-width: unset;
        min-height: unset;
        height: unset;
        line-height: 14px;
        text-align: center;
        color: #848893;
        border-radius: 0 3px 0 0;
        width: 40px;

        &.buttonPlus {
          padding: 3px 0 2px 0;
        }
        &.buttonMinus {
          padding: 2px 0 2px 0;
          top: 20px;
        }
      }
    }
  }
`

export const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

export const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  
  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

export const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

export const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`