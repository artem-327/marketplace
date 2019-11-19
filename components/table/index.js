import React, { Component } from 'react'
import pt from 'prop-types'
import { Getter, Plugin } from '@devexpress/dx-react-core'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import styled, { createGlobalStyle } from 'styled-components'
import { Segment, Icon, Dropdown, Modal, Divider, Grid as GridSemantic } from 'semantic-ui-react'
import { Form, Checkbox, Button } from 'formik-semantic-ui-fixed-validation'
import _ from 'lodash'
import GroupCell from './GroupCell'
import { FormattedMessage, injectIntl } from 'react-intl'
import { rowActionsCellFormatter } from './formatters'
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

import { RowActionsFormatterProvider, DropdownFormatterProvider } from './providers'

const isFirefox = typeof InstallTrigger !== 'undefined'

const GlobalTableOverrideStyle = createGlobalStyle`
  .dx-g-bs4-table {
    margin-bottom: 0 !important;
  }
  .bootstrapiso .table {
    td,th {
      padding: .5rem;
    }
  }
  ${isFirefox &&
    `
    .bootstrapiso > .flex-column {
      flex: 0 0 auto !important;
    }
  `}
  .group-row {
    position: relative;
    background: #EEE;
  }
`

const SettingButton = styled(Icon)`
  position: absolute !important;
  cursor: pointer !important;
  top: 8px;
  left: 2px;
  z-index: 601;
  &:before {
    padding: 10px 16px 10px 10px;
    background-color: white !important;
  }
`
const ColumnsSetting = ({ onClick }) => <SettingButton onClick={onClick} data-test='table_setting_btn' name='setting' />

const getSettingColumn = (columns, formatMessage, columnWidth) => {
  return (
    <GridSemantic.Column width={columnWidth}>
      {columns.map(c => {
        return (
          <Checkbox
            key={c.name}
            disabled={c.disabled}
            name={c.name}
            label={
              typeof c.title === 'string'
                ? c.title
                : formatMessage({
                    id: c.title.props.id,
                    defaultMessage: c.title.props.defaultMessage
                  })
            }
            inputProps={{ 'data-test': `table_setting_${c.name}_chckb` }}
          />
        )
      })}
    </GridSemantic.Column>
  )
}

