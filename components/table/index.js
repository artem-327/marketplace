import React, { Component } from 'react'
import pt from 'prop-types'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import styled, { createGlobalStyle } from 'styled-components'
import { Segment, Icon, Dropdown, Modal, Divider } from 'semantic-ui-react'
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
  .bootstrapiso > .flex-column {
    flex: 0 0 auto !important;
  }
  .group-row {
    position: relative;
    background: #EEE;
  }
`

const SettingButton = styled(Icon)`
  position: absolute !important;
  cursor: pointer !important;
  top: 8px;
  right: 28px;
  z-index: 601;
  &:before {
    padding: 10px 16px 10px 10px;
    background-color: white !important;
  }
`
const ColumnsSetting = ({ onClick }) => (
  <SettingButton onClick={onClick} data-test='table_setting_btn' name="setting" />
)
const ColumnsSettingModal = ({ columns, hiddenColumnNames, onChange, onClose, open }) => (
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
        onReset={onClose}
      >
        {columns.map(c => <Checkbox key={c.name} disabled={c.disabled} name={c.name} label={c.title}
                                    inputProps={{ 'data-test': `table_setting_${c.name}_chckb` }} />)}
        <Divider />
        <div style={{ textAlign: 'right' }}>
          <Button.Reset data-test='table_setting_cancel_btn'>Cancel</Button.Reset>
          <Button.Submit data-test='table_setting_save_btn'>Save</Button.Submit>
        </div>
      </Form>
    </Modal.Content>
  </Modal>
)

// const TableGroupRow = props => <TableGroupRow {...props} />
const TableCells = props => <Table.Cell {...props} className={props.column.name === '__actions' ? 'actions' : ''} />
const GridRoot = props => <Grid.Root {...props} style={{ height: '100%', flex: 1 }} />

const SortLabel = ({ onSort, children, direction }) => (
  <span
    onClick={onSort}
    data-test='table_sort_action'
  >
    {children}
    {(direction && <Icon className="thick" name={direction === 'asc' ? 'sort up' : 'sort down'} />)}
  </span>
)

const Row = ({ tableRow, selected, onToggle, onClick, ...restProps }) => {
  const rowAction = (e, row) => {
    onClick && onClick(e, tableRow.row)
  }
  return (
    <Table.Row
      {...restProps}
      onClick={rowAction}
      data-test='table_row_action'
    />
  )
}

const MESSAGES = {
  noData: 'No records found.'
}

export default class _Table extends Component {

  static propTypes = {
    columns: pt.arrayOf(
      pt.shape({
        name: pt.string.isRequired,
        title: pt.string,
        width: pt.number,
        sortPath: pt.string
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
    sameGroupSelectionOnly: pt.bool,
    renderGroupLabel: pt.func,
    getChildGroups: pt.func,
    tableName: pt.string,
    onScrollToEnd: pt.func,
    onRowClick: pt.func,
    onSortingChange: pt.func,
    onTableReady: pt.func
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
    onScrollToEnd: () => { },
    onTableReady: () => { }
  }

  constructor(props) {
    super(props)

    this.handleScroll = _.debounce(this.handleScroll, 100)

    this.state = {
      expandedGroups: [],
      selection: [],
      columnsSettings: {
        hiddenColumnNames: this.getColumns().filter(c => c.disabled).map(c => c.name),
        widths: this.getColumnsExtension(),
        order: this.getColumns().map(c => c.name),
        sorting: []
      },
    }
  }

  componentDidMount() {
    this.loadColumnsSettings()

    let table = this.gridWrapper.querySelector('.table-responsive')
    table.addEventListener('scroll', this.handleScroll)

    // if (!this.state.columnsSettings.sorting) this.handleSortingChange(this.state.columnsSettings.sorting || [{
    //   columnName: this.props.columns[0].name,
    //   direction: 'asc'
    // }])
  }

  handleScroll = ({ target }) => {
    const { onScrollToEnd } = this.props

    if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 50) {
      onScrollToEnd()
    }
  }

  componentDidUpdate(prevProps) {
    // expand groups after data was loaded when grouping is set
    if (prevProps.rows !== this.props.rows) this.props.groupBy.length && this.expandGroups()
    // prevProps.loading != this.props.loading && prevProps.loading && this.props.groupBy.length > 0 && this.expandGroups()
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

  handleSelectionChange = (selection) => {
    const { onSelectionChange, getChildGroups, rows, sameGroupSelectionOnly } = this.props
    const groups = getChildGroups(rows)
    const selectionGroups = selection.map(s => groups.find(g => g.childRows.indexOf(rows[s]) > -1))

    const sameGroup = selectionGroups.every(sg => sg === selectionGroups[0])

    if (sameGroup || !sameGroupSelectionOnly) {
      this.setState({ selection })
      onSelectionChange(selection)

      return true
    }
    return false
  }

  handleGroupSelectionChange = (groupKey, value) => {
    const { getChildGroups, rows } = this.props
    const { selection } = this.state
    const group = getChildGroups(rows).find(g => g.key === groupKey)
    const groupRowsIds = group.childRows.map(r => rows.indexOf(r))

    const newSelection = value
      ? _.uniq([...selection, ...groupRowsIds])
      : selection.filter(s => groupRowsIds.indexOf(s) === -1)

    const result = this.handleSelectionChange(newSelection)
    return result
  }

  getGroupRowCheckboxState = (groupKey) => {
    const { getChildGroups, rows } = this.props
    const { selection } = this.state
    const group = getChildGroups(rows).find(g => g.key === groupKey)
    const groupRowsIds = group.childRows.map(r => rows.indexOf(r))

    const checked = groupRowsIds.every(gr => selection.indexOf(gr) > -1)
    const indeterminate = !checked && _.intersection(groupRowsIds, selection).length > 0

    return {
      checked,
      indeterminate,
    }
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
      width: c.width || (1280 / columns.length),
      align: c.align ? c.align : 'left'
    }))
  }

  loadColumnsSettings = () => {
    const { tableName, columns, rowActions } = this.props

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
      if (invalidItems === true || invalidItems.length) {
        localStorage.removeItem(tableName)
      }
      else {
        this.setState({
          columnsSettings: savedSettings
        }, this.handleTableReady)
        return
      }
    }

    this.handleTableReady()
  }

  handleTableReady = () => {
    const { onTableReady, columns } = this.props
    const { columnsSettings: { sorting: [s] } } = this.state
    const column = s ? columns.find(c => c.name === s.columnName) : {}
    
    console.log('handle ready', this.props.tableName)

    onTableReady({
      sortPath: column.sortPath,
      sortDirection: s && s.direction.toUpperCase()
    })
  }

  handleSortingChange = (sorting) => {
    const [s] = sorting
    const { onSortingChange, columns } = this.props
    const column = columns.find(c => c.name === s.columnName)

    this.handleColumnsSettings({ sorting })

    onSortingChange && onSortingChange({
      sortPath: column ? column.sortPath : s.columnName,
      sortDirection: s.direction.toUpperCase()
    })
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
      onRowClick,
      rowSelection,
      selectByRowClick,
      showSelectAll,
      sameGroupSelectionOnly,
      rowActions,
      showHeader,
      onSelectionChange,
      loading,
      virtual,
      sorting,
      onSortingChange,
      integratedSorting,
      groupBy,
      renderGroupLabel,
      getChildGroups,
      tableName,
      showColumnsWhenGrouped = false,
      ...restProps
    } = this.props

    const { columnSettingOpen, expandedGroups, columnsSettings, loaded } = this.state
    const grouping = groupBy.map(g => ({ columnName: g }))
    const columnsFiltered = columns.filter(c => !c.disabled && (showColumnsWhenGrouped || !groupBy.includes(c.name)))

    const hiddenColumns = [
      ...this.getColumns().filter(c => c.disabled).map(c => c.name),
      ...(columnsSettings.hiddenColumnNames || [])
    ]

    return (
      <Segment basic loading={loading} {...restProps} className="flex stretched" style={{ padding: 0 }}>
        <GlobalTableOverrideStyle />
        <div className="bootstrapiso flex stretched"
          style={{ flex: '1 300px', opacity: loading ? 0 : 1, transition: 'opacity 0.2s' }}
          ref={c => c && (this.gridWrapper = c)}
        >
          <ColumnsSetting
            onClick={() => this.setState({ columnSettingOpen: !columnSettingOpen })}
            data-test='table_columns_setting_action'/>
          <ColumnsSettingModal
            columns={columnsFiltered}
            open={columnSettingOpen}
            hiddenColumnNames={columnsSettings.hiddenColumnNames || []}
            onClose={() => this.setState({ columnSettingOpen: false })}
            onChange={(hiddenColumnNames) => {
              this.handleColumnsSettings({ hiddenColumnNames })
              this.setState({ columnSettingOpen: false })
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
                onSortingChange={sorting => this.handleSortingChange(sorting)}
              />
            }

            {!onSortingChange && <IntegratedSorting />}

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

            {rowSelection && <SelectionState selection={this.state.selection} onSelectionChange={this.handleSelectionChange} />}
            {rowSelection && <IntegratedSelection />}

            <SearchState value={filterValue} />
            <IntegratedFiltering />

            {virtual
              ? <VirtualTable
                columnExtensions={this.getColumnsExtension()}
                height="auto"
                cellComponent={TableCells}
                messages={MESSAGES}
                rowComponent={props => <Row onClick={onRowClick} {...props} />}
              />
              : <Table columnExtensions={this.getColumnsExtension()} messages={MESSAGES} />}

            <TableColumnResizing
              onColumnWidthsChange={widths => this.handleColumnsSettings({ widths })}
              columnWidths={columnsSettings.widths}
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

            <TableColumnVisibility
              hiddenColumnNames={hiddenColumns}
            />

            {columnReordering && (
              <TableColumnReordering
                onOrderChange={order => this.handleColumnsSettings({ order })}
                order={columnsSettings.order}
              // defaultOrder={columns.map(c => c.name)}
              />
            )}

            {rowSelection && (
              <TableSelection
                showSelectAll={showSelectAll && !sameGroupSelectionOnly}
                selectByRowClick={selectByRowClick}
              />
            )}
            <DropdownFormatterProvider
              for={columns.filter(c => c.options).map(c => c.name)}
            />
            {groupBy && <TableGroupRow
              showColumnsWhenGrouped={showColumnsWhenGrouped}
              indentColumnWidth={1}
              iconComponent={({ expanded }) => <Icon style={{ float: 'right' }} size='large' color='blue' name={expanded ? 'chevron down' : 'chevron right'} />}
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
                <GroupCell
                  {...this.getGroupRowCheckboxState(props.row.key)}
                  rowSelection={rowSelection}
                  onSelectionChange={this.handleGroupSelectionChange}
                  {...props}
                />
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
