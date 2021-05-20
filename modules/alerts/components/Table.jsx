import { Fragment, Component } from 'react'
import { useEffect, useState } from 'react'
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

import { COLUMNS } from './Table.constants'

const StyledNotification = styled.div`
  margin: auto 0;
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 200px;
  min-width: 200px;
`

const DivNotificationRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const DivVerticalyAligned = styled.div`
  margin: auto 0;
`

const Table = props => {
  const { intl, datagrid, markSeenSending, selectedRows } = props
  const { formatMessage } = intl

  const [expandedRowIds, setExpandedRowIds] = useState([])
  const state = { expandedRowIds, setExpandedRowIds }

  const notificationText = row => {
    return (
      <StyledNotification
        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        onClick={() => {
          if (row.info) toggleDetail(row.id)
          if (!row.read) handleClickOnUnread(row)
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

  const toggleDetail = rowId => {
    let { expandedRowIds, setExpandedRowIds } = state
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
      setExpandedRowIds(rows)
    } else {
      setExpandedRowIds([rowId])
    }
  }

  const getRows = props => {
    return props.rows.map(r => {
      const read = r.read ? 'read' : 'unread'
      const selected = props.selectedRows.some(id => id === r.id)
      const open = state.expandedRowIds.some(id => id === r.id)
      const recent =
        moment(r.createdAt).isSame(moment(), 'day') || moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')

      const isUserData = getSafe(() => r.relatedCompany.avatarUrl, false)
        || r.nameOfUser || getSafe(() => r.info.requestedBy.company.cfDisplayName, false)
        || getSafe(() => r.info.buyerCompanyName, false)

      const isSenderData = r.sender && (r.sender.name || r.sender.avatarUrl)

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
                <DivVerticalyAligned>
                  <UserName as='h3'>{r.nameOfUser}</UserName>
                  <UserCompany as='h4'>
                    {getSafe(() => r.info.requestedBy.company.cfDisplayName, false) ||
                    getSafe(() => r.info.buyerCompanyName, false)}
                  </UserCompany>
                </DivVerticalyAligned>
              </DivUser>
            )}
            {!isUserData && !!isSenderData && (
              <DivUser>
                {getSafe(() => r.sender.avatarUrl, false) && (
                  <UserImage src={r.sender.avatarUrl} bordered />
                )}
                <DivVerticalyAligned>
                  <UserName as='h3'>{r.sender.name}</UserName>
                </DivVerticalyAligned>
              </DivUser>
            )}
            {notificationText(r.rawData)}
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
            <ChevronUp size={16} onClick={() => toggleDetail(r.id)} style={{ cursor: 'pointer' }} />
          ) : (
            <ChevronDown
              size={16}
              onClick={() => {
                toggleDetail(r.id)
                if (!r.read) handleClickOnUnread(r)
              }}
              style={{ cursor: 'pointer' }}
            />
          )
        ) : null
      }
    })
  }

  const getRowDetail = ({ row }) => {
    const messageType = row.info && row.info.infoType ? row.info.infoType : ''
    const messageDetailTable = {
      MessageCompanyGenericProductRequestInfoResponse: <GenericProductRequest row={row.rawData} />,
      MessageShippingQuoteRequestInfoResponse: <ShippingQuoteRequest row={row.rawData} />,
      MessageShippingQuoteInfoResponse: (
        <ShippingQuoteInfo row={row.rawData} onClose={() => toggleDetail(row.id)} />
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

  const handleClickOnUnread = async row => {
    const { datagrid, getCategories, markSeen, getCountUnseen } = props
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

  const toggleCellComponent = ({ expanded, onToggle, tableColumn, tableRow, row, style, ...restProps }) => {
    const { selectedRows } = props
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
                props.onSelectionChange(newSelectedRows)
              }
            } else {
              props.onSelectionChange(newSelectedRows.filter(id => id !== row.id))
            }
          }}
        />
      </td>
    )
  }

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
          columns={COLUMNS}
          isBankTable={true}
          rowDetailType={true}
          rows={getRows(props)}
          rowDetail={getRowDetail}
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
          rowSelection={true}
          lockSelection={false}
          showSelectAll={false}
          toggleCellComponent={toggleCellComponent}
          isToggleCellComponent={true}
          selectedRows={selectedRows}
          onSelectionChange={selectedRows => {
            props.onSelectionChange(selectedRows)
          }}
          estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
          defaultSorting={{ columnName: 'time', sortPath: 'Message.createdAt', direction: 'DESC' }}
        />
      </div>
    </Fragment>
  )
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
