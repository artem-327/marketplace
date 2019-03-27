import * as React from "react";
import { withComponents } from "@devexpress/dx-react-core";
import { TableHeaderRow as TableHeaderRowBase } from "@devexpress/dx-react-grid";
import { TableHeaderCell as Cell } from "../templates/table-header-row/table-header-cell";
import { TableRow as Row } from "../templates/table-row";
import { SortLabel } from "../templates/table-header-row/sort-label";

const Content = props => <div {...props} />;
const Title = props => <span {...props} />;
const GroupButton = props => <span {...props} />;

export const TableHeaderRow = withComponents({
  Cell,
  Row,
  Content,
  SortLabel,
  Title,
  GroupButton
})(TableHeaderRowBase);
