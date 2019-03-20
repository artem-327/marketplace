import * as React from "react";
import { Table as TableSUI } from "semantic-ui-react";

export const TableHeaderCell = ({
  column,
  tableColumn,
  showGroupingControls,
  onGroup,
  groupingEnabled,
  draggingEnabled,
  onWidthDraftCancel,
  resizingEnabled,
  onWidthChange,
  onWidthDraft,
  tableRow,
  getMessage,
  showSortingControls,
  sortingDirection,
  sortingEnabled,
  onSort,
  before,
  ...restProps
}) => (
  <TableSUI.HeaderCell
    textAlign={tableColumn.align}
    singleLine={!tableColumn.wordWrapEnabled}
    {...restProps}
  />
);
