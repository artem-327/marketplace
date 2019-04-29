import React, { Component } from 'react'
import pt from 'prop-types'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import {createGlobalStyle} from 'styled-components'
import { Segment, Icon } from 'semantic-ui-react'
import {
  SearchState,
  IntegratedFiltering,
  IntegratedSelection,
  SelectionState,
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  DragDropProvider,
  TableColumnReordering,
  VirtualTable
} from '@devexpress/dx-react-grid-bootstrap4'
import { TableSelection } from '~/components/dx-grid-semantic-ui/plugins'

import {
  RowActionsFormatterProvider,
  DropdownFormatterProvider
} from './providers'

const GlobalTableOverrideStyle = createGlobalStyle`
  .dx-g-bs4-table {
    margin-bottom: 0 !important;
  }
`

// const TableGroupRow = props => <TableGroupRow {...props} />
const TableCells = props => <Table.Cell {...props} className={props.column.name === '__actions' ? 'actions':''} />
const GridRoot = props => <Grid.Root {...props} style={{ height: '100%' }} />

const SortLabel = ({ onSort, children, direction }) => (
  <span
    onClick={onSort}
  >
    {children}
    {(direction && <Icon className="thick" name={direction === 'asc' ? 'sort up' : 'sort down'} />)}
  </span>
)

export default class _Table extends Component {
  static propTypes = {
    columns: pt.arrayOf(
      pt.shape({
        name: pt.string.isRequired,
        title: pt.string,
        width: pt.number
      })
    ),
    rows: pt.arrayOf(pt.any),
    columnReordering: pt.bool,
    rowSelection: pt.bool,
    showSelectAll: pt.bool,
    selectByRowClick: pt.bool,
    showHeader: pt.bool,
    loading: pt.bool,
    virtual: pt.bool,
    sorting: pt.bool,
    groupBy: pt.array,
    onSelectionChange: pt.func
  }

  static defaultProps = {
    columnReordering: true,
    rowSelection: false,
    selectByRowClick: true,
    showSelectAll: true,
    showHeader: true,
    loading: false,
    virtual: true,
    sorting: true,
    onSelectionChange: () => {}
  }

  getColumns = () => {
    const { rowActions, columns } = this.props

    return rowActions
      ? [
          { name: '__actions', title: ' ', width: 45, actions: rowActions },
          ...columns
        ]
      : columns
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
      loading,
      virtual,
      sorting,
      groupBy,
      ...restProps
    } = this.props
    return (
      <Segment basic loading={loading} {...restProps} className="flex stretched">
        <GlobalTableOverrideStyle />
        <div className="bootstrapiso flex stretched" style={{flex: '1 300px'}}>
          <Grid
            rows={rows}
            columns={this.getColumns()}
            rootComponent={GridRoot}
          >
            {sorting && <SortingState defaultSorting={[]} />}
            {sorting && <IntegratedSorting />}

            {groupBy && <GroupingState grouping={groupBy.map(g => ({columnName: g}))} />}
            {groupBy && <IntegratedGrouping />}

            {columnReordering && <DragDropProvider />}

            {rowSelection && <SelectionState onSelectionChange={onSelectionChange} />}
            {rowSelection && <IntegratedSelection />}

            <SearchState value={filterValue} />
            <IntegratedFiltering />

            {virtual ? <VirtualTable height="auto" cellComponent={TableCells} /> : <Table />}            

            {showHeader && 
              <TableHeaderRow 
                showSortingControls 
                sortLabelComponent={SortLabel}
              />}
            <RowActionsFormatterProvider
              for={['__actions']}
              actions={rowActions}
            />

            {columnReordering && (
              <TableColumnReordering defaultOrder={columns.map(c => c.name)} />
            )}
            {rowSelection && (
              <TableSelection
                showSelectAll={showSelectAll}
                selectByRowClick={selectByRowClick}
              />
            )}
            <DropdownFormatterProvider
              for={columns.filter(c => c.options).map(c => c.name)}
            />
            {groupBy && <TableGroupRow 
              iconComponent={({expanded}) => <Icon name={expanded ? 'chevron down':'chevron right'} />} 
            />}
            
          </Grid>
        </div>
      </Segment>
    )
  }
}
