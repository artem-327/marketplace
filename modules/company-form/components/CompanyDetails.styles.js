import styled from 'styled-components'
import { Grid, GridRow, Button, Segment, Dimmer } from 'semantic-ui-react'

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    div.row {
      padding: 7.5px 0;

      div.column {
        padding: 0 15px;
      }
    }
  }
`

export const GridRowGreyDescription = styled(GridRow)`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  margin: 7.5px 15px;
  padding: 9px 20px !important;
  line-height: 1.43;
  color: #848893;
`

export const GridRowSectionDescription = styled(GridRow)`
  background-color: #edeef2;
  margin: 22.5px 15px 7.5px 15px;
  padding: 5px 11px !important;
  color: #404040;
`

export const GridRowCustomPadding = styled(GridRow)`
  ${props => (props.value ? 'padding: ' + props.value + ' !important;' : '')}
`

export const SpanGreyHeader = styled.span`
  color: #848893;
`

export const GridRowAddress = styled(GridRow)`
  margin: -14px 0;
`

export const ButtonOrCustom = styled(Button.Group)`
  .ui.button {
    background-color: #f8f9fb !important;
    color: #20273a !important;
    font-weight: bold !important;
  }
  
  .ui.active.button {
    background-color: #20273a !important;
    color: #ffffff !important;
  }
  
  &.ui.buttons {
    width: 320px;
    .button:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      
      :not(.active) {
        border-top: solid 1px #dee2e6; 
        border-left: solid 1px #dee2e6;
        border-bottom: solid 1px #dee2e6;
      }
    }
    
    .button:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      
      :not(.active) {
        border-top: solid 1px #dee2e6; 
        border-right: solid 1px #dee2e6;
        border-bottom: solid 1px #dee2e6;
      }
    }
    
    .or {
      margin: 1px -2px;
    }
  }
`

export const SegmentStyled = styled(Segment)`
  &.ui.segment {
    background: none;
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
    min-width: 420px;
  }
`

export const DimmerStyled = styled(Dimmer)`
  &.ui.inverted.dimmer {
    background: rgba(255, 255, 255, 0.85) !important;
  }
`