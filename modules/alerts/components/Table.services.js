import moment from 'moment'
import { Popup, Checkbox } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'
import { ChevronUp, ChevronDown, Check } from 'react-feather'
import Link from 'next/link'

// Services
import { getSafe } from '../../../utils/functions'

// Components
import GenericProductRequest from './DetailMessages/GenericProductRequest'
import ShippingQuoteRequest from './DetailMessages/ShippingQuoteRequest'
import ShippingQuoteInfo from './DetailMessages/ShippingQuoteInfo'

// Styles
import {
  StyledNotification,
  StyledAlertHeader,
  DivUser,
  DivNotificationRow,
  DivVerticalyAligned,
  UserImage,
  UserName,
  UserCompany,
  CheckIcon
} from './Alerts.styles'

/**
 * Get Notification row description content (simplified)
 * @category Alerts Table
 * @param {object} row row object data
 * @param {object} state object with state values and set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @returns {object} notification row description content (simplified)
 */
const notificationText = (row, state, props) => {
  return (
    <StyledNotification
      style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
      onClick={() => {
        if (row.info) toggleDetail(row.id, state)
        if (!row.read) handleClickOnUnread(row, props)
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

/**
 * Handle row detail display expand/collapse
 * @category Alerts Table
 * @param {integer} rowId row ID
 * @param {object} state object with state values and set state Hook functions
 * @returns {none}
 */
const toggleDetail = (rowId, state) => {
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

/**
 * Adjust rows, add actions to the rows
 * @category Alerts Table
 * @param {object} state object with state values and set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @returns {array} data table (datagrid) array formatted values
 */
export const getRows = (state, props) => {
  return props.rows.map(r => {
    const read = r.read ? 'read' : 'unread'
    const selected = props.selectedRows.some(id => id === r.id)
    const open = state.expandedRowIds.some(id => id === r.id)
    const recent =
      moment(r.createdAt).isSame(moment(), 'day') || moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')

    const isUserData = getSafe(() => r.relatedCompany.avatarUrl, false)
      || (/* getSafe(() => r.relatedCompany.hasLogo, false) && [DT-1005 temporary]*/ getSafe(() => r.relatedCompany.logoUrl, false))
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
              {getSafe(() => r.relatedCompany.avatarUrl || r.relatedCompany.logoUrl, false) && (
                <UserImage
                  src={/* r.relatedCompany.hasLogo && [DT-1005 temporary] */ r.relatedCompany.logoUrl
                    ? r.relatedCompany.logoUrl
                    : r.relatedCompany.avatarUrl
                  }
                  bordered
                />
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
          {notificationText(r.rawData, state, props)}
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
          <ChevronUp size={16} onClick={() => toggleDetail(r.id, state)} style={{ cursor: 'pointer' }} />
        ) : (
          <ChevronDown
            size={16}
            onClick={() => {
              toggleDetail(r.id, state)
              if (!r.read) handleClickOnUnread(r, props)
            }}
            style={{ cursor: 'pointer' }}
          />
        )
      ) : null
    }
  })
}

/**
 * Get expanded notification row detail
 * @category Alerts Table
 * @param {object} row row object data
 * @param {object} state object with state values and set state Hook functions
  * @returns {object} notification row detail (expanded content)
 */
export const getRowDetail = ({ row }, state) => {
  const messageType = row.info && row.info.infoType ? row.info.infoType : ''
  const messageDetailTable = {
    MessageCompanyGenericProductRequestInfoResponse: <GenericProductRequest row={row.rawData} />,
    MessageShippingQuoteRequestInfoResponse: <ShippingQuoteRequest row={row.rawData} />,
    MessageShippingQuoteInfoResponse: (
      <ShippingQuoteInfo row={row.rawData} onClose={() => toggleDetail(row.id, state)} />
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

/**
 * Handle row click on unread notification message (mark as seen)
 * @category Alerts Table
 * @param {object} row row object data
 * @param {object} props object with all props (actions, init data, ...)
 * @returns {none}
 */
const handleClickOnUnread = async (row, props) => {
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

/**
 * Toggle component on data table display (datagrid toggle component)
 * @category Alerts Table
 * @param {object} datagrid props
 * @param {object} props object with all props (actions, init data, ...)
 * @returns {object} toggle component on data table display (datagrid toggle component)
 */
export const toggleCellComponent = ({ expanded, onToggle, tableColumn, tableRow, row, style, ...restProps }, props) => {
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