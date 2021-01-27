import { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import ProdexTable from '~/components/table'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import styled from 'styled-components'
import { Label, Popup, Checkbox } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'
import { FormattedDateTime } from '~/components/formatted-messages/'
import { ChevronUp, ChevronDown } from 'react-feather'
import GenericProductRequest from './message-details/GenericProductRequest'
import ShippingQuoteRequest from './message-details/ShippingQuoteRequest'
import ShippingQuoteInfo from './message-details/ShippingQuoteInfo'

const StyledStatusLabel = styled(Label)`
  font-size: 12px !important;
  height: 22px !important;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  border-radius: 11px !important;
  padding: 0.3333em 1.16667em 0.16667em 1.16667em !important;
  cursor: pointer;

  &.read {
    color: #848893;
    border: solid 1px #dee2e6;
    background-color: #edeef2;
  }

  &.unread {
    color: #ffffff;
    background-color: #2599d5 !important;
  }
`

const StyledNotification = styled.div`
  &.clickable {
    cursor: pointer;

    &:hover {
      font-weight: bold;
      color: #2599d5;
    }
  }
`

const NotificationsCount = styled.div`
  text-align: center;
  font-size: 14px;
  color: #20273a;
  height: 30px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin-bottom: 25px;
  padding: 4px;
`

class Table extends Component {
  state = {
    columns: [
      {
        name: 'notification',
        title: (
          <FormattedMessage id='alerts.column.notification' defaultMessage='Notification'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'Message.text',
        width: 720,
        maxWidth: 2000
      },
      {
        name: 'notificationType',
        title: (
          <FormattedMessage id='alerts.column.notificationType' defaultMessage='Notification Type'>
            {text => text}
          </FormattedMessage>
        ),
        //sortPath: '',
        width: 200
      },
      {
        name: 'nameOfUser',
        title: (
          <FormattedMessage id='alerts.column.nameOfUser' defaultMessage='Name Of User'>
            {text => text}
          </FormattedMessage>
        ),
        //sortPath: '',
        width: 200
      },
      {
        name: 'usersCompany',
        title: (
          <FormattedMessage id='alerts.column.usersCompany' defaultMessage="User's Company">
            {text => text}
          </FormattedMessage>
        ),
        //sortPath: '',
        width: 200
      },
      {
        name: 'time',
        title: (
          <FormattedMessage id='alerts.column.time' defaultMessage='Time'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'Message.createdAt',
        width: 160
      },
      {
        name: 'expand',
        title: <div></div>,
        caption: (
          <FormattedMessage id='alerts.column.expand' defaultMessage='Expand'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'center',
        width: 50
      }
    ],
    expandedRowIds: []
  }

  statusLabel = (row, val) => {
    const read = val === 'read'
    return (
      <StyledStatusLabel
        className={val}
        onClick={() => {
          if (read) this.handleClickOnRead(row)
          else this.handleClickOnUnread(row)
        }}>
        {read ? (
          <FormattedMessage id='alerts.status.read' defaultMessage='Read' />
        ) : (
          <FormattedMessage id='alerts.status.unread' defaultMessage='Unread' />
        )}
      </StyledStatusLabel>
    )
  }

  notificationText = row => {
    return (
      <StyledNotification
        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        onClick={() => {
          if (row.info) this.toggleDetail(row.id)
          if (!row.read) this.handleClickOnUnread(row)
        }}>
        {ReactHtmlParser(row.text)}
      </StyledNotification>
    )
  }

  toggleDetail = rowId => {
    let { expandedRowIds } = this.state
    if (expandedRowIds.length) {
      let found = false
      let rows = expandedRowIds.reduce((result, id) => {
        if (id === rowId) {
          found = true
          return result
        } else {
          result.push(id)
          return result
        }
      }, [])
      if (!found) {
        rows.push(rowId)
      }
      this.setState({ expandedRowIds: rows })
    } else {
      this.setState({ expandedRowIds: [rowId] })
    }
  }

  getRows = () => {
    return this.props.rows.map(r => {
      const read = r.read ? 'read' : 'unread'
      const selected = this.props.selectedRows.some(id => id === r.id)
      const open = this.state.expandedRowIds.some(id => id === r.id)
      return {
        ...r,
        clsName: read + (selected ? ' selected' : '') + (open ? ' open' : ''),
        notification: this.notificationText(r.rawData),
        time: r.createdAt ? (
          <Popup
            size='small'
            inverted
            style={{
              fontSize: '12px',
              color: '#cecfd4',
              opacity: '0.9'
            }}
            header={
              <div style={{ color: '#cecfd4', fontSize: '12px' }}>{moment(r.createdAt).toDate().toLocaleString()}</div>
            }
            trigger={<div style={{ color: r.read ? '#848893' : '#20273a' }}>{moment(r.createdAt).fromNow()}</div>}
          />
        ) : (
          'N/A'
        ),
        expand: r.info ? (
          open ? (
            <ChevronUp size={16} onClick={() => this.toggleDetail(r.id)} style={{ cursor: 'pointer' }} />
          ) : (
            <ChevronDown
              size={16}
              onClick={() => {
                this.toggleDetail(r.id)
                if (!r.read) this.handleClickOnUnread(r)
              }}
              style={{ cursor: 'pointer' }}
            />
          )
        ) : null
      }
    })
  }

  getRowDetail = ({ row }) => {
    const messageType = row.info && row.info.infoType ? row.info.infoType : ''
    const messageDetailTable = {
      MessageCompanyGenericProductRequestInfoResponse: <GenericProductRequest row={row.rawData} />,
      MessageShippingQuoteRequestInfoResponse: <ShippingQuoteRequest row={row.rawData} />,
      MessageShippingQuoteInfoResponse: <ShippingQuoteInfo row={row.rawData} />
    }

    return (
      <>
        {messageType && messageDetailTable[messageType] ? messageDetailTable[messageType] : ReactHtmlParser(row.text)}
      </>
    )
  }

  handleClickOnUnread = async row => {
    const { datagrid, getCategories, markSeen, getCountUnseen } = this.props
    try {
      await markSeen(row.id)
      datagrid.updateRow(row.id, () => ({
        ...row,
        read: true,
        readAt: moment().format()
      }))
      getCountUnseen()
      getCategories()
    } catch (e) {
      console.log(e)
    }
  }

  handleClickOnRead = async row => {
    const { datagrid, getCategories, markUnseen, getCountUnseen } = this.props
    try {
      await markUnseen(row.id)
      datagrid.updateRow(row.id, () => ({
        ...row,
        read: false,
        readAt: null
      }))
      getCountUnseen()
      getCategories()
    } catch (e) {
      console.log(e)
    }
  }

  toggleCellComponent = ({ expanded, onToggle, tableColumn, tableRow, row, style, ...restProps }) => {
    const { selectedRows } = this.props
    return (
      <td
        style={{
          verticalAlign: 'middle',
          textAlign: 'center',
          ...style
        }}
        {...restProps}>
        <Checkbox
          defaultChecked={selectedRows.some(s => s === row.id)}
          onChange={(e, { checked }) => {
            e.preventDefault()
            let newSelectedRows = selectedRows.slice()
            if (checked) {
              if (!newSelectedRows.includes(row.id)) {
                newSelectedRows.push(row.id)
                this.props.onSelectionChange(newSelectedRows)
              }
            } else {
              this.props.onSelectionChange(newSelectedRows.filter(id => id !== row.id))
            }
          }}
        />
      </td>
    )
  }

  render() {
    const { intl, datagrid, markSeenSending, menuStatusFilter, selectedRows } = this.props
    const { formatMessage } = intl
    const { columns, expandedRowIds } = this.state

    return (
      <Fragment>
        {selectedRows.length ? (
          <NotificationsCount>
            {selectedRows.length === 1 ? (
              <FormattedMessage
                id='alerts.notificationsCount'
                defaultMessage='{count} {notification} on this page {is} selected'
                values={{
                  count: <b>{selectedRows.length}</b>,
                  notification: (
                    <b>
                      <FormattedMessage id='alerts.notification' defaultMessage='notification' />
                    </b>
                  ),
                  is: <FormattedMessage id='alerts.is' defaultMessage='is' />
                }}
              />
            ) : (
              <FormattedMessage
                id='alerts.notificationsCount'
                defaultMessage='{count} {notification} on this page {is} selected'
                values={{
                  count: <b>{selectedRows.length}</b>,
                  notification: (
                    <b>
                      <FormattedMessage id='alerts.notifications' defaultMessage='notifications' />
                    </b>
                  ),
                  is: <FormattedMessage id='alerts.are' defaultMessage='are' />
                }}
              />
            )}
          </NotificationsCount>
        ) : null}

        <div className='flex stretched table-detail-rows-wrapper'>
          <ProdexTable
            tableName={`operations_tag_${menuStatusFilter}`}
            {...datagrid.tableProps}
            loading={datagrid.loading || markSeenSending}
            columns={columns}
            isToggleCellComponent={true}
            rowDetailType={true}
            rows={this.getRows()}
            rowDetail={this.getRowDetail}
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
            rowSelection={true}
            lockSelection={false}
            showSelectAll={false}
            toggleCellComponent={this.toggleCellComponent}
            isToggleCellComponent={true}
            selectedRows={selectedRows}
            onSelectionChange={selectedRows => {
              this.props.onSelectionChange(selectedRows)
            }}
            estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, { datagrid }) => {
  const { alerts } = state
  return {
    ...alerts,
    rows: datagrid.rows.map(r => {
      return {
        ...r,
        rawData: r,
        notificationType: r.category.replace(/_/g, ' '),
        nameOfUser: getSafe(() => r.info.requestedBy.name, ''),
        usersCompany: getSafe(() => r.info.requestedBy.company.cfDisplayName, '')
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(Table))))
