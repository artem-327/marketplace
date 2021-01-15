import React, { Component } from 'react'
import { connect } from 'react-redux'
import pt from 'prop-types'
import { Getter, Plugin } from '@devexpress/dx-react-core'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import styled, { createGlobalStyle } from 'styled-components'
import { Segment, Icon, Dropdown, Modal, Divider, Grid as GridSemantic } from 'semantic-ui-react'
import { Settings, ArrowDown } from 'react-feather'
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
  VirtualTableState,
  TreeDataState,
  CustomTreeData,
  RowDetailState
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  DragDropProvider,
  TableColumnReordering,
  VirtualTable,
  TableColumnResizing,
  TableTreeColumn,
  TableRowDetail
} from '@devexpress/dx-react-grid-bootstrap4'
import { TableSelection } from '~/components/dx-grid-semantic-ui/plugins'
import { getSafe } from '~/utils/functions'
//Actions
import { toggleColumnSettingModal } from '~/modules/inventory/actions'

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
  ${
    isFirefox &&
    `
    .bootstrapiso > .flex-column {
      flex: 0 0 auto !important;
    }
  `
  }
  .group-row {
    position: relative;
    background: #EEE;
  }
  
  .tree-table.root-row td {
    background-color: #edeef2 !important;
  }
  
  .read td {
    background-color: #f8f9fb !important;
    color: #848893  !important;
  }
  
  .greyed:not(:hover) td {
    background-color: #edeef2;
    color: #848893;
    
    
  }
`

const SettingButton = styled(Settings)`
  position: absolute !important;
  cursor: pointer !important;
  top: 11px;
  left: 10px;
  z-index: 601;
  width: 20px;
  height: 19px;
  font-size: 20px;
  line-height: 20px;

  &:before {
    padding: 10px 16px 10px 10px;
    background-color: white !important;
  }
`

const DivScrollDown = styled.div`
  display: flex;
  color: #2599d5;
  height: 40px;
  background-color: #edeef2;
  align-items: center;
  justify-content: center;
`

const DivScrollDownText = styled.div`
  margin: 0 10px 0 10px;
`

const ModalHeader = styled(Modal.Header)`
  font-size: 14px !important;
  font-weight: bold !important;
`

const TableRow = styled(Table.Row)`
  .ui.dropdown .menu > .item:hover {
    background: #2599d5 !important;
    color: #ffffff !important;
  }
  .ui.dropdown .menu {
    color: #848893 !important;
    line-height: 2.14 !important;
  }
`

const CustomCheckbox = styled(Checkbox)`
  .ui.checkbox input:checked ~ .box:after,
  .ui.checkbox input:checked ~ label:after {
    color: #2599d5 !important;
  }
