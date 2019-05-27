import React, { Component } from 'react'
import pt from 'prop-types'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import styled, { createGlobalStyle } from 'styled-components'
import { Segment, Icon, Dropdown, Modal } from 'semantic-ui-react'
import { Form, Checkbox, Button } from 'formik-semantic-ui'
import _ from 'lodash'
import GroupCell from './GroupCell'

import {
  SearchState,
  IntegratedFiltering,
  IntegratedSelection,
  SelectionState,
  SortingState,
  IntegratedSorting,
  GroupingState,
  CustomGrouping,
  IntegratedGrouping,
  TableColumnVisibility,
  VirtualTableState
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  DragDropProvider,
  TableColumnReordering,
  VirtualTable,
  TableColumnResizing
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
  .bootstrapiso .table {
    td,th {
      padding: .5rem;
    }
  }
  .group-row {
    position: relative;
    background: #EEE;
  }
`

const SettingButton = styled(Icon)`
  position: absolute !important;
  cursor: pointer !important;
  top: 13px;
  right: 16px;
  z-index: 601;
`
const ColumnsSetting = ({ onClick }) => (
  <SettingButton onClick={onClick} name="setting" />
)
const ColumnsSettingModal = ({ columns, hiddenColumnNames, onChange, open }) => (
  <Modal open={open} centered={false} size="tiny" style={{ width: 300 }}>
    <Modal.Content>
      <Form
        initialValues={columns.reduce((acc, c) => { acc[c.name] = hiddenColumnNames.indexOf(c.name) === -1; return acc }, {})}
        onSubmit={(values, actions) => {
          onChange(columns.reduce((acc, c) => {
            !values[c.name] && acc.push(c.name)
            return acc
          }, []))
          actions.setSubmitting(false)
        }}
      >
        {columns.map(c => <Checkbox key={c.name} name={c.name} label={c.title} />)}
        <Button.Submit fluid>Save</Button.Submit>
      </Form>
    </Modal.Content>
  </Modal>
)

// const TableGroupRow = props => <TableGroupRow {...props} />
const TableCells = props => <Table.Cell {...props} className={props.column.name === '__actions' ? 'actions' : ''} />
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
    onSelectionChange: pt.func,
    renderGroupLabel: pt.func,
    getChildGroups: pt.func,
    tableName: pt.string,
    getNextPage: pt.func
  }

  static defaultProps = {
    columnReordering: true,
    rowSelection: false,
    selectByRowClick: false,
    showSelectAll: true,
    showHeader: true,
    loading: false,
    virtual: true,
    sorting: true,
    groupBy: [],
    onSelectionChange: () => { },
    getNextPage: () => { }
  }

  constructor(props) {
    super(props)

    this.handleScroll = _.debounce(this.handleScroll, 100)

    this.state = {
      hiddenColumnNames: [],
      expandedGroups: [],
      columnsSettings: {
        widths: this.getColumnsExtension(),
        order: this.getColumns().map(c => c.name)
      },
      lastPageNumber: 0,
      allLoaded: false
    }
  }

  handleScroll = ({ target }) => {
    const { getNextPage } = this.props
    const { allLoaded, lastPageNumber } = this.state

    if (target.offsetHeight + target.scrollTop === target.scrollHeight) {
      if (!allLoaded) {
        this.setState({ lastPageNumber: lastPageNumber + 1 })
        getNextPage(lastPageNumber + 1)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rows.length < this.props.pageSize * this.state.lastPageNumber) {
      this.setState({ allLoaded: true })
    }
  }

  componentDidMount() {
    this.loadColumnsSettings()

    let table = this.gridWrapper.querySelector('.table-responsive')
    table.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps) {
    // expand groups after data was loaded when grouping is set
    prevProps.loading != this.props.loading && prevProps.loading && this.props.groupBy.length > 0 && this.expandGroups()
  }

  expandGroups = () => {
    const { groupBy, getChildGroups, rows } = this.props

    if (groupBy.length > 0) this.setState({
      expandedGroups: getChildGroups
        ? getChildGroups(rows).map(r => r.key)
        : Object.keys(_.groupBy(rows, groupBy.join('|')))
    })
  }

  handleExpandedGroupsChange = expandedGroups => {
    this.setState({ expandedGroups })
  }


  getColumns = () => {
    const { rowActions, columns } = this.props

    return rowActions
      ? [
        { name: '__actions', title: ' ', width: 45, actions: rowActions },
        ...columns,
      ]
      : columns
  }

  getColumnsExtension = () => {
    const columns = this.getColumns()
    return columns.map(c => ({
      columnName: c.name,
      width: c.width || (1280 / columns.length)
    }))
  }

  loadColumnsSettings = () => {
    const {tableName, columns, rowActions} = this.props

    // get column names from current table settings
    let colNames = columns.map(column => {
      return column.name
    })
    if (rowActions)
      colNames.push('__actions')

    if (tableName && localStorage[tableName]) {
      // if saved table settings exists then compare it with current settings
      let savedSettings = JSON.parse(localStorage[tableName])
      let invalidItems = (savedSettings.order.length === colNames.length) ? savedSettings.order.filter(col => {
        if (colNames.indexOf(col) > -1) {
          return false
        } else {
          return true
        }
      }) : true

      // if number of columns is different or any column uses different name then remove saved settings
      if (invalidItems === true || invalidItems.length)
        localStorage.removeItem(tableName)
      else
        this.setState({
          columnsSettings: JSON.parse(localStorage[tableName])
        })

    }
  }
  handleColumnsSettings = (data) => {
    const { tableName } = this.props

    this.setState(state => ({
      columnsSettings: {
        ...state.columnsSettings,
        ...data
      }
    }), () => {
      tableName && (localStorage[tableName] = JSON.stringify(this.state.columnsSettings))
    })
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
      renderGroupLabel,
      getChildGroups,
      tableName,
      ...restProps
    } = this.props

    const { hiddenColumnNames, columnSettingOpen, expandedGroups, columnsSettings } = this.state
    const grouping = groupBy.map(g => ({ columnName: g }))

    return (
      <Segment basic loading={loading} {...restProps} className="flex stretched" style={{ padding: 0 }}>
        <GlobalTableOverrideStyle />
        <div className="bootstrapiso flex stretched" style={{ flex: '1 300px' }} ref={c => c && (this.gridWrapper = c)}>
          <ColumnsSetting
            onClick={() => this.setState({ columnSettingOpen: !columnSettingOpen })} />
          <ColumnsSettingModal
            columns={columns}
            open={columnSettingOpen}
            hiddenColumnNames={columnsSettings.hiddenColumnNames || []}
            onChange={(hiddenColumnNames) => {
              this.handleColumnsSettings({ hiddenColumnNames })
              this.setState({ hiddenColumnNames, columnSettingOpen: false })
            }}
          />
          <Grid
            rows={rows}
            columns={this.getColumns()}
            rootComponent={GridRoot}
          >
            {sorting &&
              <SortingState
                sorting={columnsSettings.sorting}
                onSortingChange={sorting => this.handleColumnsSettings({ sorting })}
              />
            }
            {sorting && <IntegratedSorting />}

            {groupBy &&
              <GroupingState
                grouping={grouping}
                expandedGroups={expandedGroups}
                onExpandedGroupsChange={this.handleExpandedGroupsChange}
              />
            }
            {groupBy &&
              getChildGroups
              ? <CustomGrouping
                getChildGroups={getChildGroups}
              />
              : <IntegratedGrouping />
            }

            {columnReordering && <DragDropProvider />}

            {rowSelection && <SelectionState onSelectionChange={onSelectionChange} />}
            {rowSelection && <IntegratedSelection />}

            <SearchState value={filterValue} />
            <IntegratedFiltering />

            {virtual
              ? <VirtualTable columnExtensions={this.getColumnsExtension()} height="auto" cellComponent={TableCells} />
              : <Table columnExtensions={this.getColumnsExtension()} />}

            <TableColumnResizing
              onColumnWidthsChange={widths => this.handleColumnsSettings({ widths })}
              columnWidths={columnsSettings.widths}
            // defaultColumnWidths={this.getColumnsExtension()} 
            />

            {showHeader &&
              <TableHeaderRow
                showSortingControls
                sortLabelComponent={SortLabel}
              />}
            <RowActionsFormatterProvider
              for={['__actions']}
              actions={rowActions}
            />

            <TableColumnVisibility hiddenColumnNames={columnsSettings.hiddenColumnNames} />

            {columnReordering && (
              <TableColumnReordering
                onOrderChange={order => this.handleColumnsSettings({ order })}
                order={columnsSettings.order}
              // defaultOrder={columns.map(c => c.name)}
              />
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
              indentColumnWidth={1}
              iconComponent={({ expanded }) => <Icon style={{ float: 'right' }} size='large' color='blue' name={expanded ? 'chevron down' : 'chevron up'} />}
              contentComponent={({ column, row, children, ...restProps }) => (
                renderGroupLabel
                  ? renderGroupLabel({ column, row })
                  : (
                    <span {...restProps}>
                      <strong>{column.title || column.name}:{' '}</strong>
                      {children || String(row.value)}
                    </span>
                  )
              )}
              cellComponent={props => (
                <GroupCell {...props} />
              )}
              rowComponent={({ children, row, tableRow, ...restProps }) => (
                <tr className="group-row" {...restProps}>
                  {children}
                </tr>
              )}
            />}

          </Grid>
        </div>
      </Segment>
    )
  }
}
