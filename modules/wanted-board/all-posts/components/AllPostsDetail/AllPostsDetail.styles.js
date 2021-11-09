import { Grid, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

export const DivDetailWrapper = styled.div`
  padding: 7px 0 0;
`

export const DivHeader = styled.div`
  background-color: #edeef2;
  color: #404040;
  padding: 5px 9px;
  text-align: left;
  margin: 0 10px;
`

export const SegmentGroup = styled(Segment.Group)`
  margin: 10px -10px !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: none !important;
`

export const StyledGrid = styled(Grid)`
  &.ui.grid {
    margin: 0;

    .row {
      margin: 0;
      padding: 5px 0;
    }

    .column {
      margin: 0;
      padding: 0 5px;
    }
  }
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > .row {
      padding: 16px 0;
      margin: 0;

      > .column {
        padding: 0 5px;
      }
    }
  }
`

export const DivButtonsSection = styled.div`
  color: #20273a;
  font-size: 14px;
  padding-top: 8px;
  margin: 20px -10px -3px;
  border-top: solid 1px #dee2e6;
`

export const DivButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5px;
`

export const GridRowTabField = styled(Grid.Row)`
  border-bottom: solid 1px #dee2e6 !important;
  padding: 8px 0px !important;
  
  > .column {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export const GridColumnTabFieldValue = styled(Grid.Column)`
  color: #20273a !important;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const SegmentDetailRow = styled(Segment)`
  padding: 0px 20px !important;
  min-width: 50% !important;
`
