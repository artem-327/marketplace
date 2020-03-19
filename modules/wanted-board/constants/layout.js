import styled from 'styled-components'
import { Sidebar, Accordion, Segment, GridRow, Icon, Dropdown, Grid, GridColumn } from 'semantic-ui-react'

export const UpperCaseText = styled.div`
  text-transform: uppercase;
`

export const ControlPanel = styled.div`
  padding: 5px 0;
  .ui.primary.button {
    background-color: #2599d5;
  }
`

export const ProductChemicalSwitch = styled.div`
  margin: 0 20px;
  display: inline-block;
  &.product {
    .ui.button {
      width: 110px;
      padding-left: 1.071428571em;
      padding-right: 1.071428571em;
      text-align: center;
    }
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
  &.chemical {
    .ui.button {
      width: 110px;
      padding-left: 1.071428571em;
      padding-right: 1.071428571em;
      text-align: center;
      }
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

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
    
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
  float: right;
  .ui.button,
  button {
    height: 40px;
  }
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
    padding: 0.928571429em 1.5em 0.928571429em;
    color: #848893;
    background-color: #ffffff;
    border: solid 1px #dee2e6;
  }

  .ui.primary.button {
    color: #ffffff;
    background-color: #2599d5;
    border: none;
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
          &[type=number] {
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
        padding-right: 47px; 
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
      right: 0.42857143em;
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
      width: 2.8571429em;
      height: 2.8571429em;
      right: 0;
      top: 0;
      .ui.button {
        position: absolute;
        margin: 0;
        background-color: #f8f9fb;
        border: solid 1px #dee2e6;
        font-family: feathericon;
        text-align: center;
        color: #848893;
        
        &.buttonPlus {
          border-radius: 0 3px 0 0;
          width: 2.8571429em;
          padding: 0.2142857em 0 0.1428571em 0;
        }
        &.buttonMinus {
          border-radius: 0 0 3px 0;
          width: 2.8571429em;
          padding: 0.1428571em 0 0.1428571em 0;
          top: 1.42857143em;
        }
      }
    }
  }
`

