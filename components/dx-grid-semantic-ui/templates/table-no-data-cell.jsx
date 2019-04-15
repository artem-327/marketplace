import * as React from "react"
import { Table as TableSUI } from "semantic-ui-react"

export const TableNoDataCell = ({ getMessage, ...restProps }) => (
  <TableSUI.Cell {...restProps}>
    No records found
    {/* {getMessage("noData")} */}
  </TableSUI.Cell>
)
