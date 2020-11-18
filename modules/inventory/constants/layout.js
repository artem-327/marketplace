import styled from 'styled-components'

import {
  Sidebar,
  Segment,
  GridColumn,
  Icon,
  Grid
} from 'semantic-ui-react'


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
      min-height: 32px;
      font-size: 1em;
      line-height: 1.29;
      padding-top: 0.714285714em;
      padding-bottom: 0.714285714em;
      border: solid 1px #dee2e6;
      background-color: #fdfdfd;
      &.disabled {
        opacity: 1;
        color: #cecfd4;
      }
      > .default.text {
        margin: 0 0 0 0.64285714em;
      }      
    }
    > .ui.multiple.selection.dropdown {
      padding: 7.5px 11px;
      > a.ui.label {
        margin: 1.5px;
        padding: 3px 0.357142857em;
        box-shadow: none;
        background: none;
        border-radius: 2px;
        background-color: #edeef2;
        color: #848893;
        font-weight: normal;
      }
      > .default.text {
        margin: 3px 15px;
      }
    }
  }
  .ui.button.doc-manager {
    border-radius: 3px;
    border: solid 1px #2599d5;
    background-color: #ddf1fc;
    color: #2599d5;
    > i.icon {
      font-size: 18px;
    }
  } 
  .column.product-offer-documents {
    tbody tr td:nth-child(2) {
      color: #2599d5;
    }
  }
`

export const FlexTabs = styled.div`
  height: 100%;
  margin: 0;
  text-align: left;
  padding: 0;
  font-weight: 400;
  font-size: 1.1rem;
  > .tab-menu .ui.menu {
    padding: 0 2.142857143em !important;
    border-bottom: none !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
    > .item {
      font-weight: 500;
      color: #848893;
    }
    > .active.item {
      color: #20273a;
      border-bottom-width: 2px;
    }
  }
  > .tab-menu,
  > .tab-menu > .tab {
    height: 100%;
  }
  > .tab-menu > .tab {
    padding: 0 2.142857143em !important;
    > .ui.grid {
      margin: 1.607142857em -0.714285714em;
      > .row {
        padding: 0.535714286em 0;
        > .column {
          padding: 0 0.714285714em;
        }    
      }
    }
  }
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

export const TopMargedColumn = styled(GridColumn)`
  margin-top: 6px !important;
`

export const GraySegment = styled(Segment)`
  border-radius: 0.285714286em !important;
  border: solid 1px #dee2e6 !important;
  background-color: #f8f9fb !important;
  margin: 0.5em 0 0 0 !important;
  padding: 0 1em !important;
  box-shadow: unset !important;
  > .ui.grid {
    margin: 0.535714286em -1em;
    > .row {
      padding: 0.535714286em 0;
      > .column {
        padding: 0 1em;
      }    
    }
  }
`

export const BottomButtons = styled.div`
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
  }
`

export const HighSegment = styled(Segment)`
  height: 100%;
  padding: 0 !important;
`
export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

export const CloceIcon = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

export const InputWrapper = styled.div`
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
        text-align: center;
        color: #848893;
        min-width: unset;
        min-height: unset;
        height: unset;
        line-height: 14px;
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

export const SmallGrid = styled(Grid)`
  & {
  margin: 0 -0.357142857em !important;
  > .row {
    padding: 0.535714286em 0 !important;
    > .column {
      padding: 0 0.357142857em !important;
    }    
  }
  }
`

export const CustomLabel = styled.div`
  margin: 0em 0em 0.428571429em 0em;
  font-size: 1em;
  line-height: 1.29;
  color: #404040;
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
    background: #ffffff;
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