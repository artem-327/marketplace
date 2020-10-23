import * as React from 'react'
import { Table as TableSUI } from 'semantic-ui-react'

export const TableNoDataCell = ({ ...restProps }) => <TableSUI.Cell {...restProps}>No records found</TableSUI.Cell>