`

const ColumnsSetting = ({ onClick }) => <SettingButton onClick={onClick} data-test='table_setting_btn' name='setting' />

const getSettingColumn = (columns, formatMessage, columnWidth) => {
  return (
    <GridSemantic.Column width={columnWidth}>
      {columns.map(c => {
        if (c.name) {
          return (
            <CustomCheckbox
              key={c.name}
              disabled={c.disabled}
              name={c.name}
              label={
                typeof c.title === 'string'
                  ? c.title
                  : getSafe(() => c.title.props.id, false)
                  ? formatMessage({
                      id: c.title.props.id,
                      defaultMessage: c.title.props.defaultMessage
                    })
                  : c.caption
                  ? typeof c.caption === 'string'
                    ? c.caption
                    : formatMessage({
                        id: c.caption.props.id,
                        defaultMessage: c.caption.props.defaultMessage
                      })
                  : formatMessage({
                      id: `global.${c.name}`,
                      defaultMessage: c.name
                    })
              }
              inputProps={{ 'data-test': `table_setting_${c.name}_chckb` }}
            />
          )
        }
      })}
    </GridSemantic.Column>
  )
}

const ColumnsSettingModal = ({ columns, hiddenColumnNames, onChange, onClose, open, formatMessage }) => {
  const GridColumns = 2
  const modalWidth = GridColumns === 1 ? 300 : 500
  const columnWidth = GridColumns === 1 ? 16 : 8

  // columns with disabled reordering functionality can not be hidden as well
  columns = columns.filter(c => c.allowReordering !== false)

  const column1 = columns.slice()
  const column2 = GridColumns === 1 ? column1 : column1.splice(Math.ceil(column1.length / 2))

  return (
    <Modal open={open} closeIcon onClose={onClose} centered={false} style={{ width: modalWidth }}>
      <ModalHeader>
        <FormattedMessage id='settings.tableColumnSettings' defaultMessage='TABLE COLUMN SETTINGS' />
      </ModalHeader>
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
                  <Button
                    data-test='table_setting_save_btn'
                    primary
                    style={{ backgroundColor: '#2599d5' }}
                    onClick={submitSettings}
                    inputProps={{ type: 'button' }}>
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
const TreeTableCells = (props, rowChildActions) => {
  let newProps = props
  if (props.column.name === 'intProductName' && rowChildActions && !props.row.root) {
    newProps = {
      ...props,
      tableColumn: {
        ...props.tableColumn,
        column: {
          ...props.tableColumn.column,
          actions: rowChildActions
        }
      },
      column: {
        ...props.column,
        actions: rowChildActions
      },
      children: {
        ...props.children,
        props: {
          ...props.children.props,
          column: {
            ...props.children.props.column,
            actions: rowChildActions
          }
        }
      }
    }
  }
  return <Table.Cell {...newProps} className={props.column.actions ? 'actions' : ''} />
}

const HeaderCell = props => {
  const draggingEnabled = props.column.allowReordering !== false

  return <TableHeaderRow.Cell {...props} draggingEnabled={draggingEnabled} />
}

const TableCells = props => {
  return (
    <Table.Cell {...props} className={props.column.actions ? 'actions' : ''}>
      {props.children ? (
        props.children
      ) : typeof (props.value && props.value.type) !== 'object' ? (
        <span class='cell-wrapper'>{props.value}</span>
      ) : (
        props.value
      )}
    </Table.Cell>
  )
}
const DetailTableCells = props => {
  const isEchoCode = getSafe(() => props.tableColumn.column.name === 'echoCode', false)
  const modifiedProps = {
    ...props,
    colSpan: props.colSpan - (isEchoCode ? 2 : 1)
  }
  return (
    <>
      {isEchoCode ? <Table.Cell className='p-0'></Table.Cell> : null}
      <Table.Cell {...modifiedProps} className='not-found' />
    </>
  )
}
const NoDataTableCells = props => {
  const isEchoCode = getSafe(() => props.tableColumn.column.name === 'echoCode', false)
  const modifiedProps = {
    ...props,
    colSpan: props.colSpan - (isEchoCode ? 2 : 1)
  }
  return (
    <>
      {isEchoCode ? <Table.Cell className='p-0'></Table.Cell> : null}
      <Table.Cell {...modifiedProps} className='not-found'>
        {props.getMessage('noData')}
      </Table.Cell>
    </>
  )
}
const GridRoot = props => <Grid.Root {...props} style={{ height: '100%', flex: 1 }} />

const SortLabel = ({ column, onSort, children, direction }) => (
  <span onClick={onSort} data-test={`table_sort_action_${column.name}`} className={column.sortPath ? 'sortable' : ''}>
    {children}
    {direction && <Icon className='thick' name={direction === 'asc' ? 'sort up' : 'sort down'} />}
    {!direction && column.sortPath && <Icon className='thick' name={'sort up'} />}
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
        cellComponent={props =>
          rowSelectionEnabled(props.tableRow.row) ? <TableSelection.Cell {...props} /> : <Table.StubCell {...props} />
        }
        {...restProps}
      />
    )
  }
}

const Row = ({ tableRow, selected, onToggle, onClick, onRowClick, ...restProps }) => {
  const rowAction = (e, row) => {
    onClick && onClick(e, tableRow.row)
  }
  return (
    <TableRow
      {...restProps}
      onClick={rowAction}
      data-test='table_row_action'
      className={`${typeof onClick === 'function' ? 'row-click' : ''} ${getSafe(() => tableRow.row.clsName, null)}`}
    />
  )
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
        sortPath: pt.string,
        allowReordering: pt.bool
      })
    ),
    fixed: pt.arrayOf(
      pt.shape({
        name: pt.string.isRequired,
        position: pt.number.isRequired
      })
    ),
    rows: pt.arrayOf(pt.any),
    selectedRows: pt.array,
    rowDetail: pt.func,
    toggleCellComponent: pt.func,
    columnReordering: pt.bool,
    rowSelection: pt.bool,
    showSelectAll: pt.bool,
    selectByRowClick: pt.bool,
    showHeader: pt.bool,
    loading: pt.bool,
    virtual: pt.bool,
    sorting: pt.bool,
    treeDataType: pt.bool,
    rowDetailType: pt.bool,
    isToggleCellComponent: pt.bool,
    groupBy: pt.array,
    defaultSelection: pt.array,
    onSelectionChange: pt.func,
    sameGroupSelectionOnly: pt.bool,
    renderGroupLabel: pt.func,
    getChildGroups: pt.func,
    getChildRows: pt.func,
    tableName: pt.string,
    singleSelection: pt.bool,
    onScrollToEnd: pt.func,
    onScrollOverNewEnd: pt.func,
    onScrollOverNewUp: pt.func,
    onRowClick: pt.func,
    onSortingChange: pt.func,
    onTableReady: pt.func,
    defaultSorting: pt.shape({
      columnName: pt.string,
      sortPath: pt.string,
      direction: pt.oneOf(['asc', 'desc', null])
    }),
    editingRowId: pt.number,
    normalWidth: pt.bool,
    tableTreeColumn: pt.string,
    onExpandedRowIdsChange: pt.func,
    expandedRowIds: pt.array,
    loadedAllData: pt.bool,
    shrinkGroups: pt.bool,
    columnAction: pt.string,
    toggleColumnSettingModal: pt.func,
    isOpenColumnSettingModal: pt.bool,
    isBankTable: pt.bool,
    estimatedRowHeight: pt.number,
    defaultHiddenColumns: pt.array
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
    treeDataType: false,
    rowDetailType: false,
    isToggleCellComponent: false,
    rowDetail: () => {},
    toggleCellComponent: () => {},
    selectedRows: [],
    groupBy: [],
    defaultHiddenColumns: [],
    singleSelection: false,
    onSelectionChange: () => {},
    onScrollToEnd: () => {},
    onScrollOverNewEnd: () => {},
    onScrollOverNewUp: () => {},
    onTableReady: () => {},
    getChildRows: () => {},
    defaultSorting: null,
    editingRowId: null,
    normalWidth: false,
    tableTreeColumn: '',
    onExpandedRowIdsChange: () => {},
    expandedRowIds: [],
    loadedAllData: true,
    shrinkGroups: false,
    columnActions: '',
    toggleColumnSettingModal: () => {},
    isOpenColumnSettingModal: false,
    isBankTable: false,
    estimatedRowHeight: 0
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
      },
      scrollLeft: 0,
      scrolledBottom: false
    }
  }

  componentDidMount() {
    this.loadColumnsSettings()
    let table = this.gridWrapper.querySelector('.table-responsive')
    if (table) {
      table.addEventListener('scroll', this.handleScroll)
      this.props.displayRowActionsOverBorder && table.setAttribute('style', 'display: table')
    }
  }

  handleScroll = ({ target }) => {
    const { onScrollToEnd, onScrollOverNewUp, onScrollOverNewEnd, loadedAllData, loading } = this.props
    const { newTop, newBottom, pageSize, scrolledBottom } = this.state
    const { scrollLeft } = target

    if (loading) return

    if (this.state.scrollLeft !== scrollLeft) {
      this.setState({ scrollLeft }, () => this.forceUpdate())
    }
    //Get position of scroll and height scroll area
    const scrollviewOffsetY = target.scrollTop
    const scrollviewFrameHeight = target.clientHeight
    const scrollviewContentHeight = target.scrollHeight
    const sum = scrollviewOffsetY + scrollviewFrameHeight

    let tops = 0
    let bottoms = 0
    //Calculate how many top borders (pages {1 page = 50 rows}) user skipped (scroll)
    if (newTop && sum && pageSize) {
      tops = Math.ceil((newTop - sum) / pageSize) > 0 ? Math.ceil((newTop - sum) / pageSize) : 1
    }
    //Calculate how many bottom borders (pages {1 page = 50 rows}) user skipped (scroll)
    if (newBottom && sum && pageSize) {
      bottoms = Math.floor((newBottom - sum) / pageSize) < 0 ? Math.floor((newBottom - sum) / pageSize) * -1 : 1
    }

    //crate new top abouve when is newTop > scrollviewContentHeight
    if (newTop > scrollviewContentHeight) {
      const top = newTop - pageSize * tops >= 0 ? newTop - pageSize * tops - 1 : 0
      this.setState({ newTop: top })
    }
    // Upload new data if user scroll the end of a table and create new Top border and new Bottom border in a table

    //scrolledBottom show message "Scroll down for load more items" under a table
    if (!scrolledBottom && !loadedAllData && sum >= scrollviewContentHeight - 50) {
      if ((scrollviewContentHeight > newTop && scrollviewContentHeight > newBottom - 50) || (!newBottom && !newTop)) {
        this.setState({ scrolledBottom: true })
        return
      }
    } else {
      this.setState({ scrolledBottom: false })
    }
    // Upload new data if user scroll the end of a table and create new Top border and new Bottom border in a table
    if (!loadedAllData && sum >= scrollviewContentHeight - 50) {
      //Calculate new Top border and new Bottom border in a table
      const top = !newBottom
        ? scrollviewContentHeight
        : newBottom > 1
        ? newBottom + pageSize * (bottoms - 1)
        : scrollviewContentHeight < newBottom
        ? newTop
        : newBottom

      const bottom = !newBottom
        ? scrollviewContentHeight * 2
        : scrollviewContentHeight < newBottom
        ? scrollviewContentHeight
        : newBottom + pageSize * bottoms

      //Call to DatagridProvider and there add bottoms to pageNumber
      onScrollToEnd(bottoms)

      this.setState({
        pageSize: pageSize ? pageSize : scrollviewContentHeight,
        newTop: top,
        newBottom: bottom,
        scrolledBottom: false
      })
    } // If user scrolls over new Bottom border then reload data in a table from specific page number
    else if (sum >= newBottom - 50) {
      //Calculate new Top border and new Bottom border in a table
      const top = newBottom > 1 ? newBottom + pageSize * (bottoms - 1) : newBottom
      const bottom = newBottom + pageSize * bottoms
      //Call to DatagridProvider and there add bottoms to pageNumber
      onScrollOverNewEnd(bottoms)
      this.setState({
        newTop: top,
        newBottom: bottom
      })
    } // If user scrolls over new Top border then reload data in a table from specific page number
    else if (sum <= newTop && scrollviewContentHeight > newTop) {
      //Calculate new Top border and new Bottom border in a table
      const top = newTop - pageSize * tops >= 0 ? newTop - pageSize * tops : 0
      const bottom =
        tops < 1 ? newTop : newTop - pageSize * (tops - 1) > pageSize ? newTop - pageSize * (tops - 1) : pageSize
      //Call to DatagridProvider and there add tops to pageNumber
      onScrollOverNewUp(tops * -1)
      this.setState({
        newTop: top,
        newBottom: bottom
      })
    }
  }

  componentDidUpdate(prevProps) {
    // expand groups after data was loaded when grouping is set
    if (prevProps.rows !== this.props.rows) this.props.groupBy.length && this.expandGroups()
    // prevProps.loading != this.props.loading && prevProps.loading && this.props.groupBy.length > 0 && this.expandGroups()

    if (prevProps.tableName !== this.props.tableName) {
      this.loadColumnsSettings()
    }

    if (prevProps.selectedRows !== this.props.selectedRows) {
      this.setState({ selection: this.props.selectedRows })
    }
  }

  expandGroups = () => {
    const { groupBy, getChildGroups, rows, shrinkGroups = false } = this.props

    if (groupBy.length > 0) {
      if (shrinkGroups) {
        this.setState({
          expandedGroups: this.state.expandedGroups
        })
      } else {
        this.setState({
          expandedGroups: getChildGroups
            ? getChildGroups(rows).map(r => r.key)
            : Object.keys(_.groupBy(rows, groupBy.join('|')))
        })
      }
    }
  }

  handleExpandedGroupsChange = expandedGroups => {
    this.setState({ expandedGroups })
  }

  handleSelectionChange = selection => {
    const {
      onSelectionChange,
      getChildGroups,
      groupBy,
      rows,
      sameGroupSelectionOnly,
      singleSelection,
      singleSelectionRow
    } = this.props
    const lastSelected = selection.find(selected => this.state.selection.indexOf(selected) === -1)

    if (singleSelectionRow) {
      this.setState({ selection: [lastSelected] })
      onSelectionChange([lastSelected])
      return true
    }

    if (groupBy.length) {
      const groups = getChildGroups(rows)
      const selectionGroups = selection.map(s => groups.find(g => g.childRows.find(child => child.id === s)))

      const sameGroup = selectionGroups.every(sg => sg === selectionGroups[0])
      const finalSelection = singleSelection ? [lastSelected] : selection
      if (sameGroup || !sameGroupSelectionOnly) {
        this.setState({ selection: finalSelection })
        onSelectionChange(finalSelection)

        return true
      }
      return false
    }

    const finalSelection = singleSelection ? [lastSelected] : selection
    this.setState({ selection: finalSelection })
    onSelectionChange(finalSelection)
    return true
  }

  handleGroupSelectionChange = (groupKey, value) => {
    const { getChildGroups, rows } = this.props
    const { selection } = this.state
    const group = getChildGroups(rows).find(g => g.key === groupKey)
    const groupRowsIds = group.childRows.map(r => r.id)

    const newSelection = value
      ? _.uniq([...selection, ...groupRowsIds])
      : selection.filter(s => groupRowsIds.indexOf(s) === -1)

    const result = this.handleSelectionChange(newSelection)
    return result
  }

  getGroupRowCheckboxState = groupKey => {
    const { getChildGroups, rows } = this.props
    const { selection } = this.state
    const group = getChildGroups(rows).find(g => g.key === groupKey)
    const groupRowsIds = group && group.childRows ? group.childRows.map(r => r.id) : []

    const checked = groupRowsIds.length && groupRowsIds.every(gr => selection.indexOf(gr) > -1)
    const indeterminate = !checked && _.intersection(groupRowsIds, selection).length > 0

    return {
      checked,
      indeterminate
    }
  }

  getColumns = () => {
    const { rowActions, columns, hideSettingsIcon } = this.props
    return columns
    // return rowActions
    //   ? [
    //       {
    //         name: '__actions',
    //         title: !hideSettingsIcon ? (
    //           <ColumnsSetting
    //             onClick={() =>
    //               this.setState(prevState => ({
    //                 columnSettingOpen: !prevState.columnSettingOpen
    //               }))
    //             }
    //             data-test='table_columns_setting_action'
    //           />
    //         ) : (
    //           ''
    //         ),
    //         width: 40,
    //         actions: rowActions
    //       },
    //       ...columns
    //     ]
    //   : columns
  }

  getColumnsExtension = () => {
    const columns = this.getColumns()
    return columns.map(c => ({
      columnName: c.name,
      width: c.width || 1280 / columns.length,
      align: c.align ? c.align : 'left',
      maxWidth: c.maxWidth ? c.maxWidth : null,
      allowReordering: typeof c.allowReordering !== 'undefined' ? c.allowReordering : true
    }))
  }

  loadColumnsSettings = () => {
    const { tableName, columns, defaultHiddenColumns, defaultSorting } = this.props
    // get column names from current table settings
    let colNames = columns.map(column => {
      return column.name
    })

    if (tableName && localStorage[tableName]) {
      // if saved table settings exists then compare it with current settings
      let savedSettings = JSON.parse(localStorage[tableName])

      let invalidItems =
        savedSettings.order.length === colNames.length
          ? savedSettings.order.filter(col => !(colNames.indexOf(col) > -1))
          : true

      if ((!savedSettings.sorting || savedSettings.sorting.length === 0) && defaultSorting) {
        savedSettings.sorting = [defaultSorting]
        this.setState(
          { columnsSettings: savedSettings },
          () => (localStorage[tableName] = JSON.stringify(this.state.columnsSettings))
        )
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
      sortDirection: s && s.direction
    })
  }

  handleSortingChange = sort => {
    let { sorting } = this.state.columnsSettings
    let newSorting = []

    if (sorting.length === 0) {
      newSorting = sort.map(el => ({
        ...el,
        direction: el.direction
      }))
    } else {
      if (sorting[0].columnName === sort[0].columnName) {
        // Just switch directions
        newSorting = [{ columnName: sort[0].columnName, direction: sorting[0].direction === 'asc' ? 'desc' : 'asc' }]
      } else {
        // Just switch columnName and set to asc as is default
        newSorting = [
          {
            columnName: sort[0].columnName,
            direction: sorting[0].direction === 'asc' ? 'asc' : 'desc'
          }
        ]
      }
    }

    let [s] = newSorting

    const { onSortingChange, columns } = this.props
    const column = columns.find(c => c.name === s.columnName)

    if (!column || !column.sortPath) return

    this.handleColumnsSettings({ sorting: newSorting })

    onSortingChange &&
      onSortingChange({
        sortPath: column ? column.sortPath : s.columnName,
        sortDirection: s.direction
      })
  }

  compareMaxWidths = (dataWidths, stateWidths) => {
    const result = []

    dataWidths &&
      dataWidths.forEach(dataWidth =>
        stateWidths.forEach(stateWidth => {
          if (dataWidth.columnName === stateWidth.columnName) {
            if (stateWidth.maxWidth && dataWidth.width > stateWidth.maxWidth) {
              result.push({ ...stateWidth, width: stateWidth.maxWidth })
            } else if (!stateWidth.maxWidth && dataWidth.width > 400) {
              result.push({ ...stateWidth, width: 400 })
            } else if (!stateWidth.maxWidth && dataWidth.width < 400) {
              result.push({ ...stateWidth, width: dataWidth.width })
            } else if (stateWidth.maxWidth && dataWidth.width < stateWidth.maxWidth) {
              result.push({ ...stateWidth, width: dataWidth.width })
            } else {
              result.push({ ...stateWidth })
            }
          }
        })
      )
    return result
  }

  handleColumnsSettings = data => {
    const {
      columnsSettings: { order }
    } = this.state
    const { tableName, fixed } = this.props
    if (data.order && typeof fixed !== 'undefined') {
      fixed.forEach(fixedCol => {
        if (data.order.indexOf(fixedCol.name) !== fixedCol.position) {
          data.order = order
        }
      })
    }
    const newData = data.widths
      ? { ...data, widths: this.compareMaxWidths(data.widths, this.state.columnsSettings.widths) }
      : { ...data }

    this.setState(
      state => ({
        columnsSettings: {
          ...state.columnsSettings,
          ...newData
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
      rowDetail,
      toggleCellComponent,
      columns,
      filterValue,
      columnReordering,
      onRowClick,
      rowSelection,
      selectByRowClick,
      showSelectAll,
      sameGroupSelectionOnly,
      rowChildActions,
      showHeader,
      onSelectionChange,
      loading,
      virtual,
      sorting,
      treeDataType,
      rowDetailType,
      isToggleCellComponent,
      onSortingChange,
      integratedSorting,
      groupBy,
      renderGroupLabel,
      getChildGroups,
      getChildRows,
      tableName,
      showColumnsWhenGrouped = false,
      lockSelection,
      groupActions,
      hideSettingsIcon,
      highlightRow,
      showSelectionColumn,
      hideCheckboxes,
      editingRowId,
      normalWidth,
      removeFlexClass,
      tableTreeColumn,
      onExpandedRowIdsChange,
      expandedRowIds,
      loadedAllData,
      columnActions,
      isOpenColumnSettingModal,
      toggleColumnSettingModal,
      estimatedRowHeight,
      isBankTable,
      ...restProps
    } = this.props
    const {
      intl: { formatMessage },
      defaultHiddenColumns
    } = this.props

    const { columnSettingOpen, expandedGroups, columnsSettings, loaded, scrolledBottom } = this.state
    const grouping = groupBy.map(g => ({ columnName: g }))
    const columnsFiltered = columns.filter(
      c => !c.disabled && !c.actions && (showColumnsWhenGrouped || !groupBy.includes(c.name))
    )

    const hiddenColumns = [
      ...this.getColumns()
        .filter(c => c.disabled)
        .map(c => c.name),
      ...(columnsSettings.hiddenColumnNames || [])
    ]

    return (
      <Segment
        basic
        loading={loading}
        {...restProps}
        className={removeFlexClass ? 'stretched' : 'flex stretched'}
        style={{ padding: 0 }}>
        <GlobalTableOverrideStyle />
        <div
          className={`${normalWidth ? '' : 'table-responsive-wider'} bootstrapiso flex stretched`}
          style={{
            flex: '1 300px',
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.2s'
          }}
          ref={c => c && (this.gridWrapper = c)}>
          <ColumnsSettingModal
            columns={columnsFiltered}
            open={isOpenColumnSettingModal}
            formatMessage={formatMessage}
            hiddenColumnNames={this.state.columnsSettings.hiddenColumnNames}
            onClose={() => toggleColumnSettingModal(false)}
            onChange={hiddenColumnNames => {
              this.handleColumnsSettings({ hiddenColumnNames })
              toggleColumnSettingModal(false)
            }}
            data-test='table_columns_setting_modal'
          />

          <Grid rows={rows} getRowId={row => row.id} columns={this.getColumns()} rootComponent={GridRoot}>
            {sorting && (
              <SortingState
                // sorting={[columnsSettings.sorting.map(el => ({ ...el, direction: el.direction.toLowerCase() }))]}
                sorting={columnsSettings.sorting}
                onSortingChange={sorting => this.handleSortingChange(sorting)}
              />
            )}

            {!onSortingChange && <IntegratedSorting />}

            {groupBy && (
              <GroupingState
                grouping={grouping}
                expandedGroups={expandedGroups}
                onExpandedGroupsChange={this.handleExpandedGroupsChange}
              />
            )}
            {groupBy && getChildGroups ? <CustomGrouping getChildGroups={getChildGroups} /> : <IntegratedGrouping />}

            {rowSelection && (
              <SelectionState
                defaultSelection={[0, 1, 2, 3, 4, 5, 6, 7]}
                selection={this.state.selection}
                onSelectionChange={this.handleSelectionChange}
              />
            )}
            {editingRowId && <SelectionState selection={editingRowId ? [editingRowId] : []} />}

            {rowSelection && lockSelection ? (
              <PatchedIntegratedSelection lockSelection={lockSelection} />
            ) : (
              (rowSelection || editingRowId) && <IntegratedSelection />
            )}

            <SearchState value={filterValue} />
            <IntegratedFiltering />

            {treeDataType && (
              <TreeDataState expandedRowIds={expandedRowIds} onExpandedRowIdsChange={onExpandedRowIdsChange} />
            )}
            {treeDataType && <CustomTreeData getChildRows={getChildRows} />}

            {rowDetailType && (
              <RowDetailState expandedRowIds={expandedRowIds} onExpandedRowIdsChange={onExpandedRowIdsChange} />
            )}

            {virtual ? (
              <VirtualTable
                columnExtensions={this.getColumnsExtension()}
                height='auto'
                estimatedRowHeight={estimatedRowHeight ? estimatedRowHeight : 49}
                cellComponent={props => {
                  return treeDataType && rowChildActions ? TreeTableCells(props, rowChildActions) : TableCells(props)
                }}
                noDataCellComponent={NoDataTableCells}
                messages={MESSAGES}
                rowComponent={props => {
                  return <Row onClick={onRowClick} {...props} />
                }}
              />
            ) : (
              <Table
                columnExtensions={this.getColumnsExtension()}
                height='auto'
                cellComponent={TableCells}
                noDataCellComponent={NoDataTableCells}
                messages={MESSAGES}
                rowComponent={props => <Row onClick={onRowClick} {...props} />}
              />
            )}

            <TableColumnResizing
              onColumnWidthsChange={widths => this.handleColumnsSettings({ widths })}
              columnWidths={columnsSettings.widths.map(el => (!el.width ? { ...el, width: 200 } : el))}
            />
            {columnReordering && <DragDropProvider />}
            {showHeader && (
              <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} cellComponent={HeaderCell} />
            )}
            <RowActionsFormatterProvider for={[columnActions]} />

            {treeDataType && (
              <TableTreeColumn
                for={tableTreeColumn}
                cellComponent={props => <TableTreeColumn.Cell {...props} className='tree-cell' />}
                expandButtonComponent={() => {
                  return null
                }}
              />
            )}

            {rowDetailType && isToggleCellComponent && (
              <TableRowDetail
                contentComponent={rowDetail}
                cellComponent={props => <DetailTableCells rowDetail={rowDetail} {...props} />}
                toggleCellComponent={toggleCellComponent}
              />
            )}

            {rowDetailType && !isToggleCellComponent && (
              <TableRowDetail
                toggleColumnWidth={3}
                contentComponent={rowDetail}
                cellComponent={props => <DetailTableCells rowDetail={rowDetail} {...props} />}
              />
            )}

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
              rowSelection && (
                <TableSelection
                  showSelectAll={showSelectAll && !sameGroupSelectionOnly}
                  selectByRowClick={selectByRowClick ? selectByRowClick : false}
                  showSelectionColumn={showSelectionColumn ? showSelectionColumn : false}
                  highlightRow={highlightRow}
                />
              )
            )}
            {editingRowId && (
              <TableSelection
                showSelectAll={showSelectAll && !sameGroupSelectionOnly}
                selectByRowClick={false}
                showSelectionColumn={false}
                highlightRow={true}
              />
            )}
            <DropdownFormatterProvider for={columns.filter(c => c.options).map(c => c.name)} />
            {groupBy && (
              <TableGroupRow
                showColumnsWhenGrouped={showColumnsWhenGrouped}
                indentColumnWidth={1}
                iconComponent={({ expanded }) => (
                  <Icon
                    style={{ float: 'right', color: '#2599d5' }}
                    size='large'
                    name={expanded ? 'chevron down' : 'chevron right'}
                  />
                )}
                contentComponent={({ column, row, children, ...restProps }) =>
                  renderGroupLabel ? (
                    renderGroupLabel({
                      column,
                      row,
                      restProps,
                      groupLength: getChildGroups(rows).find(group => row.value === group.key).groupLength,
                      children: rowActionsCellFormatter({
                        column: { actions: groupActions ? groupActions(row) : null },
                        row
                      })
                    })
                  ) : (
                    <span {...restProps}>
                      <strong>{column.title || column.name}: </strong>
                      <strong>{children || String(row.value)}</strong>
                    </span>
                  )
                }
                cellComponent={props => (
                  <GroupCell
                    {...this.getGroupRowCheckboxState(props.row.key)}
                    isBankTable={isBankTable}
                    rowSelection={rowSelection}
                    hideActions={groupActions ? false : true}
                    hideCheckboxes={hideCheckboxes}
                    onSelectionChange={this.handleGroupSelectionChange}
                    actionsDropdown={rowActionsCellFormatter({
                      column: { actions: groupActions ? groupActions(props.row) : null },
                      row: props.row,
                      groupLength: getChildGroups(rows).find(group => props.row.value === group.key).groupLength,
                      isBankTable
                    })}
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
        {!loadedAllData && scrolledBottom ? (
          <DivScrollDown>
            <ArrowDown />
            <DivScrollDownText>
              <FormattedMessage id='global.scrollDown' defaultMessage='Scroll down for load more items'>
                {text => text}
              </FormattedMessage>
            </DivScrollDownText>
            <ArrowDown />
          </DivScrollDown>
        ) : null}
      </Segment>
    )
  }
}

const mapDispatchToProps = {
  toggleColumnSettingModal
}

const mapStateToProps = state => ({
  isOpenColumnSettingModal: getSafe(() => state.simpleAdd.isOpenColumnSettingModal, false)
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(_Table))
