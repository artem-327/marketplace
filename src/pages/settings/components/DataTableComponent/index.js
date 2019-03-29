import React, { Component } from 'react'
import { 
	SearchState, 
	IntegratedFiltering,
	SortingState,
	IntegratedSorting
} from '@devexpress/dx-react-grid'
import {
	Grid,
	Table,
	TableHeaderRow,
	DragDropProvider,
	TableColumnReordering
} from '@devexpress/dx-react-grid-bootstrap4'

export default class DataTable extends Component {
  render() {
    const { columns } = this.props

    const GridRoot = props => <Grid.Root {...props} className="bootstrapiso" />
    const HeaderCells = props => <TableHeaderRow.Cell {...props} className={'columns-title-cell'} />
    const TableCells = props => <Table.Cell {...props} className={'columns-rows-cell'} />

    return (
      <div className="bootstrapiso">
        <Grid
          rootComponent={GridRoot}
          rows={rows}
          columns={columns}
        >
          <DragDropProvider />
          <SearchState value={filterValue} />
          <IntegratedFiltering />
          <SortingState defaultSorting={[{ columnName: 'userName' }]} />
          <IntegratedSorting />

          <Table cellComponent={TableCells} />
          <TableHeaderRow showSortingControls cellComponent={HeaderCells} />
          <EditDeleteFormatterProvider
            for={editDeleteColumns}
            rows={rows}
          />
          <PermissionFormatterProvider
            for={permissionsColumns}
            rows={rows}
          />
          <TableColumnReordering defaultOrder={columns.map(c => c.name)} />
        </Grid>
      </div>
    )
  }
}
