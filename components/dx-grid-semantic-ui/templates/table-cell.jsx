import * as React from "react";
import { Table as TableSUI } from "semantic-ui-react";

export const TableCell = ({
  tableColumn,
  tableRow,
  column,
  row,
  children,
  value,
  ...restProps
}) => (
  <TableSUI.Cell
    textAlign={tableColumn.align}
    singleLine={!tableColumn.wordWrapEnabled}
    {...restProps}
  >
    {children || value}
  </TableSUI.Cell>
);
