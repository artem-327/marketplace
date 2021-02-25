import styled from 'styled-components'
import { UploadCloud } from 'react-feather'
import { Grid, Icon, Form, Segment, GridRow, GridColumn } from 'semantic-ui-react'

export const FormStyled = styled(Form)`
  flex-grow: 0 !important;
  .ui.dropdown > .default.text {
    margin: 0 !important;
  }
`

export const SegmentHigh = styled(Segment)`
  margin: 0 0 1px 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  border: unset !important;
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
  margin: 15px -30px 1px -30px !important;
  padding: 8px 30px !important;
  font-size: 14px;
  font-weight: 500;
  color: #848893;
  background-color: #f8f9fb;
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