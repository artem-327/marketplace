import React, { Component } from 'react'
import pt from 'prop-types'

import { SearchState, IntegratedFiltering, IntegratedSelection, SelectionState } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  DragDropProvider,
  TableColumnReordering
} from '@devexpress/dx-react-grid-bootstrap4'
import {
  TableSelection
} from '~/components/dx-grid-semantic-ui/plugins'

import { RowActionsFormatterProvider, DropdownFormatterProvider } from './providers'

const GridRoot = props => <Grid.Root {...props} />
const HeaderCells = props => <TableHeaderRow.Cell {...props} />
const TableCells = props => <Table.Cell {...props} />

export default class _Table extends Component {
  static propTypes = {
    columns: pt.arrayOf(pt.shape({
      name: pt.string.isRequired,
      title: pt.string,
      width: pt.number
    })),
    rows: pt.arrayOf(pt.any),
    columnReordering: pt.bool,
    rowSelection: pt.bool,
    showSelectAll: pt.bool,
    selectByRowClick: pt.bool,
    showHeader: pt.bool,
    onSelectionChange: pt.func
  }

  static defaultProps = {
    columnReordering: true,
    rowSelection: false,
    selectByRowClick: true,
    showSelectAll: true,
    showHeader: true,
    onSelectionChange: () => {}
  }

  getColumns = () => {
    const { rowActions, columns } = this.props

    return rowActions ? [
      { name: '__actions', title: ' ', width: 45, actions: rowActions },
      ...columns
    ] : columns
  }

  render() {
    const {
      rows,
      columns,
      filterValue,
      columnReordering,
      rowSelection,
      selectByRowClick,
      showSelectAll,
      rowActions,
      showHeader,
      onSelectionChange,
      dropdownColumns
    } = this.props

    return (
      <div className="bootstrapiso">
        <Grid
          rows={rows}
          columns={this.getColumns()}
          rootComponent={GridRoot}
        >
          {columnReordering && <DragDropProvider />}
          {rowSelection && <SelectionState onSelectionChange={onSelectionChange} />}
          {rowSelection && <IntegratedSelection />}

          <SearchState value={filterValue} />
          <IntegratedFiltering />

          <Table cellComponent={TableCells} />

          {showHeader && <TableHeaderRow cellComponent={HeaderCells} />}

          <RowActionsFormatterProvider for={['__actions']} actions={rowActions} />

          {columnReordering && <TableColumnReordering defaultOrder={columns.map(c => c.name)} />}
          {rowSelection &&
            <TableSelection
              showSelectAll={showSelectAll}
              selectByRowClick={selectByRowClick}
            />
          }
          <DropdownFormatterProvider for={columns.filter(c => c.options).map(c => c.name)} />
        </Grid>
      </div>
    )
  }
}

