import { Header, Segment, Sidebar } from 'semantic-ui-react'
import styled from 'styled-components'

export const HeaderAccordion = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

export const SegmentCustom = styled(Segment)`
  background-color: #f8f9fb !important;
`

export const DivBottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  
  > div {
    float: right;
    display: flex;
    align-items: center;
  }
    
  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;
    margin: 0 5px;
    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }
    &:active {
      background-color: #edeef2;
      color: #20273a;
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

export const UpperCaseText = styled.div`
  text-transform: uppercase;
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
  
  &.full-screen-sidebar {
    top: 0 !important;
    padding-bottom: 0px;
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
    
    .phone-number .phone-code,
    .phone-number .phone-num,
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
  text-transform: uppercase;
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;  
  text-transform: uppercase;  
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
  padding: 30px 30px;
  overflow-x: hidden;
  overflow-y: auto;
`