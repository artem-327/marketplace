import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { ChevronUp, ChevronDown, Check } from 'react-feather'
import { Popup } from 'semantic-ui-react'
// Services
import { getSafe } from '../../../../utils/functions'
// Styles
import { UserImage, UserName, UserCompany, StyledNotification, CheckIcon } from '../../styles'

export const columns = [
    {
    name: 'user',
    title: <div></div>,
    width: 200,
    disabled: false
    },
    {
    name: 'notification',
    title: <div></div>,
    width: 720,
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
        <FormattedMessage id='alerts.column.expand' defaultMessage='Expand' />
    ),
    align: 'center',
    width: 50,
    disabled: true
    }
]

const toggleDetail = (rowId, expandedRowIds, setExpandedRowIds) => {
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

export const getRows = (props, expandedRowIds, setExpandedRowIds) => {
    return props.rows.map(r => {
    const open = expandedRowIds.some(id => id === r.id)
    const recent =
        moment(r.createdAt).isSame(moment(), 'day') || moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')

    return {
        ...r,
        user: (
        <>
            {getSafe(() => r.relatedCompany.avatarUrl, false) && (
            <UserImage src={r.relatedCompany.avatarUrl} bordered />
            )}
            <UserName as='h3'>{r.nameOfUser}</UserName>
            <UserCompany as='h4'>
            {getSafe(() => r.info.requestedBy.company.cfDisplayName, false) ||
                getSafe(() => r.info.buyerCompanyName, false)}
            </UserCompany>
        </>
        ),
        notification: (
        <StyledNotification
            onClick={() => {
            if (r.info) toggleDetail(r.id, expandedRowIds, setExpandedRowIds)
            }}>
            {ReactHtmlParser(r.text)}
            {r.read && (
            <CheckIcon>
                <Check />
            </CheckIcon>
            )}
        </StyledNotification>
        ),
        clsName: 'unread' + (open ? ' open' : '') + (recent ? ' recent' : ''),
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
            <ChevronUp size={16} onClick={() => toggleDetail(r.id, expandedRowIds, setExpandedRowIds)} style={{ cursor: 'pointer' }} />
        ) : (
            <ChevronDown size={16} onClick={() => toggleDetail(r.id, expandedRowIds, setExpandedRowIds)} style={{ cursor: 'pointer' }} />
        )
        ) : null
    }
    })
}
