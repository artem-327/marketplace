import * as React from "react"
import { Table as TableSUI } from "semantic-ui-react"

export const TableCell = ({
  tableColumn,
  tableRow,
  column,
  row,
  children,
  value,
  style,
  ...restProps
}) => (
  <TableSUI.Cell
    textAlign={tableColumn.align}
    singleLine={!tableColumn.wordWrapEnabled}
    style={{
      ...style,
      width: column.width || 'auto',
      overflow: column.dropdown ? 'unset':'hidden'
    }}
    {...restProps}
  >
    {children || value}
  </TableSUI.Cell>
)
