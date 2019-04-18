import React from 'react'

import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { rowActionsCellFormatter, dropdownFormatter } from './formatters'

const makeFormatterComponent = component => props => (
  <DataTypeProvider formatterComponent={component} {...props} />
)
export const RowActionsFormatterProvider = makeFormatterComponent(
  rowActionsCellFormatter
)
export const DropdownFormatterProvider = makeFormatterComponent(
  dropdownFormatter
)
