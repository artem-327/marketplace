import * as React from "react";
import { Table as TableSUI } from "semantic-ui-react";

export const TableNoDataCell = ({ getMessage, ...restProps }) => (
  <TableSUI.Cell {...restProps}>{getMessage("noData")}</TableSUI.Cell>
);
