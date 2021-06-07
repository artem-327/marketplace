import styled from 'styled-components'
import { Segment, Form, Sidebar, Dimmer, Image } from 'semantic-ui-react'

export const SidebarFlex = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  top: 80px !important;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
  background-color: #f8f9fb !important;

  &.ui.visible.bottom.overlay.sidebar {
    height: 87vh !important;
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

export const DivFlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  align-self: center;
  padding: 30px !important;
`

export const SegmentCustomContent = styled(Segment)`
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
  height: 13vh !important; // 87vh height has Sidebar
`

export const DivIconChevronDown = styled.div`
  align-self: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
`

export const DivHeader = styled.div`
  background-color: #edeef2;
  padding: 6px;
  color: #404040;
  font-size: 14px;
  margin-top: 25px;
  
  &.disabled {
    color: rgba(64, 64, 64, 0.5);
  }
`

export const DivHeaderRight = styled.span`
  opacity: 1;
  float: right;
  color: #404040;
`

export const SegmentCustom = styled(Segment)`
  background-color: #ffffff !important;
  border: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  padding: 0px !important;
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

    .phone-number {
      .phone-code,
      .phone-num {
        height: 40px;
      }
    }
  }
`

export const FormCustom = styled(Form)`
  flex-grow: 0 !important;
`

export const SegmentCertifications = styled(SegmentCustom)`
  .ui.dropdown {
    width: 80px !important;
    min-width: 80px !important;
  }
  
  p {
    font-style: italic;
    color: #848893;
  }
`

export const HorizontalRule = styled.hr`
  height: 1px;
  margin: 19px 0 20px;
  border: 0 none;
  background: #dee2e6;
`

export const DivBrowseFile = styled.div`
  display: flex;
  align-items: space-between;
  place-content: center space-between;
  width: 50%;
  height: 50px;
  margin: 0 0 20px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 12px 15px 12px 20px;
  background: transparent;
  color: #20273a;
  line-height: 24px;
`

export const DivIcon = styled.div`
  margin-left: 8px;
`

export const ImageResized = styled(Image)`
  width: 24px;
  max-width: 24px;
  height: 24px;
  max-height: 24px;
  object-fit: contain;
`
