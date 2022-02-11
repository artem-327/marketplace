import styled from 'styled-components'
import { UploadCloud, Info } from 'react-feather'
import { Grid, Icon, Segment, GridRow, GridColumn, Dimmer, Sidebar } from 'semantic-ui-react'

export const DimmerSidebarOpened = styled(Dimmer)`
  height: 13vh !important; // 87vh height has Sidebar
`

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
  padding: 7.5px 0 !important;
  border-radius: 4px !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
`

export const SegmentHigh = styled(Segment)`
  &.ui.segment {
    margin: 0 0 1px 0 !important;
    padding: 16px 30px !important;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    color: #20273a;
    border: none !important;
    display: flex;
    flex-direction: row;
    box-shadow: none;
  
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
  }
`

export const DivBottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 5px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  .ui.button {
    margin: 0 5px;
  }
`

export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

export const IconClose = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

export const UploadCloudIcon = styled(UploadCloud)`
  width: 48px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 15px 20px;
  }

  > .row {
    padding: 7.5px 0 !important;
    .column {
      padding: 0 10px !important;
    }
  }

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
  }
`

export const DivTitleSegment = styled.div`
  margin: 15px 0 1px 0 !important;
  padding: 5px 10px !important;
  font-size: 14px;
  font-weight: 500;
  color: #848893;
  background-color: #edeef2;
`

export const GridRowLabel = styled(GridRow)`
  margin: 5px 10px -10px 10px;
`

export const GridColumnFlex = styled(GridColumn)`
  display: flex !important;
`

export const DivCheckboxWrapper = styled.div`
  margin-right: 40px;
`

export const InfoCustom = styled(Info)`
  margin-left: 6px;
  color: #808085 !important;
`
