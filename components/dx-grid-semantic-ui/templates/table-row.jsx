import * as React from "react";
import { Table as TableSUI } from "semantic-ui-react";

export const TableRow = ({ tableRow, ...restProps }) => (
  <TableSUI.Row {...restProps} />
);
