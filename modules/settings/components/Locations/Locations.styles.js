import styled from 'styled-components'
import { Segment, Form, Sidebar, Dimmer } from 'semantic-ui-react'

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
  background-color: #f8f9fb !important;

  &.ui.visible.bottom.overlay.sidebar {
    height: 89% !important;
  }

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

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  align-self: center;
  padding: 30px !important;
`

export const CustomSegmentContent = styled(Segment)`
  padding-top: 0px !important;
  width: 900px !important;
  padding: 30px !important;
  border-radius: 4px !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
`

export const DivBottomSidebar = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  background-color: #ffffff;
`

export const DimmerSidebarOpend = styled(Dimmer)`
  height: 11% !important; // 89% height has Sidebar
`

export const DivIconChevronDown = styled.div`
  align-self: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
`
