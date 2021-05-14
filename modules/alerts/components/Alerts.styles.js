import { Grid, GridRow, GridColumn, Segment, List } from 'semantic-ui-react'
import styled from 'styled-components'

export const RowDocument = styled(GridRow)`
  padding: 11px 20px 10px 15px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;

  &.row {
    margin: 2px 0 !important;
  }
`

export const GridAttachments = styled(Grid)`
  width: 100%;
  max-width: 580px;

  &.ui.grid {
    margin: 0;
    padding: 0;
  }
`

export const TableSegment = styled(Segment)`
  margin: 0;

  &.ui.segment {
    padding: 10px 15px;
  }
`

export const ListTable = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: space-between;
    margin: 0;
    &:nth-child(n + 2) {
      border-top: 1px solid rgba(34, 36, 38, 0.15);
    }

    > .item {
      flex-grow: 1;
      max-width: 150px;
      padding: 10px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        // ! ! font-weight: bold;
        color: #20273a;
        line-height: 1.2142857;
      }
    }
  }
`
