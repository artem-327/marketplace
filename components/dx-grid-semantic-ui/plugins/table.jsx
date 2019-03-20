import * as React from "react";
import { withComponents } from "@devexpress/dx-react-core";
import { Table as TableBase } from "@devexpress/dx-react-grid";
import { Table as TableSUI } from "semantic-ui-react";
import { Table as TableComponent } from "../templates/table";
import { TableCell as Cell } from "../templates/table-cell";
import { TableNoDataCell as NoDataCell } from "../templates/table-no-data-cell";
import { TableLayout as Layout } from "../templates/table-layout";
import { TableRow as Row } from "../templates/table-row";

const Container = props => <div {...props} />;
const TableHead = props => <TableSUI.Header {...props} />;
const TableBody = props => <TableSUI.Body {...props} />;
const TableFooter = props => <TableSUI.Footer {...props} />;

export const Table = withComponents({
  Table: TableComponent,
  TableHead,
  TableBody,
  TableFooter,
  Container,
  Layout,
  Row,
  Cell,
  NoDataRow: Row,
  NoDataCell,
  StubRow: Row,
  StubCell: Cell,
  StubHeaderCell: Cell
})(TableBase);