const ColumnsSettingModal = ({ columns, hiddenColumnNames, onChange, onClose, open, formatMessage }) => {
  const GridColumns = columns.length > 12 ? 2 : 1
  const modalWidth = GridColumns === 1 ? 300 : 500
  const columnWidth = GridColumns === 1 ? 16 : 8

  const column1 = columns.slice()
  const column2 = GridColumns === 1 ? column1 : column1.splice(Math.ceil(column1.length / 2))

  return (
    <Modal open={open} closeIcon onClose={onClose} centered={false} style={{ width: modalWidth }}>
      <Modal.Content>
        <Form
          initialValues={columns.reduce((acc, c) => {
            acc[c.name] = hiddenColumnNames.indexOf(c.name) === -1
            return acc
          }, {})}
          onSubmit={(values, actions) => {
            onChange(
              columns.reduce((acc, c) => {
                !values[c.name] && acc.push(c.name)
                return acc
              }, [])
            )
            actions.setSubmitting(false)
          }}
          onReset={onClose}>
          {({ submitForm: submitSettings }) => {
            return (
              <>
                <div className='scrolling content'>
                  <GridSemantic padded>
                    {getSettingColumn(column1, formatMessage, columnWidth)}
                    {GridColumns === 2 && getSettingColumn(column2, formatMessage, columnWidth)}
                  </GridSemantic>
                </div>
                <Divider />
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='table_setting_cancel_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <Button data-test='table_setting_save_btn' primary onClick={submitSettings} inputProps={{ type: 'button' }}>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </div>
              </>
            )
          }}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

// const TableGroupRow = props => <TableGroupRow {...props} />
const TableCells = props => <Table.Cell {...props} className={props.column.name === '__actions' ? 'actions' : ''} />
const GridRoot = props => <Grid.Root {...props} style={{ height: '100%', flex: 1 }} />

const SortLabel = ({ column, onSort, children, direction }) => (
  <span onClick={onSort} data-test={`table_sort_action_${column.name}`}>
    {children}
    {direction && <Icon className='thick' name={direction.toUpperCase() === 'ASC' ? 'sort up' : 'sort down'} />}
  </span>
)

class PatchedIntegratedSelection extends React.PureComponent {
  render() {
    const { lockSelection, ...restProps } = this.props
    var allRows = []
    const rowSelectionEnabled = row => !lockSelection.includes(row.id)
    return (
      <Plugin>
        <Getter
          name='rows'
          computed={({ rows }) => {
            allRows = rows
            return rows.filter(rowSelectionEnabled)
          }}
        />
        <IntegratedSelection {...restProps} />
        <Getter
          name='rows'
          computed={({ rows }) => {
            return allRows
          }}
        />
      </Plugin>
    )
  }
}

class PatchedTableSelection extends React.PureComponent {
  render() {
    const { lockSelection, ...restProps } = this.props
    const rowSelectionEnabled = row => !lockSelection.includes(row.id)
    return (
      <TableSelection
        cellComponent={props => (rowSelectionEnabled(props.tableRow.row) ? <TableSelection.Cell {...props} /> : <Table.StubCell {...props} />)}
        {...restProps}
      />
    )
  }
}

const Row = ({ tableRow, selected, onToggle, onClick, ...restProps }) => {
  const rowAction = (e, row) => {
    onClick && onClick(e, tableRow.row)
  }
  return <Table.Row {...restProps} onClick={rowAction} data-test='table_row_action' />
}

const MESSAGES = {
  noData: 'No records found.'
}

class _Table extends Component {
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
    defaultSelection: pt.array,
    onSelectionChange: pt.func,
    sameGroupSelectionOnly: pt.bool,
    renderGroupLabel: pt.func,
    getChildGroups: pt.func,
    tableName: pt.string,
    singleSelection: pt.bool,
    onScrollToEnd: pt.func,
    onRowClick: pt.func,
    onSortingChange: pt.func,
    onTableReady: pt.func,
    defaultSorting: pt.shape({
      columnName: pt.string,
      sortPath: pt.string,
      direction: pt.oneOf(['ASC', 'asc', 'DESC', 'desc'])
    })
  }

  static defaultProps = {
    columnReordering: true,
    rowSelection: false,
    selectByRowClick: false,
    showSelectAll: true,
    showHeader: true,
    loading: false,
    defaultSelection: [],
    virtual: true,
    sorting: true,
    groupBy: [],
    defaultHiddenColumns: [],
    singleSelection: false,
    onSelectionChange: () => {},
    onScrollToEnd: () => {},
    onTableReady: () => {},
    defaultSorting: null
  }

  constructor(props) {
    super(props)

    this.handleScroll = _.debounce(this.handleScroll, 100)

    this.state = {
      expandedGroups: [],
      selection: [],
      columnsSettings: {
        hiddenColumnNames: this.getColumns()
          .filter(c => c.disabled)
          .map(c => c.name),
        widths: this.getColumnsExtension(),
        order: this.getColumns().map(c => c.name),
        sorting: []
      }
    }
  }

  componentDidMount() {
    this.loadColumnsSettings()
    let table = this.gridWrapper.querySelector('.table-responsive')
    table.addEventListener('scroll', this.handleScroll)
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

    if (groupBy.length > 0)
      this.setState({
        expandedGroups: getChildGroups ? getChildGroups(rows).map(r => r.key) : Object.keys(_.groupBy(rows, groupBy.join('|')))
      })
  }

  handleExpandedGroupsChange = expandedGroups => {
    this.setState({ expandedGroups })
  }

  handleSelectionChange = selection => {
    const { onSelectionChange, getChildGroups, rows, sameGroupSelectionOnly, singleSelection } = this.props
    const lastSelected = selection.find(selected => this.state.selection.indexOf(selected) === -1)

    const groups = getChildGroups(rows)
    const selectionGroups = selection.map(s => groups.find(g => g.childRows.indexOf(rows[s]) > -1))

    const sameGroup = selectionGroups.every(sg => sg === selectionGroups[0])
    const finalSelection = singleSelection ? [lastSelected] : selection
    if (sameGroup || !sameGroupSelectionOnly) {
      this.setState({ selection: finalSelection })
      onSelectionChange(finalSelection)

      return true
    }
    return false
  }

  handleGroupSelectionChange = (groupKey, value) => {
    const { getChildGroups, rows } = this.props
    const { selection } = this.state
    const group = getChildGroups(rows).find(g => g.key === groupKey)
    const groupRowsIds = group.childRows.map(r => rows.indexOf(r))

    const newSelection = value ? _.uniq([...selection, ...groupRowsIds]) : selection.filter(s => groupRowsIds.indexOf(s) === -1)

    const result = this.handleSelectionChange(newSelection)
    return result
  }

  getGroupRowCheckboxState = groupKey => {
    const { getChildGroups, rows } = this.props
    const { selection } = this.state
    const group = getChildGroups(rows).find(g => g.key === groupKey)
    const groupRowsIds = group.childRows.map(r => rows.indexOf(r))

    const checked = groupRowsIds.every(gr => selection.indexOf(gr) > -1)
    const indeterminate = !checked && _.intersection(groupRowsIds, selection).length > 0

    return {
      checked,
      indeterminate
    }
  }

  getColumns = () => {
    const { rowActions, columns, hideSettingsIcon } = this.props

    return rowActions
      ? [
          {
            name: '__actions',
            title: !hideSettingsIcon ? (
              <ColumnsSetting
                onClick={() =>
                  this.setState(prevState => ({
                    columnSettingOpen: !prevState.columnSettingOpen
                  }))
                }
                data-test='table_columns_setting_action'
              />
            ) : (
              ''
            ),
            width: 45,
            actions: rowActions
          },
          ...columns
        ]
      : columns
  }

  getColumnsExtension = () => {
    const columns = this.getColumns()
    return columns.map(c => ({
      columnName: c.name,
      width: c.width || 1280 / columns.length,
      align: c.align ? c.align : 'left'
    }))
  }

  loadColumnsSettings = () => {
    const { tableName, columns, rowActions, defaultHiddenColumns, defaultSorting } = this.props

    // get column names from current table settings
    let colNames = columns.map(column => {
      return column.name
    })

    if (rowActions) colNames.push('__actions')

    if (tableName && localStorage[tableName]) {
      // if saved table settings exists then compare it with current settings
      let savedSettings = JSON.parse(localStorage[tableName])

      let invalidItems = savedSettings.order.length === colNames.length ? savedSettings.order.filter(col => !(colNames.indexOf(col) > -1)) : true

      if ((!savedSettings.sorting || savedSettings.sorting.length === 0) && defaultSorting) {
        savedSettings.sorting = [defaultSorting]
        this.setState({ columnsSettings: savedSettings }, () => (localStorage[tableName] = JSON.stringify(this.state.columnsSettings)))
      }

      // if number of columns is different or any column uses different name then remove saved settings
      if (invalidItems === true || invalidItems.length) {
        localStorage.removeItem(tableName)
      } else {
        this.setState(
          {
            columnsSettings: savedSettings
          },
          this.handleTableReady
        )
        return
      }
    } else {
      this.setState(
        {
          columnsSettings: {
            ...this.state.columnsSettings,
            sorting: defaultSorting ? [defaultSorting] : this.state.columnsSettings.sorting,
            hiddenColumnNames: defaultHiddenColumns
          }
        },
        () => {
          localStorage[tableName] = JSON.stringify(this.state.columnsSettings)
          this.handleTableReady()
        }
      )
    }
  }

  handleTableReady = () => {
    const { onTableReady, columns, defaultSelection } = this.props
    const {
      columnsSettings: {
        sorting: [s]
      }
    } = this.state
    const column = s ? columns.find(c => c.name === s.columnName) : {}
    this.setState({ selection: defaultSelection })

    onTableReady({
      sortPath: column && column.sortPath,
      sortDirection: s && s.direction.toUpperCase()
    })
  }

  handleSortingChange = sort => {
    if (this.state.columnsSettings.sorting.length === 0) {
      var sorting = sort
    } else var { sorting } = this.state.columnsSettings

    let columnName = sort[0].columnName
    let [s] = sorting
    s.columnName = columnName

    const { onSortingChange, columns } = this.props
    const column = columns.find(c => c.name === s.columnName)

    if (!column || !column.sortPath) return

    s.direction = s.direction.toUpperCase() === 'ASC' ? 'DESC' : 'ASC'

    this.handleColumnsSettings({ sorting })
    
    onSortingChange &&
      onSortingChange({
        sortPath: column ? column.sortPath : s.columnName,
        sortDirection: s.direction
      })
  }

  handleColumnsSettings = data => {
    const { tableName } = this.props

    this.setState(
      state => ({
        columnsSettings: {
          ...state.columnsSettings,
          ...data
        }
      }),
      () => {
        tableName && (localStorage[tableName] = JSON.stringify(this.state.columnsSettings))
      }
    )
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
      lockSelection,
      groupActions,
      hideSettingsIcon,
      ...restProps
    } = this.props

    const {
      intl: { formatMessage },
      defaultHiddenColumns
    } = this.props

    const { columnSettingOpen, expandedGroups, columnsSettings, loaded } = this.state
    const grouping = groupBy.map(g => ({ columnName: g }))
    const columnsFiltered = columns.filter(c => !c.disabled && (showColumnsWhenGrouped || !groupBy.includes(c.name)))

    const hiddenColumns = [
      ...this.getColumns()
        .filter(c => c.disabled)
        .map(c => c.name),
      ...(columnsSettings.hiddenColumnNames || [])
    ]

    return (
      <Segment basic loading={loading} {...restProps} className='flex stretched' style={{ padding: 0 }}>
        <GlobalTableOverrideStyle />
        <div
          className='bootstrapiso flex stretched'
          style={{
            flex: '1 300px',
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.2s'
          }}
          ref={c => c && (this.gridWrapper = c)}>
          <ColumnsSettingModal
            columns={columnsFiltered}
            open={columnSettingOpen}
            formatMessage={formatMessage}
            hiddenColumnNames={this.state.columnsSettings.hiddenColumnNames}
            onClose={() => this.setState({ columnSettingOpen: false })}
            onChange={hiddenColumnNames => {
              this.handleColumnsSettings({ hiddenColumnNames })
              this.setState({ columnSettingOpen: false })
            }}
            data-test='table_columns_setting_modal'
          />
          <Grid rows={rows} columns={this.getColumns()} rootComponent={GridRoot}>
            {sorting && (
              <SortingState
                // sorting={[columnsSettings.sorting.map(el => ({ ...el, direction: el.direction.toLowerCase() }))]}
                sorting={columnsSettings.sorting}
                onSortingChange={sorting => this.handleSortingChange(sorting)}
              />
            )}

            {!onSortingChange && <IntegratedSorting />}

            {groupBy && (
              <GroupingState grouping={grouping} expandedGroups={expandedGroups} onExpandedGroupsChange={this.handleExpandedGroupsChange} />
            )}
            {groupBy && getChildGroups ? <CustomGrouping getChildGroups={getChildGroups} /> : <IntegratedGrouping />}

            {columnReordering && <DragDropProvider />}
            {rowSelection && (
              <SelectionState
                defaultSelection={[0, 1, 2, 3, 4, 5, 6, 7]}
                selection={this.state.selection}
                onSelectionChange={this.handleSelectionChange}
              />
            )}
            {rowSelection && lockSelection ? <PatchedIntegratedSelection lockSelection={lockSelection} /> : rowSelection && <IntegratedSelection />}

            <SearchState value={filterValue} />
            <IntegratedFiltering />

            {virtual ? (
              <VirtualTable
                columnExtensions={this.getColumnsExtension()}
                height='auto'
                cellComponent={TableCells}
                messages={MESSAGES}
                rowComponent={props => <Row onClick={onRowClick} {...props} />}
              />
            ) : (
              <Table
                columnExtensions={this.getColumnsExtension()}
                height='auto'
                cellComponent={TableCells}
                messages={MESSAGES}
                rowComponent={props => <Row onClick={onRowClick} {...props} />}
              />
            )}

            <TableColumnResizing onColumnWidthsChange={widths => this.handleColumnsSettings({ widths })} columnWidths={columnsSettings.widths} />

            {showHeader && <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />}
            <RowActionsFormatterProvider for={['__actions']} actions={rowActions} />

            <TableColumnVisibility hiddenColumnNames={hiddenColumns} />

            {columnReordering && (
              <TableColumnReordering
                onOrderChange={order => this.handleColumnsSettings({ order })}
                order={columnsSettings.order}
                // defaultOrder={columns.map(c => c.name)}
              />
            )}

            {rowSelection && lockSelection ? (
              <PatchedTableSelection
                showSelectAll={showSelectAll && !sameGroupSelectionOnly}
                selectByRowClick={selectByRowClick}
                lockSelection={lockSelection}
              />
            ) : (
              rowSelection && <TableSelection showSelectAll={showSelectAll && !sameGroupSelectionOnly} selectByRowClick={selectByRowClick} />
            )}
            <DropdownFormatterProvider for={columns.filter(c => c.options).map(c => c.name)} />
            {groupBy && (
              <TableGroupRow
                showColumnsWhenGrouped={showColumnsWhenGrouped}
                indentColumnWidth={1}
                iconComponent={({ expanded }) => (
                  <Icon style={{ float: 'right' }} size='large' color='blue' name={expanded ? 'chevron down' : 'chevron right'} />
                )}
                contentComponent={({ column, row, children, ...restProps }) =>
                  renderGroupLabel ? (
                    renderGroupLabel({
                      column,
                      row,
                      restProps,
                      children: groupActions
                        ? rowActionsCellFormatter({
                            column: { actions: groupActions(row) },
                            row
                          })
                        : null
                    })
                  ) : (
                    <span {...restProps}>
                      <strong>{column.title || column.name}: </strong>
                      {children || String(row.value)}
                    </span>
                  )
                }
                cellComponent={props => (
                  <GroupCell
                    {...this.getGroupRowCheckboxState(props.row.key)}
                    rowSelection={rowSelection}
                    onSelectionChange={this.handleGroupSelectionChange}
                    {...props}
                  />
                )}
                rowComponent={({ children, row, tableRow, ...restProps }) => (
                  <tr className='group-row' {...restProps}>
                    {children}
                  </tr>
                )}
              />
            )}
          </Grid>
        </div>
      </Segment>
    )
  }
}

export default injectIntl(_Table)
