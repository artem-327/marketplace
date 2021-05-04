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
import { ChevronUp, ChevronDown, Check } from 'react-feather'
import GenericProductRequest from './DetailMessages/GenericProductRequest'
import ShippingQuoteRequest from './DetailMessages/ShippingQuoteRequest'
import ShippingQuoteInfo from './DetailMessages/ShippingQuoteInfo'
import { UserImage, UserName, UserCompany, CheckIcon } from './layout'
import Link from 'next/link'

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
const StyledAlertHeader = styled.span`
  cursor: pointer;
`

const DivUser = styled.div`
  width: 200px;
  min-width: 200px
`

const DivNotificationRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

class Table extends Component {
  state = {
    columns: [
      {
        name: 'notification',
        title: <div></div>,
        width: 920,
        maxWidth: 2000,
        disabled: false
      },
      {
        name: 'time',
        title: <div></div>,
        sortPath: 'Message.createdAt',
        width: 160,
        disabled: false
      },
      {
        name: 'timeGroup',
        disabled: true
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
        width: 50,
        disabled: true
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
        <StyledAlertHeader>{ReactHtmlParser(row.text)}</StyledAlertHeader>
        {row.read && (
          <CheckIcon>
            <Check />
          </CheckIcon>
        )}
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
      const recent =
        moment(r.createdAt).isSame(moment(), 'day') || moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')

      const isUserData = getSafe(() => r.relatedCompany.avatarUrl, false)
        || r.nameOfUser || getSafe(() => r.info.requestedBy.company.cfDisplayName, false)
        || getSafe(() => r.info.buyerCompanyName, false)

      return {
        ...r,
        clsName: read + (selected ? ' selected' : '') + (open ? ' open' : '') + (recent ? ' recent' : ''),
        notification: (
          <DivNotificationRow>
            {!!isUserData && (
              <DivUser>
                {getSafe(() => r.relatedCompany.avatarUrl, false) && (
                  <UserImage src={r.relatedCompany.avatarUrl} bordered />
                )}
                <UserName as='h3'>{r.nameOfUser}</UserName>
                <UserCompany as='h4'>
                  {getSafe(() => r.info.requestedBy.company.cfDisplayName, false) ||
                  getSafe(() => r.info.buyerCompanyName, false)}
                </UserCompany>
              </DivUser>
            )}
            {this.notificationText(r.rawData)}
          </DivNotificationRow>
        ),
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
            trigger={<div style={{ color: '#848893' }}>{moment(r.createdAt).fromNow()}</div>}
          />
        ) : (
          'N/A'
        ),
        timeGroup: r.createdAt
          ? moment(r.createdAt).isSame(moment(), 'day')
            ? 'Today'
            : moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')
            ? 'Yesterday'
            : moment(r.createdAt).isSame(moment(), 'week')
            ? 'This Week'
            : moment(r.createdAt).isSame(moment(), 'month')
            ? 'This Month'
            : 'Older'
          : '',
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
      MessageShippingQuoteInfoResponse: (
        <ShippingQuoteInfo row={row.rawData} onClose={() => this.toggleDetail(row.id)} />
      )
    }
    // TODO when BE will have GET endpoint for Detail Order in Operatins
    // and FE adjust component Detail in Operation
    // then we can call specific detail with /detail/${row?.info?.orderId} in href
    const textMessage =
      row?.category === 'Disputes' && row?.info?.orderId ? (
        <Link href={`/operations/orders`}>
          <a>{ReactHtmlParser(row?.text)}</a>
        </Link>
      ) : (
        ReactHtmlParser(row.text)
      )
    return <>{messageType && messageDetailTable[messageType] ? messageDetailTable[messageType] : textMessage}</>
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
      console.error(e)
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
      console.error(e)
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
    const { intl, datagrid, markSeenSending, selectedRows } = this.props
    const { formatMessage } = intl
    const { columns, expandedRowIds } = this.state

    return (
      <Fragment>
        <div className={'flex stretched table-detail-rows-wrapper notifications-wrapper notifications-admin-wrapper'}>
          <ProdexTable
            tableName={'notifications_table'}
            {...datagrid.tableProps}
            loading={datagrid.loading || markSeenSending}
            columnReordering={false}
            groupBy={['timeGroup']}
            getChildGroups={rows => {
              return _(rows)
                .groupBy('timeGroup')
                .map(v => {
                  return {
                    key: `${v[0].timeGroup}`,
                    childRows: v,
                    groupLength: v.length
                  }
                })
                .value()
            }}
            renderGroupLabel={({ row: { value }, groupLength }) => null}
            hideGroupCheckboxes={true}
            columns={columns}
            isBankTable={true}
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
            defaultSorting={{ columnName: 'time', sortPath: 'Message.createdAt', direction: 'DESC' }}
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
